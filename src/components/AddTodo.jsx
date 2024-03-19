import { useState } from "react";
import PropTypes from 'prop-types';

export const AddTodo = ({ writeContract, populateTodos }) => {
  const [todo, setTodo] = useState({ task: "" });

  const createTodo = async () => {
    try {
      const result = await writeContract.createTodo(todo.task);
      await result.wait();

      console.log(result);

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
        createTodo();
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
  writeContract: PropTypes.shape({
    createTodo: PropTypes.func,
  }).isRequired,
  populateTodos: PropTypes.func.isRequired,
};