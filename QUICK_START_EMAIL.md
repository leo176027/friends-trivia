# ⚡ Guía Rápida: Verificación de Email

## 🎯 Resumen
Sistema de verificación de email implementado. Los usuarios nuevos deben verificar su email antes de iniciar sesión.

## 🚀 Pasos de Configuración (5 minutos)

### 1. Variables de Entorno
Agrega al archivo `server/.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicación
CLIENT_URL=http://localhost:3000
```

### 2. Contraseña de Aplicación de Gmail
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. **Seguridad** → **Verificación en 2 pasos** (actívala si no está)
3. **Contraseñas de aplicaciones**
4. Selecciona **Correo** y **Otro dispositivo**
5. Copia la contraseña generada (16 caracteres)
6. Pégala en `EMAIL_PASSWORD`

### 3. Migrar Usuarios Existentes (Opcional)
Si ya tienes usuarios, márcalos como verificados:
```bash
cd server
node migrateUsers.js
```

### 4. Reiniciar Servidor
```bash
cd server
npm start
```

## ✅ Verificar que Funciona

### Test de Registro
1. Abre `http://localhost:3000/register`
2. Regístrate con un email real
3. Deberías ver: "Por favor verifica tu email"
4. Revisa tu bandeja de entrada
5. Haz clic en el enlace de verificación
6. Deberías ser redirigido al quiz

### Test de Login No Verificado
1. Intenta iniciar sesión sin verificar
2. Deberías ver: "Por favor verifica tu email"
3. Puedes hacer clic en "Reenviar Email"

## 📋 Checklist Rápido

- [ ] Agregué `EMAIL_USER` y `EMAIL_PASSWORD` al `.env`
- [ ] Generé contraseña de aplicación de Gmail
- [ ] Agregué `CLIENT_URL` al `.env`
- [ ] Ejecuté `npm install nodemailer` en server/
- [ ] (Opcional) Ejecuté `node migrateUsers.js`
- [ ] Reinicié el servidor
- [ ] Probé registro + verificación

## 🔧 Troubleshooting Rápido

**"Error al enviar email"**
- ✓ Verifica que usas contraseña de aplicación, NO tu contraseña normal
- ✓ Verifica que la verificación en 2 pasos esté activada

**"Token inválido"**
- ✓ El token expira en 24 horas
- ✓ Solicita uno nuevo desde el login

**Email no llega**
- ✓ Revisa carpeta de spam
- ✓ Verifica que `EMAIL_USER` sea correcto

## 📁 Archivos Modificados

### Backend
- ✅ `server/models/User.js` - Campos de verificación
- ✅ `server/config/email.js` - Servicio de email (NUEVO)
- ✅ `server/controllers/authController.js` - Lógica de verificación
- ✅ `server/routes/auth.js` - Rutas nuevas
- ✅ `server/package.json` - Dependencia nodemailer

### Frontend
- ✅ `client/src/components/Register.js` - Mensaje de verificación
- ✅ `client/src/components/Login.js` - Detección de no verificado
- ✅ `client/src/components/VerifyEmail.js` - Página de verificación (NUEVO)
- ✅ `client/src/App.js` - Ruta de verificación
- ✅ `client/src/context/AuthContext.js` - Manejo de respuestas
- ✅ `client/src/styles/Auth.css` - Estilos

### Documentación
- ✅ `EMAIL_VERIFICATION_SETUP.md` - Guía completa
- ✅ `QUICK_START_EMAIL.md` - Esta guía (NUEVO)
- ✅ `server/migrateUsers.js` - Script de migración (NUEVO)
- ✅ `server/.env.example` - Variables actualizadas

## 📧 Ejemplo de Email

Los usuarios recibirán emails así:

**Email de Verificación:**
```
¡Bienvenido a Friends Trivia, [usuario]!

Gracias por registrarte. Para completar tu registro, 
por favor verifica tu dirección de email.

[Botón: Verificar Email]

Este enlace expirará en 24 horas.
```

**Email de Bienvenida (después de verificar):**
```
¡Email verificado exitosamente, [usuario]!

Tu cuenta ha sido verificada. Ahora puedes disfrutar 
de todas las funcionalidades de Friends Trivia.

[Botón: Ir a Friends Trivia]
```

## 🎨 Personalización

Para personalizar los emails, edita:
```javascript
// server/config/email.js
const mailOptions = {
  subject: 'Tu asunto aquí',
  html: `<tu-html-aquí>`
};
```

## 📚 Documentación Completa
Ver: [EMAIL_VERIFICATION_SETUP.md](EMAIL_VERIFICATION_SETUP.md)

## ✨ ¡Listo!
Tu sistema ahora tiene verificación de email funcionando. Los nuevos usuarios necesitarán confirmar su email antes de poder iniciar sesión.
