const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => console.error('❌ Erro de conexão com o MongoDB:', err));

app.get('/', (req, res) => {
  res.send('API do Gestor de Projetos está funcionando!');
});

// Rota de teste para ver se o servidor está no ar
app.get('/', (req, res) => {
  res.send('API do Gestor de Projetos está funcionando!');
});

// Adicione esta linha:
// Definir as rotas da aplicação
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
