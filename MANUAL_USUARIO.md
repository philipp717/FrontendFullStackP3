# 📚 Manual de Usuario - Tienda de Cartas Pokémon

## 🎯 Introducción

Bienvenido al sistema de gestión de la Tienda de Cartas Pokémon. Este manual te guiará en el uso de todas las funcionalidades disponibles según tu rol de usuario.

---

## 🚪 1. Inicio de Sesión

### Acceder al Sistema

1. Abre tu navegador y visita: `http://localhost:5173` (o `http://localhost:5174`)
2. Verás la pantalla de inicio de sesión

![Figura 1 - Pantalla de Login](docs/login.png)
**Figura 1:** Panel de inicio de sesión. Los usuarios deben ingresar sus credenciales para acceder al sistema.

### Credenciales de Prueba

Durante la fase de desarrollo, puedes usar estos usuarios:

| Rol | Usuario | Contraseña |
|-----|---------|-----------|
| Administrador | admin | admin123 |
| Vendedor | vendedor | vendedor123 |
| Cliente | cliente | cliente123 |

### Proceso de Login

1. Ingresa tu **nombre de usuario**
2. Ingresa tu **contraseña** (mínimo 6 caracteres)
3. Haz clic en **"Iniciar Sesión"**
4. El sistema te redirigirá según tu rol:
   - **ADMIN/VENDEDOR** → Dashboard
   - **CLIENTE** → Tienda

---

## 👨‍💼 2. Panel Administrativo (ADMIN/VENDEDOR)

### Dashboard Principal

![Figura 2 - Dashboard Administrativo](docs/dashboard.png)
**Figura 2:** Panel administrativo. Inicio de dashboard mostrando acceso directo a las funcionalidades del sistema.

#### Componentes del Dashboard:

1. **Sidebar Izquierdo**
   - Logo y rol del usuario
   - Menú de navegación
   - Información del usuario
   - Botón de cerrar sesión

2. **Área Central**
   - Tarjetas de estadísticas
   - Acciones rápidas
   - Información del sistema

3. **Tarjetas de Estadísticas**
   - **Productos**: Total de cartas en el sistema
   - **Boletas**: Número de órdenes registradas
   - **Categorías**: Categorías de productos
   - **Usuarios**: Usuarios registrados (solo ADMIN)

---

## 📦 3. Gestión de Productos (ADMIN)

### Listar Productos

![Figura 3 - Lista de Productos](docs/productos-lista.png)
**Figura 3:** Vista de lista de productos. Muestra todos los productos con opciones de edición y eliminación.

**Acceso:** Dashboard → Productos

**Información mostrada:**
- ID del producto
- Imagen de la carta
- Nombre
- Categoría
- Precio
- Stock disponible
- Rareza
- Set
- Acciones (Editar/Eliminar)

### Crear Nuevo Producto

1. Haz clic en **"➕ Nuevo Producto"**
2. Completa el formulario:

![Figura 4 - Formulario Nuevo Producto](docs/producto-nuevo.png)
**Figura 4:** Formulario de creación de producto. Permite ingresar toda la información del producto.

**Campos obligatorios:**
- Nombre de la carta
- Categoría
- Descripción
- Precio
- Stock
- Rareza
- Set
- URL de imagen (opcional)

3. Haz clic en **"Crear Producto"**
4. El sistema confirmará la creación

### Editar Producto

1. En la lista de productos, haz clic en el botón **✏️ Editar**
2. Modifica los campos necesarios
3. Haz clic en **"Actualizar Producto"**

### Eliminar Producto

1. En la lista, haz clic en el botón **🗑️ Eliminar**
2. Confirma la acción en el diálogo
3. El producto será eliminado del sistema

> ⚠️ **Nota:** No podrás eliminar productos que tengan órdenes asociadas.

---

## 🏷️ 4. Gestión de Categorías (ADMIN)

### Vista de Categorías

![Figura 5 - Categorías](docs/categorias.png)
**Figura 5:** Vista de categorías. Muestra todas las categorías en formato de tarjetas.

**Acceso:** Dashboard → Categorías

### Crear Nueva Categoría

