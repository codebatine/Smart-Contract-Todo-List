import PropTypes from 'prop-types';

function TodoItem({ todo, handleClick, deleteTodo }) {
  return (
    <div className="TodoItem">
      <li className={todo.completed ? 'done' : ''}>
        <span className="TodoItem-name">{todo.task}</span>
        <button onClick={() => handleClick(todo.id)} className="App-button TodoItem-button">
          {todo.completed ? 'Undone' : 'Done'}
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="App-button TodoItem-button">Delete</button>
      </li>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;