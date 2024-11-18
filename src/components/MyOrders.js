import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  return (
    <div className="my-orders">
      <h2 className="text-2xl font-bold mb-4">Meus Pedidos</h2>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="mb-4 p-4 border rounded bg-gray-50">
              <p className="font-semibold">Pedido #{order._id}</p>
              <ul className="ml-4">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.menuItem.name} - {item.quantity}x - R$ {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="font-semibold mt-2">Total: R$ {order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
