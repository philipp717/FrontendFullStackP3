/**
 * Componente organismo: Sidebar
 * Barra lateral de navegación reutilizable
 */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

function Sidebar({ 
  user, 
  onLogout, 
  menuItems = [],
  activeItem 
}) {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🎴 Pokémon Shop</h2>
        <p className="user-role">{user?.role}</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li 
              key={index}
              className={activeItem === item.path ? 'active' : ''}
              onClick={() => item.path && navigate(item.path)}
            >
              <span>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {user && (
          <div className="user-info">
            <div className="user-avatar">
              {user?.nombre?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="user-name">{user?.nombre}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
        )}
        <Button 
          variant="secondary" 
          onClick={onLogout}
          className="btn-logout"
          icon="🚪"
        >
          Salir
        </Button>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    nombre: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string.isRequired,
    path: PropTypes.string
  })),
  activeItem: PropTypes.string
};

export default Sidebar;