1. Haz clic en **"➕ Nueva Categoría"**
2. Completa el formulario:
   - **Nombre:** Nombre de la categoría
   - **Descripción:** Descripción opcional
3. Haz clic en **"Crear Categoría"**

### Editar/Eliminar Categoría

- **Editar:** Haz clic en **✏️ Editar** en la tarjeta
- **Eliminar:** Haz clic en **🗑️ Eliminar** (requiere confirmación)

---

## 📋 5. Gestión de Boletas (ADMIN/VENDEDOR)

### Lista de Boletas

![Figura 6 - Lista de Boletas](docs/boletas-lista.png)
**Figura 6:** Vista de boletas. Muestra todas las órdenes de compra registradas.

**Acceso:** Dashboard → Boletas

**Información mostrada:**
- Número de boleta
- Fecha de emisión
- Cliente
- Subtotal
- IVA (19%)
- Total
- Estado (PAGADA/PENDIENTE)

### Ver Detalle de Boleta

1. Haz clic en el botón **👁️ Ver** en cualquier boleta
2. Se mostrará un modal con:

![Figura 7 - Detalle de Boleta](docs/boleta-detalle.png)
**Figura 7:** Detalle de boleta. Muestra información completa de la orden incluyendo productos.

   - Información del cliente
   - Lista de productos comprados
   - Cantidades y precios
   - Totales calculados

> **Nota para VENDEDOR:** Solo puedes ver las boletas, no puedes modificarlas ni eliminarlas.

---

## 👥 6. Gestión de Usuarios (ADMIN)

### Lista de Usuarios

![Figura 8 - Gestión de Usuarios](docs/usuarios.png)
**Figura 8:** Vista de usuarios. Permite administrar todos los usuarios del sistema.

**Acceso:** Dashboard → Usuarios

### Crear Nuevo Usuario

1. Haz clic en **"➕ Nuevo Usuario"**
2. Completa el formulario:

![Figura 9 - Formulario de Usuario](docs/usuario-nuevo.png)
**Figura 9:** Formulario de creación de usuario. Permite asignar roles y credenciales.

**Campos:**
- **Nombre de Usuario:** Único en el sistema
- **Contraseña:** Mínimo 6 caracteres
- **Nombre Completo:** Nombre del usuario
- **Email:** Correo electrónico
- **Rol:** Seleccionar entre CLIENTE, VENDEDOR o ADMIN

3. Haz clic en **"Crear Usuario"**

### Editar Usuario

1. Haz clic en **✏️ Editar**
2. Modifica los campos necesarios
3. **Importante:** Dejar la contraseña en blanco si no deseas cambiarla
4. Haz clic en **"Actualizar Usuario"**

### Eliminar Usuario

1. Haz clic en **🗑️ Eliminar**
2. Confirma la acción

> ⚠️ **Nota:** No puedes eliminar tu propio usuario.

---

## 🛒 7. Tienda (Todos los Usuarios)

### Catálogo de Productos

![Figura 10 - Tienda](docs/tienda.png)
**Figura 10:** Vista de la tienda. Catálogo de cartas Pokémon disponibles para compra.

**Acceso:** 
- **ADMIN/VENDEDOR:** Dashboard → Tienda
- **CLIENTE:** Redirige automáticamente después del login

### Componentes de la Tienda:

1. **Sidebar de Categorías** (izquierda)
   - Filtrar por categoría
   - Ver "Todas las cartas"

2. **Grid de Productos** (centro)
   - Imagen de la carta
   - Nombre y descripción
   - Precio en pesos chilenos
   - Stock disponible
   - Botón "Agregar al carrito"

3. **Resumen del Carrito** (izquierda)
   - Cantidad de productos
   - Total a pagar
   - Botón "Proceder al Pago"

### Agregar Productos al Carrito

1. Navega por las categorías o explora todas las cartas
2. Haz clic en **"🛒 Agregar al carrito"** en la carta deseada
3. El botón cambiará a **"✓ En el carrito"**
4. Verás el producto en el panel lateral

### Gestionar Carrito

![Figura 11 - Carrito de Compras](docs/carrito.png)
**Figura 11:** Carrito de compras. Permite modificar cantidades y eliminar productos.

