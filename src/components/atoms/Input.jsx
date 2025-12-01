/**
 * Componente atómico: Input
 * Input reutilizable con validación y estilos consistentes
 */
import PropTypes from 'prop-types';

function Input({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  disabled = false,
  min,
  max,
  className = '',
  ...props 
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      className={`input ${className}`.trim()}
      {...props}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
};

export default Input;
