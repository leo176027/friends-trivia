require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Score = require('./models/Score');

const resetAndClean = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Obtener todos los usuarios
    const allUsers = await User.find({});
    console.log(`📊 Total de usuarios actuales: ${allUsers.length}\n`);

    // Mostrar usuarios actuales
    console.log('Usuarios actuales:');
    allUsers.forEach(user => {
      console.log(`  - ${user.username} (${user.email}) - Role: ${user.role} - Puntos: ${user.points}`);
    });

    console.log('\n⚠️  Procediendo a eliminar usuarios no-admin...\n');

    // Eliminar todos los usuarios que NO sean admin
    const deleteResult = await User.deleteMany({ role: { $ne: 'admin' } });
    console.log(`✅ Usuarios eliminados: ${deleteResult.deletedCount}`);

    // Reiniciar puntos del admin a 0
    const adminUpdate = await User.updateMany(
      { role: 'admin' },
      { 
        $set: { 
          points: 0,
          answeredQuestions: [],
          currentQuizSession: undefined,
          lastQuizCompleted: null
        }
      }
    );
    console.log(`✅ Puntos de admin reiniciados: ${adminUpdate.modifiedCount}`);

    // Limpiar tabla de scores
    const scoresDeleted = await Score.deleteMany({});
    console.log(`✅ Registros de scores eliminados: ${scoresDeleted.deletedCount}`);

    // Mostrar usuarios finales
    const remainingUsers = await User.find({});
    console.log(`\n📊 Usuarios restantes: ${remainingUsers.length}\n`);
    remainingUsers.forEach(user => {
      console.log(`  ✅ ${user.username} (${user.email}) - Role: ${user.role} - Puntos: ${user.points}`);
    });

    console.log('\n✅ Proceso completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

resetAndClean();