En el panel lateral del carrito:
- **Aumentar cantidad:** Haz clic en **+**
- **Disminuir cantidad:** Haz clic en **-**
- **Eliminar producto:** Haz clic en **🗑️**

### Proceder al Checkout

1. Verifica que el carrito tenga productos
2. Haz clic en **"Proceder al Pago"**
3. Serás redirigido a la pantalla de boleta

---

## 📄 8. Generación de Boleta

### Vista de Boleta

![Figura 12 - Boleta Final](docs/invoice.png)
**Figura 12:** Boleta de venta. Documento final con todos los detalles de la compra.

**Información incluida:**
- **Encabezado:**
  - Número de boleta (autogenerado)
  - Fecha y hora
  - Nombre del cliente

- **Detalle de productos:**
  - Nombre de cada carta
  - Set
  - Cantidad
  - Precio unitario
  - Total por producto

- **Totales:**
  - **Subtotal:** Total sin IVA
  - **IVA (19%):** Impuesto calculado
  - **TOTAL:** Monto final a pagar

### Acciones Disponibles

1. **🖨️ Imprimir Boleta**
   - Genera versión imprimible
   - Sin elementos de navegación
   - Lista para PDF

2. **🛒 Nueva Compra**
   - Limpia el carrito
   - Regresa a la tienda

---

## 🔐 9. Roles y Permisos

### Matriz de Permisos

| Funcionalidad | ADMIN | VENDEDOR | CLIENTE |
|--------------|-------|----------|---------|
| **Dashboard** | ✅ | ✅ | ❌ |
| **Ver Productos** | ✅ | ✅ | ✅ |
| **Crear/Editar/Eliminar Productos** | ✅ | ❌ | ❌ |
| **Ver Categorías** | ✅ | ❌ | ❌ |
| **Crear/Editar/Eliminar Categorías** | ✅ | ❌ | ❌ |
| **Ver Boletas** | ✅ | ✅ | ❌ |
| **Ver Usuarios** | ✅ | ❌ | ❌ |
| **Crear/Editar/Eliminar Usuarios** | ✅ | ❌ | ❌ |
| **Comprar en Tienda** | ✅ | ✅ | ✅ |

---

## 🚪 10. Cerrar Sesión

Para cerrar sesión de forma segura:

1. **Opción 1:** Haz clic en el botón **"🚪 Salir"** en el sidebar
2. **Opción 2:** Haz clic en el botón de salir en el header (solo en tienda)

El sistema:
- Eliminará tu token de autenticación
- Limpiará los datos de sesión
- Te redirigirá a la pantalla de login

---

## 🛡️ 11. Seguridad

### Buenas Prácticas

✅ **Siempre cierra sesión** al terminar  
✅ **No compartas** tus credenciales  
✅ **Usa contraseñas seguras** (mínimo 6 caracteres)  
✅ **Verifica que sea HTTPS** en producción  

### Sesión Persistente

- La sesión se mantiene activa incluso si recargas la página (F5)
- El token expira después de cierto tiempo (configurable en backend)
- Si el token expira, serás redirigido automáticamente al login

---

## ❓ 12. Preguntas Frecuentes

### ¿Qué hago si olvido mi contraseña?
Contacta al administrador del sistema para restablecer tu contraseña.

### ¿Puedo cambiar mi rol?
Solo un administrador puede cambiar roles de usuario.

### ¿Por qué no veo el menú de Productos?
Eres un usuario CLIENTE. Solo ADMIN y VENDEDOR tienen acceso al dashboard.

### ¿Cómo sé si un producto está agotado?
Los productos con stock 0 muestran "Agotado" y el botón de agregar está deshabilitado.

### ¿Puedo cancelar una boleta?
Actualmente no. Contacta al administrador para gestiones de cancelación.

---

## 📞 13. Soporte

Para soporte técnico o reportar problemas:

**Correo:** soporte@pokemonshop.com  
**Teléfono:** +56 9 XXXX XXXX  
**Horario:** Lunes a Viernes, 9:00 - 18:00

---

**Versión del Manual:** 1.0  
**Fecha:** Noviembre 2024  
**Desarrollado para:** DSY1104 - Evaluación Parcial 3
