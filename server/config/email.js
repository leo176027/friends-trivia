const nodemailer = require('nodemailer');

// Configuración del transporter de nodemailer
const createTransporter = () => {
  // Validar que las variables de entorno estén configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('⚠️ EMAIL_USER o EMAIL_PASSWORD no están configurados');
    throw new Error('Configuración de email incompleta');
  }
  
  console.log('📧 Creando transporter con:', {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_USER,
    passwordConfigured: !!process.env.EMAIL_PASSWORD
  });
  
  // Usa variables de entorno para configuración
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  // Configuración alternativa con SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Función para enviar email de verificación
const sendVerificationEmail = async (email, username, verificationToken) => {
  try {
    console.log('📧 Intentando enviar email de verificación a:', email);
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;
    console.log('🔗 URL de verificación:', verificationUrl);
    
    const mailOptions = {
      from: `"Friends Trivia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verifica tu email - Friends Trivia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A90E2;">¡Bienvenido a Friends Trivia, ${username}!</h2>
          <p>Gracias por registrarte. Para completar tu registro, por favor verifica tu dirección de email haciendo clic en el siguiente enlace:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #4A90E2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Verificar Email
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">O copia y pega este enlace en tu navegador:</p>
          <p style="color: #4A90E2; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">Este enlace expirará en 24 horas.</p>
          <p style="color: #999; font-size: 12px;">Si no solicitaste este registro, puedes ignorar este email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de verificación enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar email de verificación:', error.message);
    console.error('Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

// Función para enviar email de bienvenida después de la verificación
const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Friends Trivia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '¡Email verificado! - Friends Trivia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A90E2;">¡Email verificado exitosamente, ${username}!</h2>
          <p>Tu cuenta ha sido verificada. Ahora puedes disfrutar de todas las funcionalidades de Friends Trivia.</p>
          <p>¿Qué puedes hacer ahora?</p>
          <ul>
            <li>Responder preguntas diarias</li>
            <li>Ganar puntos y subir en el ranking</li>
            <li>Competir con otros fans de Friends</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" 
               style="background-color: #4A90E2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Ir a Friends Trivia
            </a>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">¡Gracias por unirte a nuestra comunidad!</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de bienvenida enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error al enviar email de bienvenida:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail
};
