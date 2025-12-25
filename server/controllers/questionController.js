const Question = require('../models/Question');
const User = require('../models/User');
const mongoose = require('mongoose');

// Obtener conjunto de 4 preguntas (2 fáciles, 1 mediana, 1 difícil)
exports.getDailyQuestion = async (req, res) => {
  try {
    const userId = req.userId;
    const language = req.query.lang || 'es'; // Obtener idioma de la query string
    console.log('🔍 Buscando usuario:', userId);
    // Optimización: traer solo campos necesarios
    const user = await User.findById(userId).select('+lastQuizCompleted +currentQuizSession +answeredQuestions');

    if (!user) {
      console.log('❌ Usuario no encontrado:', userId);
      return res.status(404).json({ 
        message: 'Usuario no encontrado. Por favor inicia sesión nuevamente.',
        requiresLogin: true
      });
    }
    
    console.log('✅ Usuario encontrado:', user.username);

    // Verificar si han pasado 48 horas desde el último quiz
    const now = new Date();
    const fortyEightHours = 48 * 60 * 60 * 1000;

    if (user.lastQuizCompleted) {
      const timeSinceLastQuiz = now - new Date(user.lastQuizCompleted);
      if (timeSinceLastQuiz < fortyEightHours) {
        const timeRemaining = fortyEightHours - timeSinceLastQuiz;
        const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
        const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
        
        return res.status(400).json({ 
          message: `Debes esperar ${hoursRemaining}h ${minutesRemaining}m para responder nuevas preguntas`,
          canAnswerAt: new Date(user.lastQuizCompleted.getTime() + fortyEightHours),
          timeRemaining: {
            hours: hoursRemaining,
            minutes: minutesRemaining
          }
        });
      }
    }

    // Si hay una sesión activa sin completar, verificar si expiró (más de 2 horas)
    if (user.currentQuizSession && user.currentQuizSession.startTime) {
      const sessionAge = now - new Date(user.currentQuizSession.startTime);
      const twoHours = 2 * 60 * 60 * 1000;
      
      if (sessionAge < twoHours) {
        // Sesión activa, devolver las preguntas de la sesión actual
        const sessionQuestions = await Question.find({
          _id: { $in: user.currentQuizSession.questions.map(q => q.questionId) }
        });

        // Nota: Las opciones ya se mezclarán en el frontend
        return res.json({
          questions: sessionQuestions.map((q, index) => ({
            id: q._id,
            question: q.question[language] || q.question.es,
            options: q.options.map(opt => ({ 
              text: opt.text[language] || opt.text.es 
            })),
            difficulty: q.difficulty,
            category: q.category,
            answered: user.currentQuizSession.questions[index].answered,
            timeLimit: 30 // segundos
          })),
          sessionActive: true,
          questionsAnswered: user.currentQuizSession.questionsAnswered
        });
      }
    }

    // Crear nueva sesión de quiz: obtener 2 fáciles, 1 mediana, 1 difícil
    // Excluir preguntas ya respondidas por el usuario
    const answeredQuestionIds = user.answeredQuestions?.map(aq => {
      // Convertir a ObjectId para comparación en MongoDB
      const id = typeof aq.questionId === 'string' ? aq.questionId : aq.questionId.toString();
      return new mongoose.Types.ObjectId(id);
    }) || [];
    
    console.log('🔍 Usuario tiene', answeredQuestionIds.length, 'preguntas respondidas');

    const easyQuestions = await Question.aggregate([
      { $match: { 
        difficulty: 'easy',
        _id: { $nin: answeredQuestionIds }
      } },
      { $sample: { size: 2 } }
    ]);

    const mediumQuestions = await Question.aggregate([
      { $match: { 
        difficulty: 'medium',
        _id: { $nin: answeredQuestionIds }
      } },
      { $sample: { size: 1 } }
    ]);

    const hardQuestions = await Question.aggregate([
      { $match: { 
        difficulty: 'hard',
        _id: { $nin: answeredQuestionIds }
      } },
      { $sample: { size: 1 } }
    ]);

    const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    if (allQuestions.length < 4) {
      return res.status(404).json({ 
        message: 'No hay suficientes preguntas disponibles. Se necesitan al menos 2 fáciles, 1 mediana y 1 difícil.' 
      });
    }

    // Mezclar las preguntas aleatoriamente
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    // Guardar la sesión de quiz en el usuario
    user.currentQuizSession = {
      startTime: now,
      questionsAnswered: 0,
      questions: shuffledQuestions.map(q => ({
        questionId: q._id,
        difficulty: q.difficulty,
        answered: false
      }))
    };

    await user.save();

    res.json({
      questions: shuffledQuestions.map(q => ({
        id: q._id,
        question: q.question[language] || q.question.es,
        options: q.options.map(opt => ({ 
          text: opt.text[language] || opt.text.es 
        })),
        difficulty: q.difficulty,
        category: q.category,
        timeLimit: 30 // segundos
      })),
      sessionActive: true,
      questionsAnswered: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Crear pregunta del día (solo administrador)
exports.createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, difficulty, points } = req.body;

    if (!question || !options || !correctAnswer) {
      return res.status(400).json({ message: 'Por favor completa todos los campos' });
    }

    // Obtener la fecha de hoy (inicio del día)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verificar si ya existe pregunta para hoy
    const existingQuestion = await Question.findOne({
      dailyDate: today
    });

    if (existingQuestion) {
      return res.status(400).json({ message: 'Ya existe una pregunta para hoy' });
    }

    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      difficulty: difficulty || 'medium',
      points: points || 10,
      dailyDate: today
    });

    await newQuestion.save();

    res.status(201).json({
      message: 'Pregunta creada exitosamente',
      question: newQuestion
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener todas las preguntas (para administrador)
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ dailyDate: -1 });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
