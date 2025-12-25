require('dotenv').config();
const mongoose = require('mongoose');

const dropIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('questions');
    
    // Eliminar todas las preguntas
    await collection.deleteMany({});
    console.log('🗑️  Todas las preguntas eliminadas');
    
    // Eliminar el índice problemático
    try {
      await collection.dropIndex('dailyDate_1');
      console.log('🗑️  Índice dailyDate eliminado');
    } catch (err) {
      console.log('ℹ️  El índice dailyDate no existe o ya fue eliminado');
    }
    
    console.log('\n✅ Ahora puedes ejecutar: node sampleQuestions.js');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

dropIndex();
