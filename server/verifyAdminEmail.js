// Script para verificar el email del usuario admin
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const verifyAdminEmail = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const admin = await User.findOne({ role: 'admin' });

    if (!admin) {
      console.log('❌ Usuario admin no encontrado');
      process.exit(1);
    }

    admin.isEmailVerified = true;
    admin.emailVerificationToken = undefined;
    admin.emailVerificationExpires = undefined;
    await admin.save();

    console.log('\n✅ Email del admin verificado');
    console.log('═══════════════════════════════════════');
    console.log(`👤 Usuario: ${admin.username}`);
    console.log(`📧 Email: ${admin.email}`);
    console.log(`✅ Email verificado: Sí`);
    console.log('═══════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

verifyAdminEmail();
