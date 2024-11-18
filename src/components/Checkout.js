import React, { useState } from 'react';

const Checkout = ({ cart, total, onConfirmOrder }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular integração com sistema de pagamento
    console.log(`Processando pagamento de R$ ${total.toFixed(2)} via ${paymentMethod}`);
    
    // Simular envio de notificação via WhatsApp
    console.log(`Enviando confirmação do pedido para o WhatsApp: ${phoneNumber}`);
    
    // Chamar a função de confirmação do pedido
    onConfirmOrder();
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Finalizar Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Número de WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Método de Pagamento
          </label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="form-radio"
              />
              <span className="ml-2">Cartão de Crédito</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={() => setPaymentMethod('pix')}
                className="form-radio"
              />
              <span className="ml-2">PIX</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Resumo do Pedido</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-1">
                {item.name} - {item.quantity}x - R$ {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="font-bold mt-2">Total: R$ {total.toFixed(2)}</p>
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default Checkout;
