const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail, sendWelcomeEmail } = require('../config/email');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Por favor completa todos los campos' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // Verificar si el usuario ya existe
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generar token de verificación
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Crear nuevo usuario
    user = new User({
      username,
      email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires
    });

    await user.save();

    // Enviar email de verificación de forma asíncrona (sin bloquear la respuesta)
    sendVerificationEmail(email, username, verificationToken)
      .then(emailResult => {
        if (!emailResult.success) {
          console.error('Error al enviar email, pero usuario creado:', emailResult.error);
        } else {
          console.log('Email de verificación enviado exitosamente a:', email);
        }
      })
      .catch(err => {
        console.error('Error al enviar email de verificación:', err);
      });

    // Responder inmediatamente sin esperar el email
    res.status(201).json({
      message: 'Usuario registrado exitosamente. Por favor verifica tu email para activar tu cuenta.',
      requiresEmailVerification: true,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor proporciona email y contraseña' });
    }

    // Buscar usuario
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar si el email está verificado
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: 'Por favor verifica tu email antes de iniciar sesión',
        requiresEmailVerification: true,
        email: user.email
      });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear JWT (12 horas)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
      expiresIn: '12h'
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener perfil del usuario
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Verificar email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log('🔍 Intentando verificar email con token:', token);

    // Buscar usuario con el token de verificación (sin usar select: false)
    const user = await User.findOne({
      emailVerificationToken: token
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      console.log('❌ Usuario no encontrado con este token');
      return res.status(400).json({ 
        message: 'Token de verificación inválido' 
      });
    }
    
    // Verificar si el token ha expirado
    if (user.emailVerificationExpires && user.emailVerificationExpires < Date.now()) {
      console.log('❌ Token expirado');
      return res.status(400).json({ 
        message: 'El token de verificación ha expirado. Por favor solicita uno nuevo.' 
      });
    }
    
    console.log('✅ Usuario encontrado:', user.email);

    console.log('✅ Usuario encontrado:', user.email);

    // Verificar el email
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    
    console.log('✅ Email verificado y usuario guardado');

    // Enviar email de bienvenida de forma asíncrona (sin bloquear la respuesta)
    sendWelcomeEmail(user.email, user.username)
      .then(() => console.log('Email de bienvenida enviado a:', user.email))
      .catch(err => console.error('Error al enviar email de bienvenida:', err));

    // Crear JWT para login automático (12 horas)
    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
      expiresIn: '12h'
    });
    
    console.log('✅ Token JWT generado, enviando respuesta');

    res.json({
      message: 'Email verificado exitosamente',
      token: authToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Error en verifyEmail:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Reenviar email de verificación
exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Por favor proporciona un email' });
    }

    // Buscar usuario
    const user = await User.findOne({ email }).select('+emailVerificationToken +emailVerificationExpires');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'El email ya está verificado' });
    }

    // Generar nuevo token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Enviar email
    const emailResult = await sendVerificationEmail(email, user.username, verificationToken);

    if (!emailResult.success) {
      return res.status(500).json({ 
        message: 'Error al enviar el email de verificación',
        error: emailResult.error 
      });
    }

    res.json({
      message: 'Email de verificación reenviado exitosamente',
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
