import PropTypes from 'prop-types';

export const Todos = ({ todos, writeContract, populateTodos }) => {
  const deleteTodo = async (id) => {
    const result = await writeContract.deleteTodo(id);
    await result.wait();
    populateTodos();
  };

  const toggleCompletion = async (id) => {
    const result = await writeContract.completeTodo(id);
    await result.wait();
    populateTodos();
  };

  return (
    <div>
      {todos.map((t) => (
        <div className="degen-list" key={t.id}>
          <div>
            <span className="label">Task: </span> 
            <span className={t.completed ? 'completed-task' : ''}>{t.task}</span>
          </div>
          <div>
            <span className="label">Done?</span> {t.completed ? 'Yes' : 'No'}
          </div>
          <button
            className="toggle-completion-button"
            onClick={() => toggleCompletion(t.id)}
          >
            {t.completed ? 'Undone' : 'Done'}
          </button>
          <button
            className="remove-button"
            onClick={() => deleteTodo(t.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

Todos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      task: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  writeContract: PropTypes.shape({
    deleteTodo: PropTypes.func,
    completeTodo: PropTypes.func,
  }).isRequired,
  populateTodos: PropTypes.func.isRequired,
};