import React from 'react';

const Header = ({ user, onLogout, setCurrentView, setShowRegister, setShowLogin }) => {
  return (
    <header className="bg-gray-800 text-white header">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center flex-wrap">
        <h1 className="text-2xl font-bold">Restaurante App</h1>
        <nav className="w-full md:w-auto mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
            <li>
              <button onClick={() => setCurrentView('menu')} className="hover:text-gray-300">
                Cardápio
              </button>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={() => setCurrentView('myOrders')} className="hover:text-gray-300">
                    Meus Pedidos
                  </button>
                </li>
                {user.isAdmin && (
                  <li>
                    <button onClick={() => setCurrentView('admin')} className="hover:text-gray-300">
                      Admin
                    </button>
                  </li>
                )}
                <li className="md:ml-4">Olá, {user.name}</li>
                <li>
                  <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded btn"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => setShowLogin(true)} className="hover:text-gray-300">
                    Entrar
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowRegister(true)} className="hover:text-gray-300">
                    Cadastrar
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
