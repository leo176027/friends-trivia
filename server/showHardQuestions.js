require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const showHardQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const hardQuestions = await Question.find({ difficulty: 'hard' });
    
    console.log('=== PREGUNTAS DIFÍCILES ===\n');
    
    hardQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ${q.question.es}`);
      console.log(`   EN: ${q.question.en}`);
      console.log(`   Respuesta correcta: ${q.correctAnswer.es} / ${q.correctAnswer.en}`);
      console.log(`   Opciones:`);
      q.options.forEach(opt => {
        console.log(`      - ${opt.text.es}`);
      });
      console.log('');
    });
    
    console.log(`\nTotal: ${hardQuestions.length} preguntas difíciles`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

showHardQuestions();
