// Script para resetear las respuestas de un usuario específico
// Para usar: node resetUserAnswers.js [email]

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const resetUserAnswers = async (email) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    if (!email) {
      console.log('❌ Por favor proporciona un email');
      console.log('Uso: node resetUserAnswers.js [email]');
      process.exit(1);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`❌ Usuario con email "${email}" no encontrado`);
      process.exit(1);
    }

    const answeredCount = user.answeredQuestions?.length || 0;

    // Resetear las respuestas del usuario
    user.answeredQuestions = [];
    user.currentQuizSession = undefined;
    user.lastQuizCompleted = null;
    await user.save();

    console.log('\n✅ Respuestas del usuario reseteadas');
    console.log('═══════════════════════════════════════');
    console.log(`👤 Usuario: ${user.username}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🗑️  Preguntas eliminadas: ${answeredCount}`);
    console.log(`🏆 Puntos actuales: ${user.points} (sin modificar)`);
    console.log(`\n💡 El usuario ahora puede responder todas las preguntas nuevamente`);
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const email = process.argv[2];
if (require.main === module) {
  resetUserAnswers(email);
}

module.exports = resetUserAnswers;
