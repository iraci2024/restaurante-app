import React, { useState } from 'react';
import Header from './components/Header';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [menu, setMenu] = useState([
    { id: 1, name: 'Pizza Margherita', price: 25.99 },
    { id: 2, name: 'Hambúrguer Clássico', price: 15.99 },
    { id: 3, name: 'Salada Caesar', price: 12.99 },
  ]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const updateQuantity = (index, newQuantity) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newQuantity);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (user) {
      setIsCheckout(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      user: user,
      items: cart,
      total: getTotalPrice(),
      date: new Date(),
    };
    setOrders([...orders, newOrder]);
    alert('Pedido confirmado! Total: R$ ' + getTotalPrice().toFixed(2));
    setCart([]);
    setIsCheckout(false);
  };

  const handleRegister = (userData) => {
    console.log('Registrando usuário:', userData);
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogin = (credentials) => {
    console.log('Fazendo login:', credentials);
    setUser({ email: credentials.email });
    setShowLogin(false);
    if (credentials.email === 'admin@example.com') {
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setIsCheckout(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        {showRegister ? (
          <Register onRegister={handleRegister} />
        ) : showLogin ? (
          <Login onLogin={handleLogin} />
        ) : isAdmin ? (
          <AdminPanel menu={menu} setMenu={setMenu} orders={orders} />
        ) : !isCheckout ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Cardápio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4">Carrinho</h2>
            {cart.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index} className="mb-2 flex items-center justify-between">
                      <span>{item.name} - R$ {item.price.toFixed(2)}</span>
                      <div>
                        <button onClick={() => updateQuantity(index, item.quantity - 1)} className="bg-gray-200 px-2 py-1 rounded">-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, item.quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                        <button onClick={() => removeFromCart(index)} className="ml-4 bg-red-500 text-white px-2 py-1 rounded">Remover</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-bold">Total: R$ {getTotalPrice().toFixed(2)}</p>
                <button onClick={handleCheckout} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Finalizar Pedido
                </button>
              </>
            )}
          </>
        ) : (
          <Checkout cart={cart} total={getTotalPrice()} onConfirmOrder={handleConfirmOrder} />
        )}
        {!user && !showRegister && !showLogin && (
          <div className="mt-8">
            <button onClick={() => setShowRegister(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4">
              Cadastrar
            </button>
            <button onClick={() => setShowLogin(true)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Entrar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
