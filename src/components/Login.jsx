import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación simple
    if (!username || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Intentar login con el backend
      const data = await login({ username, password });
      
      // Redirigir según el rol del usuario
      if (data.user.role === 'CLIENTE') {
        navigate('/tienda');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h1>🎴 Tienda Cartas Pokémon</h1>
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="info-title">👤 Usuarios de prueba (MOCK):</p>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Vendedor:</strong> vendedor / vendedor123</li>
            <li><strong>Cliente:</strong> cliente / cliente123</li>
          </ul>
          <p className="info-note">* Cuando el backend esté listo, usar credenciales reales</p>
        </div>
      </div>
    </div>
  )
}

export default Login
