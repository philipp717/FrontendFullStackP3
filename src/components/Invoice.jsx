import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Invoice() {
  const [cart, setCart] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Obtener el carrito del state o del localStorage
    const cartData = location.state?.cart || JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (!cartData || cartData.length === 0) {
      navigate('/tienda');
      return;
    }
    
    setCart(cartData);

    // Generar número de boleta
    const randomInvoice = 'BOL-' + Date.now().toString().slice(-8);
    setInvoiceNumber(randomInvoice);
  }, [navigate, location]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const getIVA = () => {
    return Math.round(getTotalPrice() * 0.19)
  }

  const getSubtotal = () => {
    return getTotalPrice() - getIVA()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleNewPurchase = () => {
    localStorage.removeItem('cart');
    navigate('/tienda');
  };

  const getCurrentDate = () => {
    const date = new Date()
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container">
      <div className="invoice-container">
        <div className="invoice-header">
          <h1>🎴 Tienda Cartas Pokémon</h1>
          <h2>BOLETA DE VENTA</h2>
          <div className="invoice-info">
            <p><strong>Boleta N°:</strong> {invoiceNumber}</p>
            <p><strong>Fecha:</strong> {getCurrentDate()}</p>
            <p><strong>Cliente:</strong> {user?.nombre}</p>
          </div>
        </div>

        <div className="invoice-body">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Set</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.nombre}</strong>
                    <br />
                    <span className="item-rarity">{item.rareza}</span>
                  </td>
                  <td>{item.set}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">${item.precio.toLocaleString('es-CL')}</td>
                  <td className="text-right">
                    <strong>${(item.precio * item.quantity).toLocaleString('es-CL')}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-totals">
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

        <div className="invoice-footer">
          <p>¡Gracias por tu compra!</p>
          <p className="small-text">
            Todas nuestras cartas son originales y están en perfectas condiciones.
            <br />
            Garantía de autenticidad incluida.
          </p>
        </div>

        <div className="invoice-actions no-print">
          <button onClick={handlePrint} className="btn-primary">
            🖨️ Imprimir Boleta
          </button>
          <button onClick={handleNewPurchase} className="btn-secondary">
            🛒 Nueva Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice
