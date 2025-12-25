require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const deleteUsersByName = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar usuarios que contengan "leonardo" en el nombre
    const users = await User.find({ 
      username: { $regex: /leonardo/i }
    });
    console.log(`\n📋 Usuarios encontrados: ${users.length}`);
    
    if (users.length > 0) {
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.email})`);
      });
      
      // Eliminar los usuarios
      const result = await User.deleteMany({ 
        username: { $regex: /leonardo/i }
      });
      console.log(`\n🗑️  Usuarios eliminados: ${result.deletedCount}`);
    } else {
      console.log('   No se encontraron usuarios con el nombre "leonardo"');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

deleteUsersByName();
