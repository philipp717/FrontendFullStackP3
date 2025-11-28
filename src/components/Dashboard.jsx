import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductoService from '../services/producto.service';
import BoletaService from '../services/boleta.service';
import UsuarioService from '../services/usuario.service';
import CategoriaService from '../services/categoria.service';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalBoletas: 0,
    totalUsuarios: 0,
    totalCategorias: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Cargar datos en paralelo
      const [productos, boletas, usuarios, categorias] = await Promise.all([
        ProductoService.getAll().catch(() => []),
        BoletaService.getAll().catch(() => []),
        user?.role === 'ADMIN' ? UsuarioService.getAll().catch(() => []) : Promise.resolve([]),
        CategoriaService.getAll().catch(() => [])
      ]);

      setStats({
        totalProductos: productos.length || 0,
        totalBoletas: boletas.length || 0,
        totalUsuarios: usuarios.length || 0,
        totalCategorias: categorias.length || 0
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Productos',
      count: stats.totalProductos,
      icon: '📦',
      color: '#4A90E2',
      path: '/productos',
      roles: ['ADMIN']
    },
    {
      title: 'Boletas',
      count: stats.totalBoletas,
      icon: '📋',
      color: '#50C878',
      path: '/boletas',
      roles: ['ADMIN', 'VENDEDOR']
    },
    {
      title: 'Categorías',
      count: stats.totalCategorias,
      icon: '🏷️',
      color: '#FFD700',
      path: '/categorias',
      roles: ['ADMIN']
    },
    {
      title: 'Usuarios',
      count: stats.totalUsuarios,
      icon: '👥',
      color: '#FF6B6B',
      path: '/usuarios',
      roles: ['ADMIN']
    },
    {
      title: 'Tienda',
      icon: '🛒',
      color: '#9B59B6',
      path: '/tienda',
      roles: ['ADMIN', 'VENDEDOR', 'CLIENTE']
    }
  ];

  // Filtrar items según el rol del usuario
  const visibleItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🎴 Pokémon Shop</h2>
          <p className="user-role">{user?.role}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <span>📊</span> Dashboard
            </li>
            {visibleItems.map((item, index) => (
              <li key={index} onClick={() => navigate(item.path)}>
                <span>{item.icon}</span> {item.title}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.nombre?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="user-name">{user?.nombre}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Panel Administrativo - Inicio de Sesión</h1>
            <p>Bienvenido/a, {user?.nombre}</p>
          </div>
          <button 
            onClick={loadStats} 
            className="btn-refresh"
            disabled={loading}
          >
            🔄 {loading ? 'Actualizando...' : 'Actualizar'}
          </button>
        </header>

        {/* Stats Cards */}
        {loading ? (
          <div className="loading">Cargando estadísticas...</div>
        ) : (
          <div className="stats-grid">
            {visibleItems.map((item, index) => (
              <div 
                key={index} 
                className="stat-card" 
                style={{ borderColor: item.color }}
                onClick={() => navigate(item.path)}
              >
                <div className="stat-icon" style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <div className="stat-content">
                  <h3>{item.title}</h3>
                  {item.count !== undefined && <p className="stat-count">{item.count}</p>}
                  <p className="stat-link">Ver detalles →</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/tienda')}>
              <span>🛒</span>
              <span>Ir a la Tienda</span>
            </button>
            
            {user?.role === 'ADMIN' && (
              <>
                <button className="action-btn" onClick={() => navigate('/productos')}>
                  <span>➕</span>
                  <span>Nuevo Producto</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/usuarios')}>
                  <span>👤</span>
                  <span>Nuevo Usuario</span>
                </button>
              </>
            )}
            
            <button className="action-btn" onClick={() => navigate('/boletas')}>
              <span>📄</span>
              <span>Ver Boletas</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
