// Script para verificar cuántas preguntas ha respondido un usuario
// Para usar: node checkUserProgress.js [username]

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Question = require('./models/Question');

const checkUserProgress = async (username) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    if (!username) {
      console.log('❌ Por favor proporciona un nombre de usuario');
      console.log('Uso: node checkUserProgress.js [username]');
      process.exit(1);
    }

    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      console.log(`❌ Usuario "${username}" no encontrado`);
      process.exit(1);
    }

    const totalQuestions = await Question.countDocuments();
    const answeredCount = user.answeredQuestions?.length || 0;
    const remainingCount = totalQuestions - answeredCount;

    console.log('\n📊 Progreso del Usuario');
    console.log('═══════════════════════════════════════');
    console.log(`👤 Usuario: ${user.username}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🏆 Puntos: ${user.points}`);
    console.log(`\n📝 Preguntas respondidas: ${answeredCount} de ${totalQuestions}`);
    console.log(`📋 Preguntas disponibles: ${remainingCount}`);
    console.log(`📈 Porcentaje completado: ${((answeredCount / totalQuestions) * 100).toFixed(1)}%`);

    if (user.lastQuizCompleted) {
      const lastCompleted = new Date(user.lastQuizCompleted);
      const now = new Date();
      const timeSince = now - lastCompleted;
      const hoursSince = Math.floor(timeSince / (60 * 60 * 1000));
      const fortyEightHours = 48 * 60 * 60 * 1000;
      const canPlay = timeSince >= fortyEightHours;

      console.log(`\n⏰ Último quiz completado: ${lastCompleted.toLocaleString('es-ES')}`);
      console.log(`⌛ Tiempo transcurrido: ${hoursSince} horas`);
      console.log(`${canPlay ? '✅' : '❌'} Puede jugar ahora: ${canPlay ? 'Sí' : 'No (debe esperar 48h)'}`);
    } else {
      console.log('\n✅ Puede jugar ahora (nunca ha completado un quiz)');
    }

    if (user.currentQuizSession && user.currentQuizSession.questions?.length > 0) {
      console.log(`\n🎮 Sesión activa:`);
      console.log(`   Preguntas en sesión: ${user.currentQuizSession.questions.length}`);
      console.log(`   Preguntas respondidas: ${user.currentQuizSession.questionsAnswered || 0}`);
    }

    // Mostrar distribución de respuestas
    if (answeredCount > 0) {
      const correctAnswers = user.answeredQuestions.filter(a => a.isCorrect).length;
      const incorrectAnswers = answeredCount - correctAnswers;
      const accuracy = ((correctAnswers / answeredCount) * 100).toFixed(1);

      console.log(`\n📊 Estadísticas de respuestas:`);
      console.log(`   ✅ Correctas: ${correctAnswers}`);
      console.log(`   ❌ Incorrectas: ${incorrectAnswers}`);
      console.log(`   🎯 Precisión: ${accuracy}%`);
    }

    console.log('\n═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const username = process.argv[2];
if (require.main === module) {
  checkUserProgress(username);
}

module.exports = checkUserProgress;
