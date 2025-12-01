# Frontend FullStack P3 - Tienda de Cartas Pokémon

Aplicación web React + Vite para una tienda de cartas Pokémon. Incluye sistema de autenticación JWT, gestión de productos, categorías, usuarios, carrito de compras y generación de boletas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- npm (incluido con Node.js)
- Git
- **Backend corriendo** - [BackendFullStackP3](https://github.com/NicolasGarridoB/BackendFullStackP3)

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/philipp717/FrontendFullStackP3.git
cd FrontendFullStackP3
```

### 2. Instalar Dependencias

```bash
npm i
```

### 3. Configurar Conexión al Backend

Edita el archivo `src/config/api.config.js` para apuntar a tu backend:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',  // URL del backend NestJS
  TIMEOUT: 10000,
};
```

> **Importante:** Asegúrate de que el backend esté corriendo en `http://localhost:3000` antes de iniciar el frontend.

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El servidor se iniciará y verás en la consola:

```
VITE v5.4.21  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5. Acceder a la Aplicación

Abre tu navegador y ve a: **http://localhost:5173**

### 6. Iniciar Sesión

Usa las credenciales creadas por el seed del backend:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

> **Nota:** Debes haber ejecutado el seed del backend (`POST /api/v1/seed`) para que estos usuarios existan.

## Roles y Permisos

### 🔴 ADMINISTRADOR (ADMIN)
- **Acceso total** al sistema
- Dashboard con todas las estadísticas
- CRUD completo de productos, categorías, usuarios y boletas
- Acceso a la tienda como cliente
- **Credenciales:** `admin` / `admin123`

### 🟡 VENDEDOR (VENDEDOR)
- Dashboard con vista de productos y boletas (solo lectura)
- No puede crear, editar ni eliminar
- Acceso a la tienda como cliente
- **Credenciales:** Crear desde el panel de usuarios como admin

### 🟢 CLIENTE (CLIENTE)
- Solo acceso a la tienda
- Carrito de compras y checkout
- Ver facturas de sus compras
- **Credenciales:** Registrarse desde `/register`


## Arquitectura del Proyecto

Este proyecto implementa **Atomic Design** para máxima reutilización:

- **Atoms**: Componentes básicos (Button, Input, Badge)
- **Molecules**: Combinaciones simples (Card, FormField, Modal)
- **Organisms**: Componentes complejos (Sidebar, Header, DataTable)
- **Templates**: Layouts reutilizables (AdminLayout)
- **Pages**: Páginas completas que usan todos los anteriores

> Ver `ATOMIC_DESIGN.md` para documentación completa de la arquitectura.

## Tecnologías Utilizadas

- **React 18.2.0** - Librería de UI
- **Vite 5.4.21** - Build tool y dev server ultra-rápido
- **React Router DOM 6.14.1** - Navegación SPA
- **Axios 1.x** - Cliente HTTP con interceptores
- **PropTypes** - Validación de props en componentes
- **Vitest + React Testing Library** - Testing unitario (>80% coverage)
- **CSS3** - Estilos puros sin frameworks
- **LocalStorage** - Persistencia de sesión y carrito

## Integración con Backend

### URL Base del Backend

El frontend se conecta al backend NestJS en:

```javascript
// src/config/api.config.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',
};
```

### Endpoints Utilizados

#### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario cliente
- `POST /auth/refresh` - Refrescar token JWT

#### Productos
- `GET /productos` - Listar productos
- `POST /productos` - Crear producto (ADMIN)
- `PATCH /productos/{id}` - Actualizar producto (ADMIN)
- `DELETE /productos/{id}` - Eliminar producto (ADMIN)

#### Boletas
- `GET /boletas` - Listar boletas
- `POST /boletas` - Crear boleta
- `GET /boletas/{id}` - Detalle de boleta

#### Usuarios (ADMIN)
- `GET /users` - Listar usuarios
- `POST /users` - Crear usuario
- `PATCH /users/{id}` - Actualizar usuario
- `DELETE /users/{id}` - Eliminar usuario

#### Categorías (ADMIN)
- `GET /categorias` - Listar categorías
- `POST /categorias` - Crear categoría
- `PATCH /categorias/{id}` - Actualizar categoría
- `DELETE /categorias/{id}` - Eliminar categoría

### Autenticación JWT

El frontend incluye:

- **Interceptor de solicitudes**: Añade automáticamente el token JWT a todas las peticiones
- **Interceptor de respuestas**: Maneja errores 401 con refresh token automático
- **Retry automático**: Si el token expira, lo refresca y reintenta la petición original
- **Detección de expiración**: Valida si el token expirará en menos de 5 minutos

## Uso de la Aplicación

### 1. Inicio de Sesión
- Ingresa en **http://localhost:5173**
- Usa credenciales del seed del backend: `admin` / `admin123`
- El sistema redirige según el rol:
  - **ADMIN/VENDEDOR** → Dashboard
  - **CLIENTE** → Tienda

### 2. Dashboard (ADMIN/VENDEDOR)
- Ver estadísticas en tiempo real (total productos, usuarios, boletas, ingresos)
- Navegación por sidebar con íconos
- Acceso rápido a todos los módulos

### 3. Gestión de Productos (ADMIN)
- Ver listado de productos en tabla
- Crear nuevo producto con imagen, precio, stock, categoría
- Editar productos existentes
- Eliminar productos (con confirmación)

### 4. Tienda (Todos los usuarios)
- Explorar catálogo de cartas Pokémon
- Filtrar por categorías
- Agregar productos al carrito
- Ver carrito lateral con cantidades
- Proceder al checkout

### 5. Checkout y Boletas
- Revisar productos del carrito
- Generar boleta con IVA 19%
- Ver boleta generada en formato PDF
- Historial de compras en sección Boletas

## Testing

Este proyecto incluye tests unitarios con **Vitest** y **React Testing Library**.

### Ejecutar Tests

```bash
npm run test
```

### Cobertura de Tests

El proyecto tiene >80% de cobertura en:

- ✅ Componentes atómicos (Button, Input, Badge, LoadingSpinner)
- ✅ Componentes moleculares (Card, FormField, Modal, StatCard)
- ✅ Servicios (auth.service.js)
- ✅ Context (AuthContext.jsx)

Los tests se encuentran en archivos `.test.jsx` o `.test.js` junto a sus componentes.

## Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar el proyecto para producción
npm run build

# Preview del build de producción
npm run preview

# Ejecutar tests unitarios
npm run test

# Ejecutar tests con cobertura
npm run test:coverage
```

