import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api.js';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const result = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      login(result);
      navigate('/todos');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="container page-narrow">
      <AuthForm
        title="Login"
        error={error}
        submitLabel="Login"
        onSubmit={handleSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email', value: form.email, onChange: handleChange },
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            value: form.password,
            onChange: handleChange
          }
        ]}
      />
      <p className="status-message">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default LoginPage;
