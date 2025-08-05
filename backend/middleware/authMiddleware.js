// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Verificar se o token está no cabeçalho da requisição
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extrair o token do cabeçalho (formato "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verificar se o token é válido usando nossa chave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Se for válido, anexa as informações do usuário na requisição (sem a senha)
      // Assim, as próximas funções no ciclo da requisição saberão quem é o usuário.
      req.user = decoded.user;
      
      next(); // 5. Chama a próxima função no ciclo (deixa a pessoa entrar na festa)
    } catch (error) {
      res.status(401).json({ msg: 'Token não é válido' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Não autorizado, token não encontrado' });
  }
};