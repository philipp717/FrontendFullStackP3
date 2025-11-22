// Mock data temporal - Eliminar cuando el backend esté listo
export const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    nombre: 'Administrador',
    role: 'ADMIN',
    email: 'admin@pokemon.com'
  },
  {
    id: 2,
    username: 'vendedor',
    password: 'vendedor123',
    nombre: 'Juan Vendedor',
    role: 'VENDEDOR',
    email: 'vendedor@pokemon.com'
  },
  {
    id: 3,
    username: 'cliente',
    password: 'cliente123',
    nombre: 'María Cliente',
    role: 'CLIENTE',
    email: 'cliente@pokemon.com'
  }
];

export const MOCK_PRODUCTOS = [
  {
    id: 1,
    nombre: 'Charizard VMAX',
    descripcion: 'Carta holográfica ultra rara de Charizard en su forma VMAX',
    precio: 45000,
    stock: 5,
    imagen: 'https://images.pokemontcg.io/swsh4/25_hires.png',
    rareza: 'Ultra Rare',
    set: 'Vivid Voltage',
    categoriaId: 1,
    categoria: { id: 1, nombre: 'Ultra Raras' }
  },
  {
    id: 2,
    nombre: 'Pikachu V',
    descripcion: 'Pikachu en versión V, ideal para coleccionistas',
    precio: 12000,
    stock: 15,
    imagen: 'https://images.pokemontcg.io/swsh4/43_hires.png',
    rareza: 'Rare',
    set: 'Vivid Voltage',
    categoriaId: 2,
    categoria: { id: 2, nombre: 'Raras' }
  },
  {
    id: 3,
    nombre: 'Mewtwo GX',
    descripcion: 'El poderoso Mewtwo en su forma GX',
    precio: 28000,
    stock: 8,
    imagen: 'https://images.pokemontcg.io/sm35/39_hires.png',
    rareza: 'GX Rare',
    set: 'Shining Legends',
    categoriaId: 1,
    categoria: { id: 1, nombre: 'Ultra Raras' }
  },
  {
    id: 4,
    nombre: 'Eevee VMAX',
    descripcion: 'Eevee evolucionado en su forma VMAX',
    precio: 35000,
    stock: 6,
    imagen: 'https://images.pokemontcg.io/swsh9/196_hires.png',
    rareza: 'Ultra Rare',
    set: 'Brilliant Stars',
    categoriaId: 1,
    categoria: { id: 1, nombre: 'Ultra Raras' }
  },
  {
    id: 5,
    nombre: 'Blastoise',
    descripcion: 'Carta clásica de Blastoise',
    precio: 8000,
    stock: 20,
    imagen: 'https://images.pokemontcg.io/base1/2_hires.png',
    rareza: 'Rare',
    set: 'Base Set',
    categoriaId: 3,
    categoria: { id: 3, nombre: 'Clásicas' }
  },
  {
    id: 6,
    nombre: 'Rayquaza VMAX',
    descripcion: 'El legendario Rayquaza en su forma más poderosa',
    precio: 52000,
    stock: 3,
    imagen: 'https://images.pokemontcg.io/swsh7/217_hires.png',
    rareza: 'Ultra Rare',
    set: 'Evolving Skies',
    categoriaId: 1,
    categoria: { id: 1, nombre: 'Ultra Raras' }
  },
  {
    id: 7,
    nombre: 'Gengar V',
    descripcion: 'Gengar versión V con efectos especiales',
    precio: 18000,
    stock: 12,
    imagen: 'https://images.pokemontcg.io/swsh6/156_hires.png',
    rareza: 'Rare',
    set: 'Chilling Reign',
    categoriaId: 2,
    categoria: { id: 2, nombre: 'Raras' }
  },
  {
    id: 8,
    nombre: 'Umbreon VMAX',
    descripcion: 'Umbreon evolucionado con arte alternativo',
    precio: 65000,
    stock: 2,
    imagen: 'https://images.pokemontcg.io/swsh7/215_hires.png',
    rareza: 'Secret Rare',
    set: 'Evolving Skies',
    categoriaId: 1,
    categoria: { id: 1, nombre: 'Ultra Raras' }
  }
];

export const MOCK_CATEGORIAS = [
  { id: 1, nombre: 'Ultra Raras', descripcion: 'Cartas de rareza ultra' },
  { id: 2, nombre: 'Raras', descripcion: 'Cartas raras' },
  { id: 3, nombre: 'Clásicas', descripcion: 'Cartas del set original' },
  { id: 4, nombre: 'Promocionales', descripcion: 'Cartas de eventos especiales' }
];

export const MOCK_BOLETAS = [
  {
    id: 1,
    numero: 'BOL-2024-001',
    fecha: '2024-01-15',
    usuarioId: 3,
    usuario: { id: 3, nombre: 'María Cliente' },
    total: 45000,
    subtotal: 37815,
    iva: 7185,
    estado: 'PAGADA',
    detalles: [
      {
        id: 1,
        productoId: 1,
        producto: { nombre: 'Charizard VMAX' },
        cantidad: 1,
        precioUnitario: 45000,
        subtotal: 45000
      }
    ]
  },
  {
    id: 2,
    numero: 'BOL-2024-002',
    fecha: '2024-01-16',
    usuarioId: 3,
    usuario: { id: 3, nombre: 'María Cliente' },
    total: 40000,
    subtotal: 33613,
    iva: 6387,
    estado: 'PAGADA',
    detalles: [
      {
        id: 2,
        productoId: 2,
        producto: { nombre: 'Pikachu V' },
        cantidad: 2,
        precioUnitario: 12000,
        subtotal: 24000
      },
      {
        id: 3,
        productoId: 7,
        producto: { nombre: 'Gengar V' },
        cantidad: 1,
        precioUnitario: 18000,
        subtotal: 18000
      }
    ]
  }
];

// Simular delay de red
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generar token JWT mock
export const generateMockToken = (user) => {
  return `mock-jwt-token-${user.id}-${Date.now()}`;
};
