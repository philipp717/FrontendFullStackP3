import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

const ProductoService = {
  // Obtener todos los productos
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTOS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener productos' };
    }
  },

  // Obtener producto por ID
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTOS.DETAIL(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener el producto' };
    }
  },

  // Crear nuevo producto
  async create(productoData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PRODUCTOS.CREATE, productoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear producto' };
    }
  },

  // Actualizar producto
  async update(id, productoData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.PRODUCTOS.UPDATE(id), productoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar producto' };
    }
  },

  // Eliminar producto
  async delete(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.PRODUCTOS.DELETE(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar producto' };
    }
  },
};

export default ProductoService;
