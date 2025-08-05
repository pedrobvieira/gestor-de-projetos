import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from './DashboardPage.module.css'; // Importa nosso arquivo de estilos

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // ... (as funções fetchTasks, handleCreateTask, etc., continuam as mesmas)
  // --- INÍCIO DAS FUNÇÕES (sem alterações) ---
  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle) return alert('O título é obrigatório.');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const body = { title: newTaskTitle, description: newTaskDescription };
      const response = await axios.post('http://localhost:5000/api/tasks', body, config);
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } catch (error) {
      alert('Não foi possível criar a tarefa.');
    }
  };

  const handleUpdateTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'Concluído' ? 'A Fazer' : 'Concluído';
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const body = { status: newStatus };
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, body, config);
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
    } catch (error) {
      alert('Não foi possível atualizar a tarefa.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Tem certeza?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, config);
        setTasks(tasks.filter(task => task._id !== taskId));
      } catch (error) {
        alert('Não foi possível excluir a tarefa.');
      }
    }
  };
  // --- FIM DAS FUNÇÕES ---

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard de Tarefas</h1>
      
      <div className={styles.formContainer}>
        <h2>Criar Nova Tarefa</h2>
        <form onSubmit={handleCreateTask}>
          <input
            className={styles.input}
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Título da tarefa"
          />
          <textarea
            className={styles.textarea}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Descrição"
          />
          <button type="submit" className={`${styles.button} ${styles.createButton}`}>Adicionar Tarefa</button>
        </form>
      </div>

      <div className={styles.listContainer}>
        <h2>Minhas Tarefas</h2>
        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <div key={task._id} className={styles.taskCard}>
                <div className={styles.taskHeader}>
                  <h3>{task.title}</h3>
                  <span 
                    className={styles.taskStatus} 
                    style={{
                      backgroundColor: task.status === 'Concluído' ? '#d4edda' : '#fff3cd',
                      color: task.status === 'Concluído' ? '#155724' : '#856404'
                    }}
                  >
                    {task.status}
                  </span>
                </div>
                <p>{task.description}</p>
                <div className={styles.taskActions}>
                  <button onClick={() => handleUpdateTaskStatus(task._id, task.status)} className={`${styles.button} ${styles.updateButton}`}>
                    {task.status === 'Concluído' ? 'Marcar como A Fazer' : 'Marcar como Concluído'}
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className={`${styles.button} ${styles.deleteButton}`}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Você ainda não tem tarefas cadastradas.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;