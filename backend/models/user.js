// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garante que não haverá dois usuários com o mesmo e-mail
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Cria os campos `createdAt` e `updatedAt` automaticamente
  }
);

module.exports = mongoose.model('User', UserSchema);