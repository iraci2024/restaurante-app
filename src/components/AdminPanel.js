import React, { useState } from 'react';

const AdminPanel = ({ menu, setMenu, orders }) => {
  const [newItem, setNewItem] = useState({ name: '', price: '' });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      setMenu([...menu, { ...newItem, id: Date.now(), price: parseFloat(newItem.price) }]);
      setNewItem({ name: '', price: '' });
    }
  };

  const handleRemoveItem = (id) => {
    setMenu(menu.filter(item => item.id !== id));
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn">
            Adicionar Item
          </button>
        </form>
        <ul>
          {menu.map((item) => (
            <li key={item.id} className="mb-2 flex justify-between items-center">
              <span>{item.name} - R$ {item.price.toFixed(2)}</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
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
            {orders.map((order, index) => (
              <li key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <p className="font-semibold">Pedido #{index + 1}</p>
                <p>Cliente: {order.user.email}</p>
                <ul className="ml-4">
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.name} - {item.quantity}x - R$ {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold mt-2">Total: R$ {order.total.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
