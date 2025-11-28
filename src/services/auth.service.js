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
      } else if (response.data.access_token) {
        // Si el backend retorna access_token en lugar de token
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('✅ Token guardado en localStorage (access_token):', response.data.access_token.substring(0, 20) + '...');
      } else {
        console.error('❌ El backend no retornó un token');
        console.error('Estructura de respuesta:', Object.keys(response.data));
        throw { message: 'El servidor no retornó un token de autenticación' };
      }
      
      return response.data;
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
