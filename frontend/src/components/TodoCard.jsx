import { CalendarClock, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodoCard = ({ todo, onToggle, onDelete }) => (
  <article className="todo-card">
    <div className="todo-main">
      <button className="icon-button" onClick={() => onToggle(todo)} title="Toggle complete">
        {todo.isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
      </button>

      <div>
        <Link to={`/todos/${todo.id}`} className="todo-title-link">
          <h3>{todo.title}</h3>
        </Link>
        <p>{todo.description}</p>
        <small>
          <CalendarClock size={14} /> {new Date(todo.dueDate).toLocaleDateString()}
        </small>
      </div>
    </div>

    <button className="icon-button danger" onClick={() => onDelete(todo.id)} title="Delete todo">
      <Trash2 size={18} />
    </button>
  </article>
);

export default TodoCard;
