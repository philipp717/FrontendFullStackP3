import apiClient from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

const BoletaService = {
  // Obtener todas las boletas
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOLETAS.LIST);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener boletas' };
    }
  },

  // Obtener boleta por ID con sus detalles
  async getById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BOLETAS.DETAIL(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener la boleta' };
    }
  },

  // Crear nueva boleta
  async create(boletaData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BOLETAS.CREATE, boletaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear boleta' };
    }
  },

  // Actualizar boleta
  async update(id, boletaData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.BOLETAS.UPDATE(id), boletaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar boleta' };
    }
  },

  // Obtener detalles de una boleta
  async getDetalles(boletaId) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DETALLE_BOLETA.BY_BOLETA(boletaId));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener detalles de la boleta' };
    }
  },
};

export default BoletaService;
