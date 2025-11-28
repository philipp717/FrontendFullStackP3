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
  (error) => {
    // Si el token expiró (401) o no tiene permisos (403), limpiar y redirigir
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('🚫 Error de autenticación:', error.response.status, error.response.data);
      
      // Limpiar localStorage y sessionStorage completamente
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      sessionStorage.clear();
      
      console.log('🧹 localStorage limpiado por error de autenticación');
      
      // Solo redirigir si no estamos ya en la página de login
      if (window.location.pathname !== '/' && window.location.pathname !== '/register') {
        console.log('↩️ Redirigiendo al login...');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
