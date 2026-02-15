const TodoForm = ({ values, onChange, onSubmit, submitLabel }) => (
  <form onSubmit={onSubmit} className="form-grid">
    <label>
      Title
      <input name="title" value={values.title} onChange={onChange} required />
    </label>

    <label>
      Description
      <textarea name="description" value={values.description} onChange={onChange} rows="4" required />
    </label>

    <label>
      Due Date
      <input type="date" name="dueDate" value={values.dueDate} onChange={onChange} required />
    </label>

    <label className="inline-label">
      <input
        type="checkbox"
        name="isCompleted"
        checked={values.isCompleted}
        onChange={onChange}
      />
      Completed
    </label>

    <button className="primary-button" type="submit">
      {submitLabel}
    </button>
  </form>
);

export default TodoForm;
