// Script para migrar usuarios existentes y marcarlos como verificados
// Ejecuta: node migrateUsers.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const migrateUsers = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friends-trivia');
    console.log('✅ Conectado a MongoDB');

    // Contar usuarios sin verificar
    const unverifiedCount = await User.countDocuments({ 
      isEmailVerified: { $ne: true } 
    });
    console.log(`📊 Usuarios sin verificar: ${unverifiedCount}`);

    if (unverifiedCount === 0) {
      console.log('✅ Todos los usuarios ya están verificados');
      process.exit(0);
    }

    // Preguntar confirmación
    console.log('\n⚠️  Este script marcará todos los usuarios existentes como verificados.');
    console.log('¿Deseas continuar? (Ctrl+C para cancelar)\n');

    // Esperar 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Actualizar usuarios
    const result = await User.updateMany(
      { isEmailVerified: { $ne: true } },
      { 
        $set: { isEmailVerified: true },
        $unset: { emailVerificationToken: '', emailVerificationExpires: '' }
      }
    );

    console.log(`✅ Usuarios actualizados: ${result.modifiedCount}`);
    console.log('✅ Migración completada exitosamente');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en la migración:', error);
    process.exit(1);
  }
};

migrateUsers();
