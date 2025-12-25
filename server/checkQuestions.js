require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const checkQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const easyCount = await Question.countDocuments({ difficulty: 'easy' });
    const mediumCount = await Question.countDocuments({ difficulty: 'medium' });
    const hardCount = await Question.countDocuments({ difficulty: 'hard' });
    const totalCount = await Question.countDocuments();

    console.log('📊 Estadísticas de preguntas:');
    console.log(`   Fáciles: ${easyCount} (necesitas mínimo 2)`);
    console.log(`   Medianas: ${mediumCount} (necesitas mínimo 1)`);
    console.log(`   Difíciles: ${hardCount} (necesitas mínimo 1)`);
    console.log(`   Total: ${totalCount}\n`);

    if (easyCount < 2 || mediumCount < 1 || hardCount < 1) {
      console.log('❌ No hay suficientes preguntas en la base de datos');
      console.log('   Ejecuta: node sampleQuestions.js para insertar preguntas de ejemplo\n');
    } else {
      console.log('✅ Hay suficientes preguntas para jugar\n');
      
      // Mostrar algunas preguntas de ejemplo
      const questions = await Question.find().limit(5);
      console.log('Ejemplos de preguntas:');
      questions.forEach((q, i) => {
        console.log(`${i + 1}. [${q.difficulty}] ${q.question.substring(0, 60)}...`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkQuestions();
