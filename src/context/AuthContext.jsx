import { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario y token válidos al cargar la aplicación
    const token = AuthService.getToken();
    const currentUser = AuthService.getCurrentUser();
    
    // Solo restaurar el usuario si hay token Y usuario
    if (token && currentUser) {
      setUser(currentUser);
    } else {
      // Si falta alguno, limpiar todo
      AuthService.logout();
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    // Forzar recarga para limpiar cualquier estado en memoria
    window.location.href = '/';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
