# 🎴 Tienda de Cartas Pokémon - Frontend (Evaluación Parcial 3)

**Aplicación web React para la venta de cartas Pokémon originales - DSY1104 Desarrollo Fullstack II**

## 📋 Descripción del Proyecto

Frontend desarrollado con React + Vite que se integra con un backend Spring Boot para la gestión completa de una tienda online de cartas Pokémon. Implementa autenticación JWT, gestión de sesiones, roles de usuario y operaciones CRUD completas.

### 🎯 Características Principales

- ✅ **Autenticación JWT** con roles (ADMIN, VENDEDOR, CLIENTE)
- ✅ **Gestión de sesión persistente** (mantiene sesión incluso con F5)
- ✅ **Restricciones de acceso por rol**
- ✅ **Dashboard administrativo** con estadísticas
- ✅ **Tienda online** con carrito de compras
- ✅ **CRUD completo** de productos, usuarios, categorías y boletas
- ✅ **Generación de boletas** con IVA 19% (formato chileno)
- ✅ **Diseño responsive** con tema Pokémon profesional
- ✅ **Integración con API REST** (Spring Boot backend)

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend Spring Boot corriendo (opcional para desarrollo)

### Paso 1: Instalar dependencias

```powershell
npm install
```

### Paso 2: Configurar la URL del Backend

Edita el archivo `src/config/api.config.js` y cambia la URL base:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // Cambiar según tu backend
  // ...
};
```

### Paso 3: Modo Mock vs Backend Real

En `src/services/auth.service.js` hay una variable `USE_MOCK`:

```javascript
const USE_MOCK = true; // true = datos mock, false = backend real
```

- **`true`**: Usa datos de prueba locales (para desarrollo sin backend)
- **`false`**: Conecta con el backend Spring Boot real

### Paso 4: Ejecutar el servidor de desarrollo

```powershell
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Paso 5: Construir para producción (opcional)

```powershell
npm run build
```

## � Roles y Permisos

### 🔴 ADMINISTRADOR
- **Acceso total** al sistema
- Dashboard administrativo completo
- CRUD de productos, categorías, usuarios y boletas
- Ver todas las estadísticas
- **Credenciales de prueba:** `admin` / `admin123`

### 🟡 VENDEDOR
- Dashboard con vista limitada
- **Solo lectura** de productos y boletas
- No puede crear, editar ni eliminar
- Acceso a la tienda
- **Credenciales de prueba:** `vendedor` / `vendedor123`

## 📂 Estructura del Proyecto

```
FrontendFullStackP3/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Login.jsx        # Página de inicio de sesión
│   │   ├── Dashboard.jsx    # Panel administrativo
│   │   ├── Tienda.jsx       # Catálogo y carrito
│   │   ├── Productos.jsx    # CRUD de productos (ADMIN)
│   │   ├── Boletas.jsx      # Gestión de órdenes (ADMIN/VENDEDOR)
│   │   ├── Usuarios.jsx     # CRUD de usuarios (ADMIN)
│   │   ├── Categorias.jsx   # CRUD de categorías (ADMIN)
│   │   └── Invoice.jsx      # Generador de boleta
│   ├── context/             # Context API
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   ├── services/            # Servicios API
│   │   ├── api.service.js   # Cliente HTTP (axios + interceptores)
│   │   ├── auth.service.js  # Servicios de autenticación
│   │   ├── producto.service.js
│   │   ├── boleta.service.js
│   │   ├── usuario.service.js
│   │   └── categoria.service.js
│   ├── config/              # Configuración
│   │   └── api.config.js    # URLs y endpoints
│   ├── mocks/               # Datos de prueba (TEMPORAL)
│   │   └── mockData.js      # Datos mock para desarrollo
│   ├── App.jsx              # Configuración de rutas
│   ├── main.jsx             # Punto de entrada
│   └── styles.css           # Estilos globales
├── index.html               # HTML base
├── vite.config.js           # Configuración de Vite
├── package.json             # Dependencias
└── README.md                # Este archivo
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.2.0 | Librería de UI |
| **Vite** | 5.1.7 | Build tool y dev server |
| **React Router DOM** | 6.14.1 | Navegación SPA |
| **Axios** | 1.x | Cliente HTTP para API REST |
| **CSS3** | - | Estilos y diseño responsive |
| **LocalStorage** | - | Persistencia de sesión/carrito |

## 🔗 Integración con Backend

### Endpoints Esperados

El frontend espera que el backend tenga los siguientes endpoints:

#### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

#### Productos
- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto (ADMIN)
- `PUT /api/productos/{id}` - Actualizar producto (ADMIN)
- `DELETE /api/productos/{id}` - Eliminar producto (ADMIN)

#### Boletas
- `GET /api/boletas` - Listar boletas
- `POST /api/boletas` - Crear boleta
- `GET /api/boletas/{id}` - Detalle de boleta

#### Usuarios (ADMIN)
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

#### Categorías (ADMIN)
- `GET /api/categorias` - Listar categorías
- `POST /api/categorias` - Crear categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

### Formato de Respuesta Esperado

#### Login exitoso
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "nombre": "Administrador",
    "email": "admin@pokemon.com",
    "role": "ADMIN"
  }
}
```

