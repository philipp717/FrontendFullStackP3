import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductoService from '../services/producto.service';
import CategoriaService from '../services/categoria.service';

function Productos() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    rareza: '',
    setPokemon: '',
    categoriaId: ''
  });

  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await ProductoService.getAll();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      alert('Error al cargar categorías: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Preparar datos convirtiendo strings a números donde corresponda
      const productoData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio), // Convertir a número
        stock: parseInt(formData.stock, 10), // Convertir a número entero
        imagen: formData.imagen,
        rareza: formData.rareza,
        setPokemon: formData.setPokemon, // Usar setPokemon en lugar de set
        categoriaId: parseInt(formData.categoriaId, 10) // Convertir a número entero
      };

      if (editingProducto) {
        await ProductoService.update(editingProducto.id, productoData);
        alert('Producto actualizado exitosamente');
      } else {
        await ProductoService.create(productoData);
        alert('Producto creado exitosamente');
      }
      
      setShowModal(false);
      resetForm();
      await loadProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar producto: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
      imagen: producto.imagen || '',
      rareza: producto.rareza,
      setPokemon: producto.setPokemon || producto.set || '',
      categoriaId: producto.categoriaId?.toString() || producto.categoria?.id?.toString() || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await ProductoService.delete(id);
      alert('Producto eliminado exitosamente');
      await loadProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto: ' + (error.message || 'Error desconocido'));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagen: '',
      rareza: '',
      setPokemon: '',
      categoriaId: ''
    });
    setEditingProducto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🎴 Pokémon Shop</h2>
          <p className="user-role">{user?.role}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/dashboard')}>📊 Dashboard</li>
            <li className="active">📦 Productos</li>
            <li onClick={() => navigate('/categorias')}>🏷️ Categorías</li>
            <li onClick={() => navigate('/boletas')}>📋 Boletas</li>
            <li onClick={() => navigate('/tienda')}>🛒 Tienda</li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={() => { logout(); navigate('/'); }} className="btn-logout">
            🚪 Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>📦 Gestión de Productos</h1>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }} 
            className="btn-primary"
          >
            ➕ Nuevo Producto
          </button>
        </header>

        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Rareza</th>
                  <th>Set</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        className="product-thumb"
                      />
                    </td>
                    <td><strong>{producto.nombre}</strong></td>
                    <td>{producto.categoria?.nombre}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={producto.stock < 5 ? 'stock-low' : 'stock-ok'}>
                        {producto.stock}
                      </span>
                    </td>
                    <td>{producto.rareza}</td>
                    <td>{producto.setPokemon || producto.set}</td>
                    <td>
                      <button 
                        onClick={() => handleEdit(producto)}
                        className="btn-icon btn-edit"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(producto.id)}
                        className="btn-icon btn-delete"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>{editingProducto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Categoría *</label>
                    <select
                      name="categoriaId"
                      value={formData.categoriaId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {categorias.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    required
                    rows="3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Precio *</label>
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Rareza *</label>
                    <input
                      type="text"
                      name="rareza"
                      value={formData.rareza}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Set Pokémon *</label>
                    <input
                      type="text"
                      name="setPokemon"
                      value={formData.setPokemon}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: Vivid Voltage"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>URL de Imagen</label>
                  <input
                    type="text"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {editingProducto ? 'Actualizar' : 'Crear'} Producto
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Productos;
