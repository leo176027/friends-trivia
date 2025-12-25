const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Por favor proporciona un nombre de usuario'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor proporciona un email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor proporciona un email válido']
  },
  password: {
    type: String,
    required: [true, 'Por favor proporciona una contraseña'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  points: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    select: false
  },
  emailVerificationExpires: {
    type: Date,
    select: false
  },
  lastQuizCompleted: {
    type: Date,
    default: null
  },
  currentQuizSession: {
    startTime: Date,
    questionsAnswered: {
      type: Number,
      default: 0
    },
    questions: [{
      questionId: mongoose.Schema.Types.ObjectId,
      difficulty: String,
      answered: {
        type: Boolean,
        default: false
      }
    }]
  },
  answeredQuestions: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: String,
    isCorrect: Boolean,
    pointsEarned: Number,
    answeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índices para optimizar performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ points: -1 }); // Para ranking
userSchema.index({ lastQuizCompleted: 1 }); // Para verificar cooldown

module.exports = mongoose.model('User', userSchema);