## 📱 Uso de la Aplicación

### 1. Inicio de Sesión
- Ingresar con uno de los usuarios de prueba
- El sistema redirige según el rol:
  - **ADMIN/VENDEDOR** → Dashboard
  - **CLIENTE** → Tienda

### 2. Dashboard (ADMIN/VENDEDOR)
- Ver estadísticas del sistema
- Acceso rápido a módulos
- Navegación por sidebar

### 3. Tienda (Todos los usuarios)
- Navegar por categorías
- Agregar productos al carrito
- Ajustar cantidades
- Proceder al checkout

### 4. Gestión de Productos (ADMIN)
- Crear nuevos productos
- Editar información
- Eliminar productos
- Asignar categorías

### 5. Gestión de Boletas (ADMIN/VENDEDOR)
- Ver lista de órdenes
- Consultar detalles de cada boleta
- **VENDEDOR:** Solo lectura

### 6. Gestión de Usuarios (ADMIN)
- Crear usuarios con roles
- Editar información
- Eliminar usuarios

### 7. Boleta
- Revisar resumen de compra
- Ver subtotal, IVA (19%) y total
- Imprimir boleta
- Realizar nueva compra

## 🎨 Personalización

### Cambiar Colores del Tema

Edita las variables CSS en `src/styles.css`:

```css
:root {
  --primary: #3B4CCA;        /* Azul Pokémon */
  --secondary: #FFCB05;      /* Amarillo Pokémon */
  --success: #4CAF50;        /* Verde */
  --danger: #f44336;         /* Rojo */
  /* ... */
}
```

### Agregar Nuevas Rutas

En `src/App.jsx`:

```jsx
<Route 
  path="/nueva-ruta" 
  element={
    <ProtectedRoute roles={['ADMIN']}>
      <NuevoComponente />
    </ProtectedRoute>
  } 
/>
```

## 📋 Modelo de Base de Datos

El backend debe implementar las siguientes tablas:

1. **USUARIO** - Usuarios del sistema
2. **BOLETA** - Órdenes de compra
3. **DETALLE_BOLETA** - Items de cada boleta
4. **PRODUCTO** - Cartas Pokémon
5. **CATEGORIA** - Clasificación de productos

## 📝 Notas Importantes

### Modo Mock (Desarrollo)
- El frontend incluye datos de prueba para desarrollo
- Permite trabajar sin backend
- Cambiar `USE_MOCK = false` cuando el backend esté listo

### Seguridad
- Los tokens JWT se almacenan en localStorage
- Los interceptores de axios agregan el token automáticamente
- Si el token expira (401), redirige al login

### IVA Chileno
- Todas las boletas calculan IVA del 19%
- Formato de precios en pesos chilenos (CLP)

## 🐛 Troubleshooting

### Error: "Cannot connect to backend"
- Verificar que el backend esté corriendo
- Revisar la URL en `src/config/api.config.js`
- Activar modo mock temporalmente

### Error: "CORS policy"
- Configurar CORS en el backend Spring Boot
- Permitir origen `http://localhost:5173`

### La sesión no persiste
- Verificar que localStorage no esté bloqueado
- Revisar la consola del navegador

## 📦 Scripts Disponibles

```powershell
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Preview del build de producción
npm run lint         # Revisar código (si ESLint está configurado)
```

## 🚀 Despliegue

### Build de Producción
```powershell
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

### Variables de Entorno (Opcional)
Crear archivo `.env`:
```
VITE_API_URL=https://tu-backend.com/api
```

## 📚 Documentación Adicional

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Router](https://reactrouter.com/)

## 👨‍💻 Desarrollo

Desarrollado para la **Evaluación Parcial 3** de la asignatura **DSY1104 - Desarrollo Fullstack II**.

### Criterios de Evaluación Cumplidos

✅ **IE3.3.2** - Sistema de gestión de sesiones en frontend  
✅ **IE3.3.3** - Restricciones de acceso por roles  
✅ **IE3.2.2** - Integración con API REST del backend  
✅ **IE3.3.5** - Exposición de gestión de sesiones segura  
✅ **IE3.3.6** - Explicación de restricciones de acceso  

---

**¡Listo para conectar con tu backend Spring Boot!** 🚀
- No se conecta a un backend real
- Los datos del carrito se mantienen entre sesiones usando localStorage
- La boleta incluye cálculo de IVA (19%)

## 🔒 Protección de Rutas

Las rutas `/welcome` e `/invoice` están protegidas y requieren autenticación. Si intentas acceder sin iniciar sesión, serás redirigido al login.

## 🖨️ Impresión de Boleta

La página de boleta incluye estilos optimizados para impresión. Usa la función de imprimir del navegador o el botón "Imprimir Boleta".

---

Desarrollado con ❤️ para la venta de cartas Pokémon originales