# Configuración de Validación de Email

## Descripción
El sistema ahora incluye verificación de email obligatoria para todos los usuarios nuevos. Los usuarios deben confirmar su dirección de email antes de poder iniciar sesión.

## Características Implementadas

### Backend
1. **Modelo de Usuario Actualizado** ([server/models/User.js](server/models/User.js))
   - `isEmailVerified`: Indica si el email está verificado
   - `emailVerificationToken`: Token único para verificación
   - `emailVerificationExpires`: Fecha de expiración del token (24 horas)

2. **Servicio de Email** ([server/config/email.js](server/config/email.js))
   - Envío de email de verificación con token único
   - Envío de email de bienvenida post-verificación
   - Soporte para Gmail y SMTP personalizado

3. **Controlador de Autenticación** ([server/controllers/authController.js](server/controllers/authController.js))
   - `register`: Genera token y envía email de verificación
   - `login`: Valida que el email esté verificado
   - `verifyEmail`: Verifica el token y activa la cuenta
   - `resendVerificationEmail`: Reenvía el email de verificación

4. **Rutas Nuevas** ([server/routes/auth.js](server/routes/auth.js))
   - `GET /auth/verify-email/:token`: Verificar email con token
   - `POST /auth/resend-verification`: Reenviar email de verificación

### Frontend
1. **Componente Register** ([client/src/components/Register.js](client/src/components/Register.js))
   - Muestra mensaje después del registro indicando que debe verificar el email

2. **Componente VerifyEmail** ([client/src/components/VerifyEmail.js](client/src/components/VerifyEmail.js))
   - Página que procesa el token de verificación
   - Login automático después de verificación exitosa

3. **Componente Login** ([client/src/components/Login.js](client/src/components/Login.js))
   - Detecta cuando un usuario no ha verificado su email
   - Permite reenviar el email de verificación

## Configuración

### 1. Instalar Dependencias
```bash
cd server
npm install nodemailer
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `server/` con las siguientes variables:

#### Opción A: Gmail (Recomendado para desarrollo)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicación
CLIENT_URL=http://localhost:3000
```

**Nota importante para Gmail:**
- No uses tu contraseña normal de Gmail
- Debes generar una "Contraseña de aplicación":
  1. Ve a tu cuenta de Google
  2. Seguridad → Verificación en 2 pasos (debe estar activada)
  3. Contraseñas de aplicaciones
  4. Genera una nueva contraseña para "Correo"
  5. Usa esa contraseña en `EMAIL_PASSWORD`

#### Opción B: SMTP Personalizado
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
EMAIL_USER=tu_email@example.com
EMAIL_PASSWORD=tu_contraseña
CLIENT_URL=http://localhost:3000
```

### 3. URL del Cliente
La variable `CLIENT_URL` debe apuntar a tu aplicación frontend:
- Desarrollo: `http://localhost:3000`
- Producción: `https://tudominio.com`

## Flujo de Usuario

### Registro
1. Usuario completa el formulario de registro
2. Sistema crea la cuenta con `isEmailVerified: false`
3. Se genera un token único y se envía email
4. Usuario ve mensaje: "Por favor verifica tu email"

### Verificación
1. Usuario hace clic en el enlace del email
2. Es redirigido a: `/verify-email/:token`
3. Sistema valida el token y marca `isEmailVerified: true`
4. Usuario es logueado automáticamente
5. Recibe email de bienvenida

### Login con Email No Verificado
1. Usuario intenta iniciar sesión
2. Sistema detecta `isEmailVerified: false`
3. Muestra mensaje de error
4. Ofrece botón para reenviar email de verificación

## Migrando Usuarios Existentes

Los usuarios existentes en la base de datos tendrán `isEmailVerified: false` por defecto. Tienes dos opciones:

### Opción 1: Marcar todos como verificados (Recomendado)
```javascript
// Ejecuta este script en MongoDB o con mongoose
db.users.updateMany(
  { isEmailVerified: { $exists: false } },
  { $set: { isEmailVerified: true } }
);
```

### Opción 2: Requerir verificación a todos
Los usuarios existentes necesitarán verificar su email al intentar iniciar sesión.

## Personalización de Emails

Los templates de email están en [server/config/email.js](server/config/email.js):

- `sendVerificationEmail`: Email inicial con link de verificación
- `sendWelcomeEmail`: Email de bienvenida después de verificación

Puedes personalizar el HTML de estos emails para que coincidan con tu marca.

## Seguridad

### Token de Verificación
- Se genera con `crypto.randomBytes(32)` para máxima seguridad
- Expira en 24 horas
- Se elimina después de la verificación

### Mejores Prácticas
- Los tokens de verificación no se exponen en logs
- Los emails fallidos no bloquean el registro
- Los usuarios pueden solicitar nuevos tokens ilimitadamente

## Troubleshooting

### "Error al enviar email de verificación"
- Verifica las credenciales en `.env`
- Para Gmail, asegúrate de usar una contraseña de aplicación
- Revisa que el servicio SMTP esté accesible

### "Token inválido o expirado"
- El token expira en 24 horas
- Usuario puede solicitar un nuevo email desde el login

### Emails no llegan
- Revisa la carpeta de spam
- Verifica que `EMAIL_USER` sea correcto
- Comprueba los logs del servidor para errores

### En producción
- Asegúrate de que `CLIENT_URL` apunte a tu dominio de producción
- Considera usar un servicio de email como SendGrid, AWS SES, etc.
- Configura SPF y DKIM para mejor deliverability

## Testing

### Desarrollo Local
1. Usa un servicio como [Mailtrap](https://mailtrap.io/) para capturar emails sin enviarlos realmente
2. O configura Gmail con una cuenta de prueba

### Endpoints de API
```bash
# Registro (envía email)
POST http://localhost:5000/api/auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

# Verificar email
GET http://localhost:5000/api/auth/verify-email/:token

# Reenviar verificación
POST http://localhost:5000/api/auth/resend-verification
{
  "email": "test@example.com"
}
```

## Próximos Pasos (Opcional)

- Implementar recuperación de contraseña por email
- Agregar cambio de email con re-verificación
- Implementar emails transaccionales (ej: nuevo récord en ranking)
- Agregar notificaciones de nuevas preguntas diarias
