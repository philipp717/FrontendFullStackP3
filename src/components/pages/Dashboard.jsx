import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../templates/AdminLayout';
import StatCard from '../molecules/StatCard';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ProductoService from '../../services/producto.service';
import BoletaService from '../../services/boleta.service';
import CategoriaService from '../../services/categoria.service';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalBoletas: 0,
    totalCategorias: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Cargar datos en paralelo
      const [productos, boletas, categorias] = await Promise.all([
        ProductoService.getAll().catch(() => []),
        BoletaService.getAll().catch(() => []),
        CategoriaService.getAll().catch(() => [])
      ]);

      setStats({
        totalProductos: productos.length || 0,
        totalBoletas: boletas.length || 0,
        totalCategorias: categorias.length || 0
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
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
      title: 'Tienda',
      icon: '🛒',
      color: '#9B59B6',
      path: '/tienda',
      roles: ['ADMIN', 'VENDEDOR', 'CLIENTE']
    }
  ];

  // Filtrar items según el rol del usuario
  const visibleItems = menuItems.filter(item => item.roles.includes(user?.role));

  const headerActions = [
    {
      label: loading ? 'Actualizando...' : 'Actualizar',
      onClick: loadStats,
      disabled: loading,
      icon: '🔄',
      variant: 'secondary'
    }
  ];

  return (
    <AdminLayout
      title="Panel Administrativo - Inicio de Sesión"
      subtitle={`Bienvenido/a, ${user?.nombre}`}
      headerActions={headerActions}
      activeMenuItem="/dashboard"
    >
      {/* Stats Cards */}
      {loading ? (
        <LoadingSpinner message="Cargando estadísticas..." />
      ) : (
        <div className="stats-grid">
          {visibleItems.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              count={item.count}
              icon={item.icon}
              color={item.color}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div className="actions-grid">
          <Button 
            className="action-btn" 
            onClick={() => navigate('/tienda')}
            icon="🛒"
          >
            Ir a la Tienda
          </Button>
          
          {user?.role === 'ADMIN' && (
            <>
              <Button 
                className="action-btn" 
                onClick={() => navigate('/productos')}
                icon="➕"
              >
                Nuevo Producto
              </Button>
              <Button 
                className="action-btn" 
                onClick={() => navigate('/categorias')}
                icon="🏷️"
              >
                Nueva Categoría
              </Button>
            </>
          )}
          
          <Button 
            className="action-btn" 
            onClick={() => navigate('/boletas')}
            icon="📄"
          >
            Ver Boletas
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
