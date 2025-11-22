import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UsuarioService from '../services/usuario.service';
import { MOCK_USERS } from '../mocks/mockData';

function Usuarios() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    email: '',
    role: 'CLIENTE'
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      // TODO: Cuando el backend esté listo
      // const data = await UsuarioService.getAll();
      setUsuarios(MOCK_USERS);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUsuario) {
        // TODO: await UsuarioService.update(editingUsuario.id, formData);
        console.log('Actualizando usuario:', formData);
      } else {
        // TODO: await UsuarioService.create(formData);
        console.log('Creando usuario:', formData);
      }
      
      setShowModal(false);
      resetForm();
      loadUsuarios();
      alert('Usuario guardado exitosamente');
    } catch (error) {
      alert('Error al guardar usuario: ' + error.message);
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      username: usuario.username,
      password: '',
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      // TODO: await UsuarioService.delete(id);
      console.log('Eliminando usuario:', id);
      loadUsuarios();
      alert('Usuario eliminado');
    } catch (error) {
      alert('Error al eliminar usuario: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      nombre: '',
      email: '',
      role: 'CLIENTE'
    });
    setEditingUsuario(null);
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
            <li onClick={() => navigate('/categorias')}>🏷️ Categorías</li>
            <li onClick={() => navigate('/boletas')}>📋 Boletas</li>
            <li className="active">👥 Usuarios</li>
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
          <h1>👥 Gestión de Usuarios</h1>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }} 
            className="btn-primary"
          >
            ➕ Nuevo Usuario
          </button>
        </header>

        {loading ? (
          <div className="loading">Cargando usuarios...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td><strong>{usuario.username}</strong></td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`badge badge-${usuario.role.toLowerCase()}`}>
                        {usuario.role}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleEdit(usuario)}
                        className="btn-icon btn-edit"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(usuario.id)}
                        className="btn-icon btn-delete"
                        title="Eliminar"
                        disabled={usuario.id === user?.id}
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
              <h2>{editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre de Usuario *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={editingUsuario}
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña {!editingUsuario && '*'}</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingUsuario}
                    placeholder={editingUsuario ? 'Dejar en blanco para no cambiar' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rol *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="CLIENTE">Cliente</option>
                    <option value="VENDEDOR">Vendedor</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    {editingUsuario ? 'Actualizar' : 'Crear'} Usuario
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

export default Usuarios;
