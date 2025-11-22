import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Datos de cartas Pokémon (mock)
const pokemonCards = [
  { id: 1, name: 'Charizard VMAX', price: 45000, rarity: 'Ultra Rara', set: 'Darkness Ablaze' },
  { id: 2, name: 'Pikachu V', price: 15000, rarity: 'Rara', set: 'Vivid Voltage' },
  { id: 3, name: 'Mewtwo GX', price: 28000, rarity: 'Ultra Rara', set: 'Shining Legends' },
  { id: 4, name: 'Eevee VMAX', price: 32000, rarity: 'Ultra Rara', set: 'Evolving Skies' },
  { id: 5, name: 'Blastoise', price: 8000, rarity: 'Común', set: 'Base Set' },
  { id: 6, name: 'Rayquaza VMAX', price: 50000, rarity: 'Ultra Rara', set: 'Evolving Skies' },
  { id: 7, name: 'Gengar V', price: 18000, rarity: 'Rara', set: 'Fusion Strike' },
  { id: 8, name: 'Umbreon VMAX', price: 55000, rarity: 'Ultra Rara', set: 'Evolving Skies' },
]

function Welcome() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const addToCart = (card) => {
    const existingItem = cart.find(item => item.id === card.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === card.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...card, quantity: 1 }])
    }
  }

  const removeFromCart = (cardId) => {
    setCart(cart.filter(item => item.id !== cardId))
  }

  const updateQuantity = (cardId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cardId)
    } else {
      setCart(cart.map(item =>
        item.id === cardId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    navigate('/')
  }

  const handleGoToInvoice = () => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart))
      navigate('/invoice')
    } else {
      alert('Agrega al menos una carta al carrito')
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🎴 Bienvenido, {username}!</h1>
        <button onClick={handleLogout} className="btn-secondary">
          Cerrar Sesión
        </button>
      </div>

      <div className="content-wrapper">
        {/* Catálogo de cartas */}
        <div className="catalog">
          <h2>Catálogo de Cartas Pokémon</h2>
          <div className="cards-grid">
            {pokemonCards.map(card => (
              <div key={card.id} className="card-item">
                <h3>{card.name}</h3>
                <p className="card-rarity">{card.rarity}</p>
                <p className="card-set">Set: {card.set}</p>
                <p className="card-price">${card.price.toLocaleString('es-CL')}</p>
                <button 
                  onClick={() => addToCart(card)}
                  className="btn-primary"
                >
                  Agregar al Carrito
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div className="cart">
          <h2>🛒 Carrito de Compras</h2>
          
          {cart.length === 0 ? (
            <p className="empty-cart">El carrito está vacío</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toLocaleString('es-CL')} c/u</p>
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="btn-quantity"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="btn-quantity"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="btn-remove"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ${(item.price * item.quantity).toLocaleString('es-CL')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <h3>Total: ${getTotalPrice().toLocaleString('es-CL')}</h3>
                <button 
                  onClick={handleGoToInvoice}
                  className="btn-primary btn-large"
                >
                  Generar Boleta
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Welcome
