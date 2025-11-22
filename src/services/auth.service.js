import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';
import { MOCK_USERS, delay, generateMockToken } from '../mocks/mockData';

// Variable para activar/desactivar modo mock
const USE_MOCK = true; // Cambiar a false cuando el backend esté listo

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
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      // Guardar token y datos del usuario
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
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
  },

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
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
