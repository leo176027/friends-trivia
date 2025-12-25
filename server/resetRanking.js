// Script para resetear el ranking completo
// Resetea los puntos de todos los usuarios a 0 y elimina el historial de scores

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Score = require('./models/Score');

const resetRanking = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Eliminar todos los registros de scores
    const scoresDeleted = await Score.deleteMany({});
    console.log(`🗑️  ${scoresDeleted.deletedCount} registros de scores eliminados`);

    // Resetear puntos de todos los usuarios a 0
    const usersUpdated = await User.updateMany(
      {},
      { $set: { points: 0 } }
    );
    console.log(`🔄 ${usersUpdated.modifiedCount} usuarios reseteados a 0 puntos`);

    console.log('\n✅ Ranking completamente reseteado');
    console.log('💡 Todos los usuarios ahora tienen 0 puntos');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  resetRanking();
}

module.exports = resetRanking;
