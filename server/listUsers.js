require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    const users = await User.find({}).select('username email isEmailVerified createdAt');
    console.log(`📋 Total de usuarios: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. Usuario: ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Verificado: ${user.isEmailVerified ? '✅' : '❌'}`);
      console.log(`   Creado: ${user.createdAt.toLocaleString()}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

listUsers();
