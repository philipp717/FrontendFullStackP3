/**
 * Componente molecular: FormField
 * Campo de formulario con label y validación
 */
import PropTypes from 'prop-types';
import Input from '../atoms/Input';

function FormField({ 
  label, 
  name, 
  type = 'text',
  value, 
  onChange, 
  required = false,
  error,
  placeholder,
  ...inputProps 
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        {...inputProps}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string
};

export default FormField;
