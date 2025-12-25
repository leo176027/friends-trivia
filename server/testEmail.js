// Script de prueba para verificar la configuración de email
// Ejecuta: node testEmail.js

require('dotenv').config();
const { sendVerificationEmail } = require('./config/email');

const testEmail = async () => {
  console.log('🧪 Probando configuración de email...\n');
  
  // Verificar variables de entorno
  console.log('📋 Configuración:');
  console.log(`   EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'No configurado'}`);
  console.log(`   EMAIL_USER: ${process.env.EMAIL_USER || 'No configurado'}`);
  console.log(`   EMAIL_PASSWORD: ${process.env.EMAIL_PASSWORD ? '✓ Configurado' : '✗ No configurado'}`);
  console.log(`   CLIENT_URL: ${process.env.CLIENT_URL || 'No configurado'}\n`);

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Error: EMAIL_USER y EMAIL_PASSWORD deben estar configurados en .env');
    process.exit(1);
  }

  // Email de prueba
  const testEmailAddress = process.env.EMAIL_USER; // Enviar a ti mismo
  const testUsername = 'Usuario de Prueba';
  const testToken = 'test-token-123456789';

  console.log(`📧 Enviando email de prueba a: ${testEmailAddress}\n`);

  try {
    const result = await sendVerificationEmail(testEmailAddress, testUsername, testToken);
    
    if (result.success) {
      console.log('✅ ¡Email enviado exitosamente!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log('\n📬 Revisa tu bandeja de entrada (y spam) para verificar que llegó el email.');
    } else {
      console.error('❌ Error al enviar email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  }
};

testEmail();
