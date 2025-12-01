/**
 * Componente atómico: LoadingSpinner
 * Indicador de carga reutilizable
 */
import PropTypes from 'prop-types';

function LoadingSpinner({ message = 'Cargando...', size = 'medium' }) {
  return (
    <div className={`loading loading-${size}`}>
      {message}
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default LoadingSpinner;
