import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/pages/Dashboard';
import Tienda from './components/pages/Tienda';
import Productos from './components/pages/Productos';
import Boletas from './components/pages/Boletas';
import Categorias from './components/pages/Categorias';
import Checkout from './components/pages/Checkout';
import Invoice from './components/pages/Invoice';

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
      <Route path="/register" element={<Register />} />
      
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
      
      {/* Categorías - Solo ADMIN */}
      <Route 
        path="/categorias" 
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <Categorias />
          </ProtectedRoute>
        } 
      />
      
      {/* Checkout - Todos los usuarios autenticados */}
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
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
