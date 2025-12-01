/**
 * Componente organismo: Header
 * Encabezado de página con título y acciones
 */
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

function Header({ 
  title, 
  subtitle, 
  actions = [],
  user
}) {
  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div className="header-actions">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'primary'}
              onClick={action.onClick}
              disabled={action.disabled}
              icon={action.icon}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.node
  })),
  user: PropTypes.object
};

export default Header;
