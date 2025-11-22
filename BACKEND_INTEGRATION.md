# 📝 Guía de Configuración - Backend Integration

## 🔗 Conectar con tu Backend Spring Boot

### Paso 1: Configurar la URL del Backend

Edita el archivo `src/config/api.config.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // 👈 CAMBIAR ESTA URL
  // ...
};
```

**Opciones comunes:**
- Desarrollo local: `http://localhost:8080/api`
- Producción: `https://tu-backend.com/api`
- Azure: `https://tu-app.azurewebsites.net/api`

### Paso 2: Activar Modo Backend Real

En `src/services/auth.service.js`, cambia:

```javascript
const USE_MOCK = false; // 👈 Cambiar a false para usar backend real
```

### Paso 3: Configurar CORS en el Backend

Tu backend Spring Boot debe permitir peticiones desde:
```
http://localhost:5173  (desarrollo)
http://localhost:5174  (si el puerto 5173 está ocupado)
```

Ejemplo de configuración CORS en Spring Boot:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 📋 Endpoints que el Frontend Espera

### Autenticación
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "token": "jwt-token", "user": {...} }
```

### Productos
```
GET    /api/productos         - Listar todos
POST   /api/productos         - Crear (ADMIN)
GET    /api/productos/{id}    - Ver detalle
PUT    /api/productos/{id}    - Actualizar (ADMIN)
DELETE /api/productos/{id}    - Eliminar (ADMIN)
```

### Boletas
```
GET    /api/boletas           - Listar todas
POST   /api/boletas           - Crear boleta
GET    /api/boletas/{id}      - Ver detalle
```

### Usuarios (ADMIN)
```
GET    /api/usuarios          - Listar todos
POST   /api/usuarios          - Crear
PUT    /api/usuarios/{id}     - Actualizar
DELETE /api/usuarios/{id}     - Eliminar
```

### Categorías (ADMIN)
```
GET    /api/categorias        - Listar todas
POST   /api/categorias        - Crear
PUT    /api/categorias/{id}   - Actualizar
DELETE /api/categorias/{id}   - Eliminar
```

## 🔐 Estructura del Token JWT

El frontend espera que el backend devuelva:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "nombre": "Administrador",
    "email": "admin@pokemon.com",
    "role": "ADMIN"  // "ADMIN" | "VENDEDOR" | "CLIENTE"
  }
}
```

El token se enviará automáticamente en todas las peticiones como:
```
Authorization: Bearer <token>
```

## 📊 Estructura de Datos Esperada

### Producto
```json
{
  "id": 1,
  "nombre": "Charizard VMAX",
  "descripcion": "Carta holográfica ultra rara",
  "precio": 45000,
  "stock": 5,
  "imagen": "https://...",
  "rareza": "Ultra Rare",
  "set": "Vivid Voltage",
  "categoriaId": 1,
  "categoria": {
    "id": 1,
    "nombre": "Ultra Raras"
  }
}
```

### Boleta
```json
{
  "id": 1,
  "numero": "BOL-2024-001",
  "fecha": "2024-01-15",
  "usuarioId": 3,
  "usuario": {
    "id": 3,
    "nombre": "María Cliente"
  },
  "subtotal": 37815,
  "iva": 7185,
  "total": 45000,
  "estado": "PAGADA",
  "detalles": [
    {
      "id": 1,
      "productoId": 1,
      "producto": { "nombre": "Charizard VMAX" },
      "cantidad": 1,
      "precioUnitario": 45000,
      "subtotal": 45000
    }
  ]
}
```

### Usuario
```json
{
  "id": 1,
  "username": "admin",
  "nombre": "Administrador",
  "email": "admin@pokemon.com",
  "role": "ADMIN"
}
```

### Categoría
```json
{
  "id": 1,
  "nombre": "Ultra Raras",
  "descripcion": "Cartas de rareza ultra"
}
```

## 🚨 Manejo de Errores

El frontend espera que los errores del backend tengan este formato:

```json
{
  "message": "Descripción del error",
  "status": 400,
  "error": "Bad Request"
}
```

### Códigos de Estado
- `200` - Éxito
- `201` - Creado
- `400` - Datos inválidos
- `401` - No autorizado (token inválido/expirado)
- `403` - Prohibido (sin permisos)
- `404` - No encontrado
- `500` - Error del servidor

## ⚙️ Variables de Entorno (Opcional)

Puedes crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=false
```

Y luego usar en el código:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

## 🧪 Testing con Datos Mock

Si quieres testear el frontend sin backend, deja `USE_MOCK = true`.

Los datos mock están en `src/mocks/mockData.js` y puedes modificarlos para tus pruebas.

### Usuarios Mock Disponibles:
- **admin** / **admin123** (ROL: ADMIN)
- **vendedor** / **vendedor123** (ROL: VENDEDOR)
- **cliente** / **cliente123** (ROL: CLIENTE)

## 📝 Checklist de Integración

- [ ] Configurar URL del backend en `api.config.js`
- [ ] Cambiar `USE_MOCK` a `false` en `auth.service.js`
- [ ] Configurar CORS en el backend
- [ ] Verificar que el backend tenga todos los endpoints
- [ ] Probar login con un usuario real
- [ ] Verificar que el token JWT se envía correctamente
- [ ] Testear operaciones CRUD
- [ ] Validar roles y permisos

## 🐛 Problemas Comunes

### "Network Error" al hacer login
- ✅ Verifica que el backend esté corriendo
- ✅ Revisa la URL en `api.config.js`
- ✅ Verifica CORS en el backend

### Token no se guarda
- ✅ Verifica que el backend devuelva el token
- ✅ Revisa la estructura de la respuesta

### Redirección infinita al login
- ✅ Token puede estar expirado
- ✅ Limpia localStorage: `localStorage.clear()`

---

**¡Listo para integrar!** 🚀
