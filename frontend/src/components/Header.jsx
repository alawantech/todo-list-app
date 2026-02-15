import { CheckSquare, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link to="/" className="brand">
          <CheckSquare size={20} /> TodoFlow
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          {isAuthenticated && <NavLink to="/todos">My Todos</NavLink>}
        </nav>

        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="welcome">Hi, {user?.name}</span>
              <button className="ghost-button" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" to="/login">
                <LogIn size={16} /> Login
              </Link>
              <Link className="primary-button" to="/register">
                <UserPlus size={16} /> Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
