// backend/controllers/taskController.js
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Criar uma nova tarefa
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    // 1. Pega o título e a descrição do corpo da requisição
    const { title, description } = req.body;

    // 2. Cria a nova tarefa no banco de dados, associando-a ao ID do usuário logado.
    // Lembre-se: o middleware 'protect' adicionou o objeto 'user' ao 'req'.
    const task = await Task.create({
      title,
      description,
      user: req.user.id, 
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// @desc    Buscar todas as tarefas do usuário logado
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    // Encontra no banco de dados todas as tarefas onde o campo 'user'
    // é igual ao id do usuário que está logado (req.user.id).
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// @desc    Atualizar uma tarefa
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    // 1. Procura a tarefa pelo ID fornecido na URL
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarefa não encontrada' });
    }

    // 2. Verifica se o usuário logado é o "dono" da tarefa
    // Isso impede que um usuário modifique a tarefa de outro
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    // 3. Atualiza a tarefa com os dados enviados no corpo da requisição
    // O { new: true } garante que o objeto retornado seja a versão atualizada
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

// @desc    Excluir uma tarefa
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    // 1. Procura a tarefa pelo ID fornecido na URL
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Tarefa não encontrada' });
    }

    // 2. Verifica se o usuário logado é o "dono" da tarefa
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Usuário não autorizado' });
    }

    // 3. Se tudo estiver certo, remove a tarefa do banco de dados
    await task.deleteOne();

    res.status(200).json({ msg: 'Tarefa removida com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};