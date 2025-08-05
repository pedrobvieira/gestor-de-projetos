// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Quando uma requisição POST chegar para a rota raiz ('/'),
// o middleware 'protect' será executado primeiro. Se o token for válido,
// a função 'createTask' será executada em seguida.
router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

  router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);



module.exports = router;


