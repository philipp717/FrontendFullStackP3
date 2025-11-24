import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    // Validar campos vacíos
    if (!formData.username || !formData.password || !formData.nombre || !formData.email) {
      setError('Por favor completa todos los campos obligatorios');
      return false;
    }

    // Validar username (mínimo 3 caracteres)
    if (formData.username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }

    // Validar username (máximo 50 caracteres)
    if (formData.username.length > 50) {
      setError('El nombre de usuario no puede tener más de 50 caracteres');
      return false;
    }

    // Validar password (mínimo 6 caracteres)
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    // Validar password (máximo 255 caracteres)
    if (formData.password.length > 255) {
      setError('La contraseña no puede tener más de 255 caracteres');
      return false;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    // Validar nombre (mínimo 1 caracter, máximo 100)
    if (formData.nombre.length < 1 || formData.nombre.length > 100) {
      setError('El nombre debe tener entre 1 y 100 caracteres');
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return false;
    }

    // Validar longitud de email (máximo 100)
    if (formData.email.length > 100) {
      setError('El email no puede tener más de 100 caracteres');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos para el backend (sin confirmPassword y role será CLIENTE por defecto)
      const userData = {
        username: formData.username,
        password: formData.password,
        nombre: formData.nombre,
        email: formData.email,
        // role: 'CLIENTE' se asignará por defecto en el backend
      };

      await AuthService.register(userData);
      
      setSuccess('¡Registro exitoso! Redirigiendo al login...');
      
      // Esperar 2 segundos y redirigir al login
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error en registro:', err);
      setError(err.message || 'Error al registrar usuario. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>🎴 Tienda Cartas Pokémon</h1>
        <h2>Registro de Usuario</h2>
        <p className="subtitle">Crea tu cuenta para comprar cartas Pokémon</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Usuario <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu nombre de usuario (min. 3 caracteres)"
              disabled={loading}
              minLength={3}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">
              Nombre Completo <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Contraseña <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña (min. 6 caracteres)"
              disabled={loading}
              minLength={6}
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirmar Contraseña <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              disabled={loading}
              minLength={6}
              maxLength={255}
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="login-link">
          <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link></p>
        </div>

        <div className="demo-credentials">
          <p className="info-title">ℹ️ Información:</p>
          <ul>
            <li>Los usuarios registrados tendrán rol de <strong>CLIENTE</strong></li>
            <li>Podrás acceder a la tienda y realizar compras</li>
            <li>Los usuarios <strong>ADMIN</strong> y <strong>VENDEDOR</strong> se mantienen en el sistema</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;
