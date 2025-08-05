// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '', // Opcional, se não for fornecida, será uma string vazia
    },
    status: {
      type: String,
      enum: ['A Fazer', 'Em Andamento', 'Concluído'], // A tarefa só pode ter um desses três status
      default: 'A Fazer',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Armazena o ID de um objeto
      ref: 'User', // A referência nos diz que este ID pertence a um documento da coleção 'User'
      required: true,
    },
  },
  {
    timestamps: true, // Cria os campos `createdAt` e `updatedAt` automaticamente
  }
);

module.exports = mongoose.model('Task', TaskSchema);