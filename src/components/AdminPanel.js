import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminPanel = () => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', category: '' });

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await api.get('/menu-items');
      setMenu(response.data);
    } catch (error) {
      console.error('Erro ao buscar o menu:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao buscar os pedidos:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await api.post('/menu-items', newItem);
      setNewItem({ name: '', price: '', description: '', category: '' });
      fetchMenu();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await api.delete(`/menu-items/${id}`);
      fetchMenu();
    } catch (error) {
      console.error('Erro ao remover item:', error);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2 className="text-2xl font-bold mb-4">Painel de Administração</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Gerenciar Cardápio</h3>
        <form onSubmit={handleAddItem} className="mb-4 flex flex-wrap items-center">
          <input
            type="text"
            placeholder="Nome do item"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="shadow appearance-none border rounded w-full sm:w-auto flex-grow sm:flex-grow-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2 sm:mb-0"
          />
          <input
            type="number"
            placeholder="Preço"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="shadow appearance-none border rounded w-full sm:w-auto flex-grow sm:flex-grow-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2 sm:mb-0"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="shadow appearance-none border rounded w-full sm:w-auto flex-grow sm:flex-grow-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2 sm:mb-0"
          />
          <input
            type="text"
            placeholder="Categoria"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="shadow appearance-none border rounded w-full sm:w-auto flex-grow sm:flex-grow-0 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2 sm:mb-0"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn">
            Adicionar Item
          </button>
        </form>
        <ul>
          {menu.map((item) => (
            <li key={item._id} className="mb-2 flex justify-between items-center">
              <span>{item.name} - R$ {item.price.toFixed(2)}</span>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline btn"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Pedidos</h3>
        {orders.length === 0 ? (
          <p>Nenhum pedido no momento.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="mb-4 p-4 border rounded bg-gray-50">
                <p className="font-semibold">Pedido #{order._id}</p>
                <p>Cliente: {order.user.name}</p>
                <ul className="ml-4">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.menuItem.name} - {item.quantity}x - R$ {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold mt-2">Total: R$ {order.total.toFixed(2)}</p>
                <p>Status: {order.status}</p>
                <div className="mt-2">
                  <button
                    onClick={() => handleUpdateOrderStatus(order._id, 'preparando')}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Preparando
                  </button>
                  <button
                    onClick={() => handleUpdateOrderStatus(order._id, 'entregue')}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                  >
                    Entregue
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
