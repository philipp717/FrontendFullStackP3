import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BoletaService from '../../services/boleta.service';

function Boletas() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoleta, setSelectedBoleta] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    loadBoletas();
  }, []);

  const loadBoletas = async () => {
    try {
      const data = await BoletaService.getAll();
      setBoletas(data);
    } catch (error) {
      console.error('Error al cargar boletas:', error);
      setBoletas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (boleta) => {
    setSelectedBoleta(boleta);
    setShowDetail(true);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🎴 Pokémon Shop</h2>
          <p className="user-role">{user?.role}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/dashboard')}>📊 Dashboard</li>
            {user?.role === 'ADMIN' && (
              <>
                <li onClick={() => navigate('/productos')}>📦 Productos</li>
                <li onClick={() => navigate('/categorias')}>🏷️ Categorías</li>
              </>
            )}
            <li className="active">📋 Boletas</li>
            <li onClick={() => navigate('/tienda')}>🛒 Tienda</li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={() => { logout(); navigate('/'); }} className="btn-logout">
            🚪 Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>📋 Gestión de Boletas</h1>
          <p>Visualización de órdenes de compra</p>
        </header>

        {loading ? (
          <div className="loading">Cargando boletas...</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>N° Boleta</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Subtotal</th>
                  <th>IVA</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {boletas.map(boleta => (
                  <tr key={boleta.id}>
                    <td><strong>{boleta.numero}</strong></td>
                    <td>{boleta.fecha}</td>
                    <td>{boleta.usuario.nombre}</td>
                    <td>${boleta.subtotal.toLocaleString('es-CL')}</td>
                    <td>${boleta.iva.toLocaleString('es-CL')}</td>
                    <td><strong>${boleta.total.toLocaleString('es-CL')}</strong></td>
                    <td>
                      <span className={`badge badge-${boleta.estado.toLowerCase()}`}>
                        {boleta.estado}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleViewDetail(boleta)}
                        className="btn-icon btn-view"
                        title="Ver detalle"
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de Detalle */}
        {showDetail && selectedBoleta && (
          <div className="modal-overlay" onClick={() => setShowDetail(false)}>
            <div className="modal-content modal-large" onClick={e => e.stopPropagation()}>
              <h2>Detalle de Boleta {selectedBoleta.numero}</h2>
              
              <div className="boleta-info">
                <div className="info-row">
                  <span><strong>Fecha:</strong></span>
                  <span>{selectedBoleta.fecha}</span>
                </div>
                <div className="info-row">
                  <span><strong>Cliente:</strong></span>
                  <span>{selectedBoleta.usuario.nombre}</span>
                </div>
                <div className="info-row">
                  <span><strong>Estado:</strong></span>
                  <span className={`badge badge-${selectedBoleta.estado.toLowerCase()}`}>
                    {selectedBoleta.estado}
                  </span>
                </div>
              </div>

              <h3>Productos</h3>
              <table className="detail-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedBoleta.detalles.map(detalle => (
                    <tr key={detalle.id}>
                      <td>{detalle.producto.nombre}</td>
                      <td className="text-center">{detalle.cantidad}</td>
                      <td className="text-right">
                        ${detalle.precioUnitario.toLocaleString('es-CL')}
                      </td>
                      <td className="text-right">
                        <strong>${detalle.subtotal.toLocaleString('es-CL')}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-right"><strong>Subtotal:</strong></td>
                    <td className="text-right">${selectedBoleta.subtotal.toLocaleString('es-CL')}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-right"><strong>IVA (19%):</strong></td>
                    <td className="text-right">${selectedBoleta.iva.toLocaleString('es-CL')}</td>
                  </tr>
                  <tr className="total-row">
                    <td colSpan="3" className="text-right"><strong>TOTAL:</strong></td>
                    <td className="text-right">
                      <strong>${selectedBoleta.total.toLocaleString('es-CL')}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="modal-actions">
                <button 
                  onClick={() => setShowDetail(false)}
                  className="btn-secondary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Boletas;
