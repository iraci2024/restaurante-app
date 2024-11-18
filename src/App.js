import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import MyOrders from './components/MyOrders';
import api from './api/axios';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [menu, setMenu] = useState([]);
  const [currentView, setCurrentView] = useState('menu');

  useEffect(() => {
    fetchMenu();
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      localStorage.removeItem('token');
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu-items');
      setMenu(response.data);
    } catch (error) {
      console.error('Erro ao buscar o menu:', error);
    }
  };

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
      setCurrentView('checkout');
    } else {
      setShowLogin(true);
      setCurrentView('login');
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const order = {
        items: cart.map(item => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        total: getTotalPrice()
      };
      await api.post('/orders', order);
      alert('Pedido confirmado! Total: R$ ' + getTotalPrice().toFixed(2));
      setCart([]);
      setIsCheckout(false);
      setCurrentView('menu');
    } catch (error) {
      console.error('Erro ao confirmar o pedido:', error);
      alert('Erro ao confirmar o pedido. Por favor, tente novamente.');
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
    setCurrentView('menu');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setCurrentView('menu');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart([]);
    setIsCheckout(false);
    setCurrentView('menu');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return <Register onRegister={handleRegister} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'admin':
        return <AdminPanel menu={menu} setMenu={setMenu} />;
      case 'myOrders':
        return <MyOrders />;
      case 'checkout':
        return <Checkout cart={cart} total={getTotalPrice()} onConfirmOrder={handleConfirmOrder} />;
      default:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Cardápio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded shadow">
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        user={user} 
        onLogout={handleLogout}
        setCurrentView={setCurrentView}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default App;
