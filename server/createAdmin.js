const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friends-trivia');
    console.log('✅ Conectado a MongoDB');

    // Verificar si el admin ya existe
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('⚠️ El usuario admin ya existe');
      process.exit(0);
    }

    // Crear el usuario admin
    const hashedPassword = await bcryptjs.hash('Admin123!', 10);
    
    const admin = await User.create({
      username: 'admin',
      email: 'admin@friendstrivia.com',
      password: hashedPassword,
      role: 'admin',
      points: 0
    });

    console.log('✅ Usuario admin creado exitosamente');
    console.log('📌 Credenciales:');
    console.log('   Usuario: admin');
    console.log('   Email: admin@friendstrivia.com');
    console.log('   Contraseña: Admin123!');
    console.log('\n⚠️  POR FAVOR CAMBIA LA CONTRASEÑA EN PRODUCCIÓN');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear admin:', error);
    process.exit(1);
  }
};

createAdmin();
