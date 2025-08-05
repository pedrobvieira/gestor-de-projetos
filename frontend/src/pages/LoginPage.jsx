import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPages.module.css'; // Importa nosso novo CSS

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = response.data.token;
      loginAction(token);
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error.response.data.msg);
      alert('Erro no login: ' + error.response.data.msg);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <h1>Página de Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Senha:</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;