// Script para verificar el email de un usuario específico
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const verifyUserEmail = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Obtener el nombre de usuario desde los argumentos de línea de comandos
    const username = process.argv[2];

    if (!username) {
      console.log('❌ Debes proporcionar un nombre de usuario');
      console.log('Uso: node verifyUserEmail.js <username>');
      process.exit(1);
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      console.log(`❌ Usuario "${username}" no encontrado`);
      process.exit(1);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    console.log('\n✅ Email del usuario verificado');
    console.log('═══════════════════════════════════════');
    console.log(`👤 Usuario: ${user.username}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`✅ Email verificado: Sí`);
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

verifyUserEmail();
