import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Todos } from './components/Todos.jsx';
import { AddTodo } from './components/AddTodo.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import { initializeBlockchain, getTodos, toggleTodo, deleteTodo, createTodo, writeContract } from './blockchainService.js';

function App() {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });
  const [todos, setTodos] = useState([]);

  const updateWallet = useCallback(async (accounts) => {
    const balance = formatBalance(
      await window.ethereum.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest'],
      }),
    );
    setWallet({ accounts, balance });
  }, []);

  useEffect(() => {
    const getProvider = async () => {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      updateWallet(accounts);
    };

    getProvider();
  }, [updateWallet]);

  useEffect(() => {
    initializeBlockchain();
    fetchTodos();
  }, []);

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5);
    return balance;
  };

  const fetchTodos = () => {
    getTodos().then(setTodos);
  };

  const handleClick = async (id) => {
    try {
      await toggleTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(`Failed to mark todo as done: ${error}`);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error(`Failed to delete todo: ${error}`);
    }
  };

  return (
    <div className="app-container">
      <Nav />
      <div className="spinning-D">todo</div>
      <div className="degen-container">
        <h1>Degen do good.</h1>
        {wallet?.accounts.length > 0 && (
          <div className="wallet-info">
            <div>
              <span>Wallet Address:</span>
              <br></br> {wallet.accounts[0]}
            </div>
            <p>
              <span>Balance:</span>
              <br></br> {wallet.balance}
            </p>
          </div>
        )}
  
        {writeContract && (
          <>
            <AddTodo
              writeContract={writeContract}
              populateTodos={fetchTodos}
            />
            <Todos
              todos={todos}
              writeContract={writeContract}
              populateTodos={fetchTodos}
              toggleCompletion={handleClick}
              deleteTodo={handleDeleteTodo}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;