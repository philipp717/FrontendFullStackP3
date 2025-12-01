/**
 * Componente molecular: StatCard
 * Tarjeta de estadística con ícono y contador
 */
import PropTypes from 'prop-types';
import Card from './Card';

function StatCard({ 
  title, 
  count, 
  icon, 
  color, 
  onClick 
}) {
  return (
    <Card 
      className="stat-card"
      style={{ borderColor: color }}
      onClick={onClick}
    >
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        {count !== undefined && <p className="stat-count">{count}</p>}
        <p className="stat-link">Ver detalles →</p>
      </div>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default StatCard;
