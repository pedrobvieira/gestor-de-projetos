import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { token, logoutAction } = useAuth();

  // Estilos simples para a barra de navegação
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd',
  };

  const linkStyle = {
    marginRight: '1rem',
    textDecoration: 'none',
    color: 'blue',
  };

  return (
    <div>
      <nav style={navStyle}>
        <div>
          <Link to="/" style={linkStyle}><strong>Gestor de Projetos</strong></Link>
        </div>
        <div>
          {!token ? (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={linkStyle}>Register</Link>
            </>
          ) : (
            <button onClick={logoutAction}>
              Sair
            </button>
          )}
        </div>
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;