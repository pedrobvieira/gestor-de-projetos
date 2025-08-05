const { protect } = require('../middleware/authMiddleware');

// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// AQUI ESTÁ A CORREÇÃO: Importamos 'register' e 'login' na MESMA linha, de uma só vez.
const { register, login } = require('../controllers/authController');

// @route   POST api/auth/register
// @desc    Registra um novo usuário
// @access  Public
router.post('/register', register);

// @route   POST api/auth/login
// @desc    Autentica um usuário e obtém o token
// @access  Public
router.post('/login', login);

// Rota de teste para o middleware
// Só pode ser acessada por usuários com token válido
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;