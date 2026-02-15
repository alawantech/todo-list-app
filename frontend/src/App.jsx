import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './context/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TodoDetailPage from './pages/TodoDetailPage.jsx';
import TodoPage from './pages/TodoPage.jsx';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/todos" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/todos" replace /> : <RegisterPage />}
          />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos/:id"
            element={
              <ProtectedRoute>
                <TodoDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
