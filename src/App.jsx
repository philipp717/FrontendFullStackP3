import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Tienda from './components/Tienda';
import Productos from './components/Productos';
import Boletas from './components/Boletas';
import Usuarios from './components/Usuarios';
import Categorias from './components/Categorias';
import Invoice from './components/Invoice';

// Componente para proteger rutas
function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Verificar si el usuario tiene alguno de los roles permitidos
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas para ADMIN y VENDEDOR */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Tienda - Todos los usuarios autenticados */}
      <Route 
        path="/tienda" 
        element={
          <ProtectedRoute>
            <Tienda />
          </ProtectedRoute>
        } 
      />
      
      {/* Productos - Solo ADMIN */}
      <Route 
        path="/productos" 
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <Productos />
          </ProtectedRoute>
        } 
      />
      
      {/* Boletas - ADMIN y VENDEDOR */}
      <Route 
        path="/boletas" 
        element={
          <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
            <Boletas />
          </ProtectedRoute>
        } 
      />
      
      {/* Usuarios - Solo ADMIN */}
      <Route 
        path="/usuarios" 
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <Usuarios />
          </ProtectedRoute>
        } 
      />
      
      {/* Categorías - Solo ADMIN */}
      <Route 
        path="/categorias" 
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <Categorias />
          </ProtectedRoute>
        } 
      />
      
      {/* Invoice/Boleta - Todos los usuarios autenticados */}
      <Route 
        path="/invoice" 
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App
