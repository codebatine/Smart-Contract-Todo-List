import { ethers } from 'ethers';
import { abi, contractAddress } from './config.js';

export let writeContract;
let readContract;

export const initializeBlockchain = async () => {
  if (window.ethereum) {
    window.provider = new ethers.BrowserProvider(window.ethereum);
  } else {
    console.error('Get a web3 wallet, ok?');
    return;
  }

  readContract = new ethers.Contract(contractAddress, abi, window.provider);

  const signer = await window.provider.getSigner();
  writeContract = new ethers.Contract(contractAddress, abi, signer);
};

export const getTodos = async () => {
  const indexes = await readContract['getTodoIds']();

  if (!indexes || indexes.length === 0) {
    console.log('No indexes returned from getTodoIds');
    return [];
  }

  let temp = [];
  for (let i = 0; i < indexes.length; i++) {
    const todo = await readContract['todos'](indexes[i]);
    if (todo[0] > 0)
      temp.push({ id: Number(todo[0]), task: todo[1], completed: todo[2] });
  }
  return temp;
};

export const toggleTodo = async (id) => {
  const tx = await writeContract.toggleDone(id);
  await tx.wait();
};

export const deleteTodo = async (id) => {
  const tx = await writeContract.deleteTodo(id);
  await tx.wait();
};

export const createTodo = async (task) => {
  const tx = await writeContract.createTodo(task);
  await tx.wait();
};
