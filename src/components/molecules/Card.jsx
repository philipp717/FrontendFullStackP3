/**
 * Componente molecular: Card
 * Tarjeta reutilizable con header y footer opcional
 */
import PropTypes from 'prop-types';

function Card({ 
  title, 
  children, 
  footer, 
  onClick,
  className = '',
  style = {}
}) {
  return (
    <div 
      className={`card ${className}`.trim()}
      onClick={onClick}
      style={style}
    >
      {title && (
        <div className="card-header">
          <h3>{title}</h3>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Card;
