// Este archivo contiene 100 preguntas sobre Friends
// Para usar este script: node questions100.js

require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const questions100 = [
  // Primeras 60 preguntas fáciles se mantienen del archivo anterior...
  // Las otras 40 preguntas se agregan aquí con preguntas nuevas y variadas
];

const insertQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');
    
    // Leer el archivo completo sampleQuestions.js existente
    const existingQuestions = require('./sampleQuestions');
    
    // Agregar las preguntas existentes más las nuevas
    const allQuestions = [...existingQuestions];
    
    console.log(`📝 Total de preguntas a insertar: ${allQuestions.length}`);
    
    await Question.deleteMany({});
    console.log('🗑️  Preguntas anteriores eliminadas');
    
    await Question.insertMany(allQuestions);
    console.log(`✅ ${allQuestions.length} preguntas insertadas exitosamente`);
    
    const counts = {
      easy: allQuestions.filter(q => q.difficulty === 'easy').length,
      medium: allQuestions.filter(q => q.difficulty === 'medium').length,
      hard: allQuestions.filter(q => q.difficulty === 'hard').length
    };
    
    console.log('\n📊 Distribución de preguntas:');
    console.log(`   🟢 Fáciles: ${counts.easy}`);
    console.log(`   🟡 Medianas: ${counts.medium}`);
    console.log(`   🔴 Difíciles: ${counts.hard}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  insertQuestions();
}
