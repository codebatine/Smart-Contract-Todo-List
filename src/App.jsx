import { ethers } from 'ethers';
import './App.css';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { abi, contractAddress } from './config.js';
import { Todos } from './components/Todos.jsx';
import { AddTodo } from './components/AddTodo.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';


if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
} else {
  console.error('Get a web3 wallet, ok?');
}

function App() {
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
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
      const todoReadContract = new ethers.Contract(
        contractAddress,
        abi,
        window.provider,
      );
      setReadContract(todoReadContract);

      const signer = await window.provider.getSigner();
      const todoWriteContract = new ethers.Contract(
        contractAddress,
        abi,
        signer,
      );
      setWriteContract(todoWriteContract);

      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      updateWallet(accounts);
    };

    getProvider();
  }, [updateWallet]);

  const populateTodos = useCallback(async () => {
    const indexes = await readContract['getTodoIds']();
  
    if (!indexes || indexes.length === 0) {
      console.log('No indexes returned from getTodoIds');
      return;
    }
  
    let temp = [];
    for (let i = 0; i < indexes.length; i++) {
      const todo = await readContract['todos'](indexes[i]);
      if (todo[0] > 0) temp.push({ id: Number(todo[0]), task: todo[1], completed: todo[2] });
    }
    setTodos(temp);
  }, [readContract]);

  useEffect(() => {
    if (wallet && readContract) {
      populateTodos();
    }
  }, [wallet, readContract, populateTodos]);

  const formatBalance = (rawBalance) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(5);
    return balance;
  };

  const handleClick = async (id) => {
    try {
      const tx = await writeContract.toggleDone(id);
      await tx.wait();
      populateTodos();
    } catch (error) {
      console.error(`Failed to mark todo as done: ${error}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const tx = await writeContract.deleteTodo(id);
      await tx.wait();
      populateTodos();
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
  <AddTodo
    writeContract={writeContract}
    populateTodos={populateTodos}
  />
)}
  
  {writeContract && (
  <Todos
  todos={todos}
  writeContract={writeContract}
  populateTodos={populateTodos}
  toggleCompletion={handleClick}
  deleteTodo={deleteTodo}
/>
)}
      </div>
      <Footer />
    </div>
  );
}

export default App;