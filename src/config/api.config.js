// Configuración de la API Backend
export const API_CONFIG = {
  // URL base del backend NestJS - ✅ CONFIGURADO PARA LOCALHOST:3000
  BASE_URL: 'http://localhost:3000/api/v1',
  
  // Versiones de la API
  V1: '/v1',
  V2: '/v2',
  
  // Timeout para requests (30 segundos)
  TIMEOUT: 30000,
  
  // Headers por defecto
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Endpoints de la API
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  
  // Productos (Cartas Pokémon)
  PRODUCTOS: {
    LIST: '/productos',
    CREATE: '/productos',
    UPDATE: (id) => `/productos/${id}`,
    DELETE: (id) => `/productos/${id}`,
    DETAIL: (id) => `/productos/${id}`,
  },
  
  // Boletas (Órdenes)
  BOLETAS: {
    LIST: '/boletas',
    CREATE: '/boletas',
    DETAIL: (id) => `/boletas/${id}`,
    UPDATE: (id) => `/boletas/${id}`,
  },
  
  // Detalle Boleta
  DETALLE_BOLETA: {
    BY_BOLETA: (boletaId) => `/boletas/${boletaId}/detalles`,
  },
  
  // Categorías
  CATEGORIAS: {
    LIST: '/categorias',
    CREATE: '/categorias',
    UPDATE: (id) => `/categorias/${id}`,
    DELETE: (id) => `/categorias/${id}`,
  },
};

export default API_CONFIG;
