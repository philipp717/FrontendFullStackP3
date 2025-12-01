/**
 * Componente atómico: Badge
 * Etiqueta de estado reutilizable con diferentes variantes
 */
import PropTypes from 'prop-types';

function Badge({ children, variant = 'default', className = '' }) {
  const classes = `badge badge-${variant} ${className}`.trim();

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default', 
    'pendiente', 
    'pagada', 
    'cancelada',
    'admin',
    'vendedor', 
    'cliente'
  ]),
  className: PropTypes.string
};

export default Badge;
