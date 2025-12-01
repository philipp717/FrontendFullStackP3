import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CategoriaService from '../../services/categoria.service';

function Categorias() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      alert('Error al cargar categorías: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCategoria) {
        await CategoriaService.update(editingCategoria.id, formData);
        alert('Categoría actualizada exitosamente');
      } else {
        await CategoriaService.create(formData);
        alert('Categoría creada exitosamente');
      }
      
      setShowModal(false);
      resetForm();
      await loadCategorias();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      // Si es error de autenticación, el interceptor ya manejará el redirect
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      } else {
        alert('Error al guardar categoría: ' + (error.message || 'Error desconocido'));
      }
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;
    
    try {
      await CategoriaService.delete(id);
      alert('Categoría eliminada exitosamente');
      await loadCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      alert('Error al eliminar categoría: ' + (error.message || 'Error desconocido'));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: ''
    });
    setEditingCategoria(null);
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
            <li onClick={() => navigate('/productos')}>📦 Productos</li>
            <li className="active">🏷️ Categorías</li>
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
          <h1>🏷️ Gestión de Categorías</h1>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }} 
            className="btn-primary"
          >
            ➕ Nueva Categoría
          </button>
        </header>

        {loading ? (
          <div className="loading">Cargando categorías...</div>
        ) : (
          <div className="categories-grid">
            {categorias.map(categoria => (
              <div key={categoria.id} className="category-card">
                <div className="category-header">
                  <h3>🏷️ {categoria.nombre}</h3>
                </div>
                <div className="category-body">
                  <p>{categoria.descripcion}</p>
                </div>
                <div className="category-actions">
                  <button 
                    onClick={() => handleEdit(categoria)}
                    className="btn-icon btn-edit"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(categoria.id)}
                    className="btn-icon btn-delete"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>{editingCategoria ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
              
              <form onSubmit={handleSubmit}>
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
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows="4"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {editingCategoria ? 'Actualizar' : 'Crear'} Categoría
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

export default Categorias;
