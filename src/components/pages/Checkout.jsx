import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BoletaService from '../../services/boleta.service';

function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metodoPago, setMetodoPago] = useState('EFECTIVO');

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart || JSON.parse(savedCart).length === 0) {
      navigate('/tienda');
      return;
    }
    setCart(JSON.parse(savedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const getIVA = () => {
    return Math.round(getTotalPrice() * 0.19);
  };

  const getSubtotal = () => {
    return getTotalPrice() - getIVA();
  };

  const handleProcessPayment = async () => {
    if (!user) {
      alert('Debes iniciar sesión para continuar');
      navigate('/');
      return;
    }

    setLoading(true);

    try {
      // Preparar datos de la boleta - enviar solo usuarioId y detalles
      // El backend calculará automáticamente totales, IVA, número, fecha, etc.
      const boletaData = {
        usuarioId: user.id,
        detalles: cart.map(item => ({
          productoId: item.id,
          cantidad: item.quantity
        }))
      };

      console.log('📤 Enviando boleta al backend:', boletaData);

      // Crear la boleta en el backend
      const boletaCreada = await BoletaService.create(boletaData);

      console.log('✅ Boleta creada exitosamente:', boletaCreada);

      // Limpiar el carrito
      localStorage.removeItem('cart');

      // Redirigir a la página de invoice con los datos de la boleta creada
      navigate('/invoice', { 
        state: { 
          boleta: boletaCreada,
          cart: cart,
          total: getTotalPrice(),
          metodoPago: metodoPago
        } 
      });

    } catch (error) {
      console.error('❌ Error al procesar el pago:', error);
      alert('Error al procesar el pago: ' + (error.message || 'Por favor, intenta nuevamente'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="checkout-container">
        <div className="checkout-header">
          <button onClick={() => navigate('/tienda')} className="btn-back">
            ← Volver a la tienda
          </button>
          <h1>🛒 Resumen de Compra</h1>
        </div>

        <div className="checkout-content">
          {/* Información del cliente */}
          <div className="checkout-section">
            <h2>📋 Información del Cliente</h2>
            <div className="info-box">
              <p><strong>Nombre:</strong> {user?.nombre}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Usuario:</strong> {user?.username}</p>
            </div>
          </div>

          {/* Método de pago */}
          <div className="checkout-section">
            <h2>💳 Método de Pago</h2>
            <div className="payment-methods">
              <label className={`payment-option ${metodoPago === 'EFECTIVO' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="EFECTIVO"
                  checked={metodoPago === 'EFECTIVO'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>💵 Efectivo</span>
              </label>
              <label className={`payment-option ${metodoPago === 'TARJETA' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="TARJETA"
                  checked={metodoPago === 'TARJETA'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>💳 Tarjeta de Crédito/Débito</span>
              </label>
              <label className={`payment-option ${metodoPago === 'TRANSFERENCIA' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="TRANSFERENCIA"
                  checked={metodoPago === 'TRANSFERENCIA'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>🏦 Transferencia Bancaria</span>
              </label>
            </div>
          </div>

          {/* Resumen de productos */}
          <div className="checkout-section">
            <h2>📦 Productos</h2>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="item-info">
                    <img 
                      src={item.imagen || 'https://via.placeholder.com/50'} 
                      alt={item.nombre}
                      className="item-image-small"
                    />
                    <div>
                      <h4>{item.nombre}</h4>
                      <p className="item-details">
                        {item.rareza} • {item.setPokemon || item.set}
                      </p>
                    </div>
                  </div>
                  <div className="item-quantity">
                    x{item.quantity}
                  </div>
                  <div className="item-price">
                    ${(item.precio * item.quantity).toLocaleString('es-CL')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totales */}
          <div className="checkout-section">
            <h2>💰 Total a Pagar</h2>
            <div className="checkout-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${getSubtotal().toLocaleString('es-CL')}</span>
              </div>
              <div className="total-row">
                <span>IVA (19%):</span>
                <span>${getIVA().toLocaleString('es-CL')}</span>
              </div>
              <div className="total-row total-final">
                <span>TOTAL:</span>
                <span>${getTotalPrice().toLocaleString('es-CL')}</span>
              </div>
            </div>
          </div>

          {/* Botón de pago */}
          <div className="checkout-actions">
            <button 
              onClick={handleProcessPayment}
              className="btn-process-payment"
              disabled={loading || cart.length === 0}
            >
              {loading ? '⏳ Procesando...' : '✅ Procesar Pago Ficticio'}
            </button>
            <p className="payment-notice">
              ℹ️ Este es un pago simulado. No se realizará ningún cargo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
