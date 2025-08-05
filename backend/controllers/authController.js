const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Função para REGISTRAR um novo usuário ---
exports.register = async (req, res) => {
  // Extrai nome, email e senha do corpo da requisição
  const { name, email, password } = req.body;

  try {
    // Verifica se o usuário já existe no banco de dados
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Um usuário com este e-mail já existe.' });
    }

    // Se não existe, cria uma nova instância do modelo User
    user = new User({
      name,
      email,
      password,
    });

    // Criptografa a senha antes de salvar (NUNCA salve senhas em texto puro)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salva o novo usuário no banco de dados
    await user.save();

    // Cria um Token JWT para o usuário ser "logado" automaticamente
    const payload = {
      user: {
        id: user.id, // O ID que o MongoDB cria para o usuário
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // A chave secreta do nosso .env
      { expiresIn: '5h' }, // O token expira em 5 horas
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token }); // Envia o token de volta como resposta
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};


// --- Função para LOGAR um usuário existente ---
exports.login = async (req, res) => {
  // Extrai email e senha do corpo da requisição
  const { email, password } = req.body;

  try {
    // Verifica se um usuário com esse e-mail existe no banco
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' }); // Mensagem genérica por segurança
    }

    // Se o usuário existe, compara a senha enviada com a senha criptografada no banco
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Se a senha está correta, criar e retornar um novo token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};