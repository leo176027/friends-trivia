require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const checkDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const allQuestions = await Question.find({});
    console.log(`📊 Total de preguntas en la base de datos: ${allQuestions.length}\n`);

    // Buscar duplicados por texto en español
    const questionsMap = new Map();
    const duplicates = [];

    allQuestions.forEach(q => {
      const questionText = q.question.es.toLowerCase().trim();
      
      if (questionsMap.has(questionText)) {
        duplicates.push({
          text: q.question.es,
          ids: [questionsMap.get(questionText), q._id],
          difficulty: q.difficulty
        });
      } else {
        questionsMap.set(questionText, q._id);
      }
    });

    if (duplicates.length === 0) {
      console.log('✅ No se encontraron preguntas duplicadas');
    } else {
      console.log(`⚠️  Se encontraron ${duplicates.length} preguntas duplicadas:\n`);
      duplicates.forEach((dup, index) => {
        console.log(`${index + 1}. "${dup.text}"`);
        console.log(`   Dificultad: ${dup.difficulty}`);
        console.log(`   IDs: ${dup.ids.join(', ')}`);
        console.log('');
      });
    }

    // Mostrar resumen por dificultad
    console.log('\n📊 Resumen por dificultad:');
    const easy = await Question.countDocuments({ difficulty: 'easy' });
    const medium = await Question.countDocuments({ difficulty: 'medium' });
    const hard = await Question.countDocuments({ difficulty: 'hard' });
    
    console.log(`   Fáciles: ${easy}`);
    console.log(`   Medias: ${medium}`);
    console.log(`   Difíciles: ${hard}`);
    console.log(`   Total: ${easy + medium + hard}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkDuplicates();
