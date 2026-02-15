import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TodoForm from '../components/TodoForm.jsx';
import { apiRequest } from '../services/api.js';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', dueDate: '', isCompleted: false });
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest(`/todos/${id}`)
      .then((result) => {
        const todo = result.todo;
        setForm({
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate.slice(0, 10),
          isCompleted: todo.isCompleted
        });
      })
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await apiRequest(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form)
      });
      navigate('/todos');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleDelete = async () => {
    await apiRequest(`/todos/${id}`, { method: 'DELETE' });
    navigate('/todos');
  };

  return (
    <div className="container page-narrow">
      <section className="card">
        <Link to="/todos" className="ghost-button inline-back">
          <ArrowLeft size={16} /> Back to todos
        </Link>
        <h2>Edit todo</h2>
        {error && <p className="error-message">{error}</p>}
        <TodoForm values={form} onChange={handleChange} onSubmit={handleSubmit} submitLabel="Save changes" />
        <button className="danger-button" onClick={handleDelete}>
          Delete Todo
        </button>
      </section>
    </div>
  );
};

export default TodoDetailPage;
