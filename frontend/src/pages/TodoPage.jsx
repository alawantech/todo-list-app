import { useEffect, useState } from 'react';
import TodoCard from '../components/TodoCard.jsx';
import TodoForm from '../components/TodoForm.jsx';
import { apiRequest } from '../services/api.js';

const defaultForm = {
  title: '',
  description: '',
  dueDate: '',
  isCompleted: false
};

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    const result = await apiRequest('/todos');
    setTodos(result.todos);
  };

  useEffect(() => {
    fetchTodos().catch((requestError) => setError(requestError.message));
  }, []);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await apiRequest('/todos', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setForm(defaultForm);
      await fetchTodos();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleDelete = async (todoId) => {
    await apiRequest(`/todos/${todoId}`, { method: 'DELETE' });
    await fetchTodos();
  };

  const handleToggle = async (todo) => {
    await apiRequest(`/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isCompleted: !todo.isCompleted })
    });
    await fetchTodos();
  };

  return (
    <div className="container todo-layout">
      <section className="card">
        <h2>Create a new todo</h2>
        {error && <p className="error-message">{error}</p>}
        <TodoForm values={form} onChange={handleFormChange} onSubmit={handleCreate} submitLabel="Add Todo" />
      </section>

      <section className="card">
        <h2>Your todos</h2>
        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="status-message">No todos yet. Add your first one!</p>
          ) : (
            todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onDelete={handleDelete} onToggle={handleToggle} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TodoPage;
