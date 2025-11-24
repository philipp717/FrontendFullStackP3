import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductoService from '../services/producto.service';

function Tienda() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadProductos();
    loadCart();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await ProductoService.getAll();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (producto) => {
    const existingItem = cart.find(item => item.id === producto.id);
    
    if (existingItem) {
      const newCart = cart.map(item =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(newCart);
    } else {
      const newCart = [...cart, { ...producto, quantity: 1 }];
      saveCart(newCart);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    saveCart(newCart);
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    navigate('/invoice', { state: { cart, total: getTotalAmount() } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = ['all', ...new Set(productos.map(p => p.categoria?.nombre))];
  
  const filteredProductos = selectedCategory === 'all' 
    ? productos 
    : productos.filter(p => p.categoria?.nombre === selectedCategory);

  return (
    <div className="tienda-container">
      {/* Header */}
      <header className="tienda-header">
        <div className="header-content">
          <h1>🎴 Tienda de Cartas Pokémon</h1>
          <div className="header-actions">
            <span className="user-welcome">👋 {user?.nombre}</span>
            {user?.role !== 'CLIENTE' && (
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                📊 Dashboard
              </button>
            )}
            <button onClick={handleLogout} className="btn-logout">
              🚪 Salir
            </button>
          </div>
        </div>
      </header>

      <div className="tienda-content">
        {/* Sidebar de Categorías */}
        <aside className="categories-sidebar">
          <h3>📂 Categorías</h3>
          <ul>
            {categories.map(cat => (
              <li 
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Todas las cartas' : cat}
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3>🛒 Carrito</h3>
            <p className="cart-count">{cart.length} productos</p>
            <p className="cart-total">
              ${getTotalAmount().toLocaleString('es-CL')}
            </p>
            <button 
              onClick={handleCheckout} 
              className="btn-primary"
              disabled={cart.length === 0}
            >
              Proceder al Pago
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-section">
          <div className="products-header">
            <h2>Catálogo de Cartas</h2>
            <p>{filteredProductos.length} cartas disponibles</p>
          </div>

          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : (
            <div className="products-grid">
              {filteredProductos.map(producto => (
                <div key={producto.id} className="product-card">
                  <div className="product-image">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <span className="product-rarity">{producto.rareza}</span>
                  </div>
                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p className="product-set">📦 {producto.setPokemon || producto.set}</p>
                    <p className="product-desc">{producto.descripcion}</p>
                    <div className="product-footer">
                      <span className="product-price">
                        ${producto.precio.toLocaleString('es-CL')}
                      </span>
                      <span className="product-stock">
                        {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                      </span>
                    </div>
                    <button 
                      onClick={() => addToCart(producto)}
                      className="btn-add-cart"
                      disabled={producto.stock === 0}
                    >
                      {cart.find(item => item.id === producto.id) 
                        ? '✓ En el carrito' 
                        : '🛒 Agregar al carrito'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Cart Details (Drawer) */}
        {cart.length > 0 && (
          <aside className="cart-drawer">
            <h3>Carrito de Compras</h3>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>
                    <p>${item.precio.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="btn-remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Tienda;
