const User = require('../models/User');
const Question = require('../models/Question');
const Score = require('../models/Score');

// Responder pregunta (con manejo de timeout)
exports.answerQuestion = async (req, res) => {
  try {
    const { questionId, answer, timedOut } = req.body;
    const userId = req.userId;

    if (!questionId) {
      return res.status(400).json({ message: 'Por favor proporciona questionId' });
    }

    // Optimización: usar select para traer solo campos necesarios
    const user = await User.findById(userId).select('+points +answeredQuestions +currentQuizSession +lastQuizCompleted');
    const question = await Question.findById(questionId).lean();

    if (!user || !question) {
      return res.status(404).json({ message: 'Usuario o pregunta no encontrada' });
    }

    // Verificar que el usuario tenga una sesión activa
    if (!user.currentQuizSession || !user.currentQuizSession.questions || user.currentQuizSession.questions.length === 0) {
      return res.status(400).json({ message: 'No tienes una sesión de quiz activa' });
    }

    // Verificar que la pregunta pertenece a la sesión actual
    const questionIndex = user.currentQuizSession.questions.findIndex(
      q => q.questionId.toString() === questionId
    );

    if (questionIndex === -1) {
      return res.status(400).json({ message: 'Esta pregunta no pertenece a tu sesión actual' });
    }

    // Verificar si la pregunta ya fue respondida
    if (user.currentQuizSession.questions[questionIndex].answered) {
      return res.status(400).json({ message: 'Ya has respondido esta pregunta' });
    }

    // Si hay timeout, marcar como incorrecta automáticamente
    const isTimedOut = timedOut === true;
    const isCorrect = !isTimedOut && (question.correctAnswer === answer);
    
    // Calcular puntos basados en dificultad
    let pointsEarned;
    switch(question.difficulty) {
      case 'easy':
        pointsEarned = isCorrect ? 1 : -1;
        break;
      case 'medium':
        pointsEarned = isCorrect ? 2 : -1;
        break;
      case 'hard':
        pointsEarned = isCorrect ? 3 : -2;
        break;
      default:
        pointsEarned = isCorrect ? 1 : -1;
    }

    // Actualizar puntos del usuario
    user.points += pointsEarned;
    user.answeredQuestions.push({
      questionId: question._id,
      answer: isTimedOut ? 'TIMEOUT' : answer,
      isCorrect,
      pointsEarned
    });

    // Marcar la pregunta como respondida
    user.currentQuizSession.questions[questionIndex].answered = true;
    user.currentQuizSession.questionsAnswered += 1;

    // Si todas las preguntas fueron respondidas, completar la sesión
    if (user.currentQuizSession.questionsAnswered >= 4) {
      user.lastQuizCompleted = new Date();
      user.currentQuizSession = undefined;
    }

    await user.save();

    // Guardar registro de puntuación
    const score = new Score({
      userId,
      questionId,
      isCorrect,
      pointsEarned
    });

    await score.save();

    res.json({
      message: isTimedOut 
        ? '⏰ Tiempo agotado' 
        : (isCorrect ? '✅ ¡Respuesta correcta!' : '❌ Respuesta incorrecta'),
      isCorrect,
      pointsEarned,
      newTotalPoints: user.points,
      correctAnswer: question.correctAnswer,
      questionsAnswered: user.currentQuizSession?.questionsAnswered || 4,
      sessionCompleted: !user.currentQuizSession
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener ranking
exports.getRanking = async (req, res) => {
  try {
    // Excluir usuarios con role 'admin' del ranking
    const ranking = await User.find({ role: { $ne: 'admin' } })
      .select('-password')
      .sort({ points: -1 })
      .limit(100);

    const rankingWithPosition = ranking.map((user, index) => ({
      position: index + 1,
      username: user.username,
      points: user.points,
      email: user.email
    }));

    res.json({ ranking: rankingWithPosition });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener ranking del usuario
exports.getUserRank = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Contar solo usuarios no-admin con más puntos
    const usersAbove = await User.countDocuments({ 
      points: { $gt: user.points },
      role: { $ne: 'admin' }
    });
    const userRank = usersAbove + 1;

    res.json({
      rank: userRank,
      points: user.points,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener estadísticas del usuario
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const correctAnswers = user.answeredQuestions.filter(q => q.isCorrect).length;
    const totalAnswers = user.answeredQuestions.length;
    const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers * 100).toFixed(2) : 0;

    res.json({
      stats: {
        totalPoints: user.points,
        totalAnswered: totalAnswers,
        correctAnswers,
        accuracy: parseFloat(accuracy),
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
