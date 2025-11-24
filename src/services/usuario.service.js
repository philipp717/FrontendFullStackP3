import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

const UsuarioService = {
  // Obtener todos los usuarios
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener usuarios' };
    }
  },

  // Obtener usuario por ID
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.DETAIL(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el usuario' };
    }
  },

  // Crear nuevo usuario
  async create(usuarioData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USUARIOS.CREATE, usuarioData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear usuario' };
    }
  },

  // Actualizar usuario
  async update(id, usuarioData) {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.USUARIOS.UPDATE(id), usuarioData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar usuario' };
    }
  },

  // Eliminar usuario
  async delete(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USUARIOS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar usuario' };
    }
  },
};

export default UsuarioService;
