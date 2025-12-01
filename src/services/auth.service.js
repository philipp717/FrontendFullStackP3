import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import { MOCK_USERS, delay, generateMockToken } from '../mocks/mockData';

// Variable para activar/desactivar modo mock
const USE_MOCK = false; // ✅ CONECTADO AL BACKEND REAL

const AuthService = {
  // Login de usuario
  async login(credentials) {
    // MODO MOCK - Eliminar cuando el backend esté listo
    if (USE_MOCK) {
      await delay(800); // Simular latencia de red
      
      const user = MOCK_USERS.find(
        u => u.username === credentials.username && u.password === credentials.password
      );
      
      if (!user) {
        throw { message: 'Usuario o contraseña incorrectos' };
      }
      
      const token = generateMockToken(user);
      const userData = {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        role: user.role,
        email: user.email
      };
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { token, user: userData };
    }
    
    // MODO REAL - Usar cuando el backend esté listo
    try {
      // Adaptar el formato para el backend NestJS
      const loginData = {
        usernameOrEmail: credentials.username, // El backend espera usernameOrEmail
        password: credentials.password
      };
      
      console.log('🔐 Intentando login con:', loginData.usernameOrEmail);
      
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, loginData);
      
      console.log('📥 Respuesta del login:', response.data);
      
      // Guardar token y datos del usuario
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ Token guardado en localStorage:', response.data.token.substring(0, 20) + '...');
        return { token: response.data.token, user: response.data.user };
      } else if (response.data.access_token) {
        // Si el backend retorna access_token en lugar de token
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ Token guardado en localStorage (access_token):', response.data.access_token.substring(0, 20) + '...');
        return { token: response.data.access_token, user: response.data.user };
      } else {
        console.error('❌ El backend no retornó un token');
        console.error('Estructura de respuesta:', Object.keys(response.data));
        throw { message: 'El servidor no retornó un token de autenticación' };
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      console.error('Detalles del error:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  // Registro de usuario
  async register(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrar usuario' };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    // Limpiar cualquier otro dato relacionado con la sesión
    sessionStorage.clear();
  },

  // Obtener usuario actual
  getCurrentUser() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    // Si no hay token, no hay usuario válido
    if (!token) {
      return null;
    }
    
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = this.getCurrentUser();
    return !!(token && user);
  },

  // Obtener el token actual
  getToken() {
    return localStorage.getItem('token');
  },

  // Refresh token - renovar token antes de que expire
  async refreshToken() {
    try {
      const currentToken = this.getToken();
      if (!currentToken) {
        throw { message: 'No hay token para renovar' };
      }

      const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        console.log('✅ Token renovado exitosamente');
        return response.data.access_token;
      }
      
      return currentToken;
    } catch (error) {
      console.error('❌ Error al renovar token:', error);
      // Si falla el refresh, limpiar sesión
      this.logout();
      throw error.response?.data || { message: 'Error al renovar token' };
    }
  },

  // Validar si el token está por expirar (útil para refresh automático)
  isTokenExpiringSoon() {
    try {
      const token = this.getToken();
      if (!token) return true;

      // Decodificar el JWT (solo la parte del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convertir a milisegundos
      const now = Date.now();
      const timeUntilExpiry = exp - now;
      
      // Si faltan menos de 5 minutos para expirar
      return timeUntilExpiry < 5 * 60 * 1000;
    } catch (error) {
      console.error('Error al validar expiración del token:', error);
      return true; // Asumir que expira si hay error
    }
  },

  // Verificar rol del usuario
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  },

  // Verificar si tiene alguno de los roles permitidos
  hasAnyRole(roles) {
    const user = this.getCurrentUser();
    return user && roles.includes(user.role);
  },
};

export default AuthService;
