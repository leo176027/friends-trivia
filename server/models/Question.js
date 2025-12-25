const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    es: {
      type: String,
      required: [true, 'Por favor proporciona la pregunta en español']
    },
    en: {
      type: String,
      required: [true, 'Por favor proporciona la pregunta en inglés']
    }
  },
  options: [{
    text: {
      es: String,
      en: String
    },
    isCorrect: Boolean
  }],
  correctAnswer: {
    es: {
      type: String,
      required: [true, 'Por favor proporciona la respuesta correcta en español']
    },
    en: {
      type: String,
      required: [true, 'Por favor proporciona la respuesta correcta en inglés']
    }
  },
  points: {
    type: Number,
    default: 10
  },
  dailyDate: {
    type: Date,
    required: false  // Ya no es requerido porque usamos selección aleatoria
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  category: {
    type: String,
    default: 'Friends'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ya no necesitamos índice único en dailyDate porque usamos selección aleatoria
// questionSchema.index({ dailyDate: 1 }, { unique: true });

module.exports = mongoose.model('Question', questionSchema);
