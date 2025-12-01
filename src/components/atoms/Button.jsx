/**
 * Componente atómico: Button
 * Botón reutilizable con diferentes variantes y estados
 */
import PropTypes from 'prop-types';

function Button({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  disabled = false, 
  onClick,
  className = '',
  icon,
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const classes = `${baseClass} ${variantClass} ${className}`.trim();

  return (
    <button 
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'icon']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node
};

export default Button;
