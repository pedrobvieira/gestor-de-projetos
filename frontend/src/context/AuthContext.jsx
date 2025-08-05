import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    // Sincroniza o estado se o token no localStorage mudar (ex: login em outra aba)
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const loginAction = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/');
  };

  const logoutAction = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value = {
    token,
    loginAction,
    logoutAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}