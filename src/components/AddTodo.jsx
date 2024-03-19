import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createTodo, initializeBlockchain } from '../blockchainService.js';

export const AddTodo = ({ populateTodos }) => {
  const [todo, setTodo] = useState({ task: "" });

  useEffect(() => {
    initializeBlockchain();
  }, []);

  const handleCreateTodo = async () => {
    try {
      await createTodo(todo.task);
      populateTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setTodo({ task: e.target.value });
  };

  return (
    <form
      className="add-todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTodo();
      }}
    >
      <input
        type="text"
        name="task"
        placeholder="Task"
        value={todo.task}
        onChange={handleChange}
      />
      <button>Add Todo</button>
    </form>
  );
};

AddTodo.propTypes = {
  populateTodos: PropTypes.func.isRequired,
};