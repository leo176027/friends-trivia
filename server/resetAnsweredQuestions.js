// Script para resetear las preguntas respondidas de todos los usuarios
// Usar con precaución: esto permitirá que los usuarios respondan de nuevo todas las preguntas
// Para usar: node resetAnsweredQuestions.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const resetAnsweredQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const result = await User.updateMany(
      {}, 
      { $set: { answeredQuestions: [] } }
    );

    console.log(`✅ Se resetearon las preguntas respondidas de ${result.modifiedCount} usuarios`);
    console.log('💡 Ahora todos los usuarios pueden responder todas las preguntas nuevamente');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  resetAnsweredQuestions();
}

module.exports = resetAnsweredQuestions;