## Seguridad

- Las contraseñas no se almacenan en el frontend
- Tokens JWT se guardan en **localStorage**
- Interceptores de axios añaden el token automáticamente a todas las peticiones
- **Refresh token** automático cuando el token principal expira
- **Retry automático** de peticiones fallidas por token expirado
- Validación de roles en rutas protegidas (ProtectedRoute)
- Guards para prevenir acceso no autorizado según rol

## Troubleshooting

### Error: "Cannot connect to backend"
1. Verifica que el backend esté corriendo en `http://localhost:3000`
2. Revisa que hayas ejecutado el seed del backend
3. Confirma la URL en `src/config/api.config.js`

### Error: "CORS policy"
El backend debe tener CORS configurado para permitir:
```javascript
origin: 'http://localhost:5173'
```

### La sesión no persiste al recargar
- Verifica que localStorage no esté bloqueado en tu navegador
- Revisa la consola del navegador para ver errores de token

### No aparecen productos/usuarios
- Ejecuta el seed del backend: `POST http://localhost:3000/api/v1/seed`
- Verifica que la base de datos `test` exista en MySQL

## Complemento con el Backend

Este frontend está diseñado para trabajar con el backend NestJS:

**Backend:** [BackendFullStackP3](https://github.com/NicolasGarridoB/BackendFullStackP3)

### Flujo de Trabajo Completo

1. **Inicia el backend** (puerto 3000)
   - Ejecuta XAMPP (MySQL en puerto 3307)
   - Corre el seed para crear datos iniciales

2. **Inicia el frontend** (puerto 5173)
   - El frontend se conecta automáticamente al backend
   - Los tokens JWT se manejan automáticamente

3. **Desarrollo**
   - Cambios en frontend se reflejan con hot-reload
   - Cambios en backend requieren reiniciar el servidor NestJS

### JWT con Refresh Token
- Token principal válido por 1 día
- Refresh automático antes de expiración
- Retry de peticiones fallidas sin interrumpir al usuario

### Variables de Entorno (Opcional)
Crear archivo `.env`:
```
VITE_API_URL=https://tu-backend.com/api
```

