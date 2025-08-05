import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPages.module.css'; // Importa o MESMO arquivo de CSS

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Usuário registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro no registro:', error.response.data.msg);
      alert('Erro no registro: ' + error.response.data.msg);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formCard}>
        <h1>Página de Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit" className={styles.button}>Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;