const AuthForm = ({ title, fields, onSubmit, submitLabel, error }) => (
  <section className="card auth-card">
    <h2>{title}</h2>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={onSubmit} className="form-grid">
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          <input
            type={field.type || 'text'}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            required={field.required ?? true}
          />
        </label>
      ))}
      <button className="primary-button" type="submit">
        {submitLabel}
      </button>
    </form>
  </section>
);

export default AuthForm;
