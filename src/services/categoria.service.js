import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

const CategoriaService = {
  // Obtener todas las categorías
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CATEGORIAS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener categorías' };
    }
  },

  // Crear nueva categoría
  async create(categoriaData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CATEGORIAS.CREATE, categoriaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear categoría' };
    }
  },

  // Actualizar categoría
  async update(id, categoriaData) {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.CATEGORIAS.UPDATE(id), categoriaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar categoría' };
    }
  },

  // Eliminar categoría
  async delete(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.CATEGORIAS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar categoría' };
    }
  },
};

export default CategoriaService;
