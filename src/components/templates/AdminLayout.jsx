/**
 * Template: AdminLayout
 * Layout reutilizable para páginas de administración
 */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';

function AdminLayout({ 
  children, 
  title, 
  subtitle,
  headerActions = [],
  activeMenuItem 
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Menú items dinámicos según el rol
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    ...(user?.role === 'ADMIN' ? [
      { icon: '📦', label: 'Productos', path: '/productos' },
      { icon: '🏷️', label: 'Categorías', path: '/categorias' }
    ] : []),
    { icon: '📋', label: 'Boletas', path: '/boletas' },
    { icon: '🛒', label: 'Tienda', path: '/tienda' }
  ];

  return (
    <div className="admin-container">
      <Sidebar 
        user={user}
        onLogout={handleLogout}
        menuItems={menuItems}
        activeItem={activeMenuItem}
      />
      <main className="admin-main">
        <Header 
          title={title}
          subtitle={subtitle}
          actions={headerActions}
          user={user}
        />
        {children}
      </main>
    </div>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headerActions: PropTypes.array,
  activeMenuItem: PropTypes.string
};

export default AdminLayout;
