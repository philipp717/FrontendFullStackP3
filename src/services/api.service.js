import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Interceptor para agregar el token JWT a cada request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Log solo para debug (puedes comentar esta línea en producción)
      if (!config.url.includes('/auth/login')) {
        console.log('🔐 Enviando request autenticado a:', config.url);
      }
    } else if (!config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
      console.warn('⚠️ No hay token en localStorage para:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos intentado refresh aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar renovar el token
        const AuthService = await import('./auth.service').then(m => m.default);
        const newToken = await AuthService.refreshToken();
        
        // Actualizar el header con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Reintentar la request original
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar y redirigir
        console.error('🚫 Error al renovar token, cerrando sesión');
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        sessionStorage.clear();
        
        if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
          window.location.href = '/';
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Si el error es 403 o el refresh ya falló, limpiar y redirigir
    if (error.response?.status === 403 || (error.response?.status === 401 && originalRequest._retry)) {
      console.error('🚫 Error de autenticación:', error.response.status);
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      sessionStorage.clear();
      
      if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
