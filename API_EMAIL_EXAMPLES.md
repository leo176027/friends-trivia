# Ejemplos de API - Verificación de Email

## Registro de Usuario

### Request
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "joey_tribbiani",
  "email": "joey@friends.com",
  "password": "howYouDoin123",
  "confirmPassword": "howYouDoin123"
}
```

### Response (201 Created)
```json
{
  "message": "Usuario registrado exitosamente. Por favor verifica tu email para activar tu cuenta.",
  "requiresEmailVerification": true,
  "email": "joey@friends.com"
}
```

## Verificación de Email

### Request
```http
GET http://localhost:5000/api/auth/verify-email/abc123def456ghi789jkl012mno345pq
```

### Response Exitosa (200 OK)
```json
{
  "message": "Email verificado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123def456789",
    "username": "joey_tribbiani",
    "email": "joey@friends.com",
    "points": 0,
    "role": "user"
  }
}
```

### Response Error - Token Inválido (400 Bad Request)
```json
{
  "message": "Token de verificación inválido o expirado"
}
```

## Login (Email No Verificado)

### Request
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "joey@friends.com",
  "password": "howYouDoin123"
}
```

### Response Error (403 Forbidden)
```json
{
  "message": "Por favor verifica tu email antes de iniciar sesión",
  "requiresEmailVerification": true,
  "email": "joey@friends.com"
}
```

## Login (Email Verificado)

### Request
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "joey@friends.com",
  "password": "howYouDoin123"
}
```

### Response Exitosa (200 OK)
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123def456789",
    "username": "joey_tribbiani",
    "email": "joey@friends.com",
    "points": 0,
    "role": "user"
  }
}
```

## Reenviar Email de Verificación

### Request
```http
POST http://localhost:5000/api/auth/resend-verification
Content-Type: application/json

{
  "email": "joey@friends.com"
}
```

### Response Exitosa (200 OK)
```json
{
  "message": "Email de verificación reenviado exitosamente",
  "email": "joey@friends.com"
}
```

### Response Error - Email Ya Verificado (400 Bad Request)
```json
{
  "message": "El email ya está verificado"
}
```

### Response Error - Usuario No Encontrado (404 Not Found)
```json
{
  "message": "Usuario no encontrado"
}
```

## Campos del Modelo User (con verificación)

```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hasheado, no se retorna),
  points: Number,
  role: String ("user" | "admin"),
  
  // Nuevos campos de verificación
  isEmailVerified: Boolean,
  emailVerificationToken: String (no se retorna),
  emailVerificationExpires: Date (no se retorna),
  
  dailyAnswered: Date,
  answeredQuestions: Array,
  createdAt: Date
}
```

## Flujo Completo

### 1. Registro
```
Cliente → POST /auth/register
         ↓
Servidor: Crea usuario (isEmailVerified: false)
         ↓
Servidor: Genera token único
         ↓
Servidor: Envía email con link
         ↓
Respuesta: requiresEmailVerification: true
```

### 2. Verificación
```
Usuario: Click en link del email
         ↓
Cliente → GET /auth/verify-email/:token
         ↓
Servidor: Valida token
         ↓
Servidor: Marca isEmailVerified: true
         ↓
Servidor: Envía email de bienvenida
         ↓
Respuesta: token JWT + user data
         ↓
Cliente: Auto-login
```

### 3. Login sin Verificación
```
Cliente → POST /auth/login
         ↓
Servidor: Encuentra usuario
         ↓
Servidor: Verifica isEmailVerified
         ↓
Si false → Error 403 + requiresEmailVerification
         ↓
Cliente: Muestra opción de reenviar email
```

### 4. Reenvío de Email
```
Cliente → POST /auth/resend-verification
         ↓
Servidor: Genera nuevo token
         ↓
Servidor: Envía nuevo email
         ↓
Respuesta: Confirmación de envío
```

## Códigos de Estado HTTP

- `200 OK` - Verificación exitosa, login exitoso, reenvío exitoso
- `201 Created` - Registro exitoso (requiere verificación)
- `400 Bad Request` - Credenciales incorrectas, token inválido, email ya verificado
- `403 Forbidden` - Email no verificado (bloqueo de login)
- `404 Not Found` - Usuario no encontrado
- `500 Internal Server Error` - Error del servidor

## Testing con cURL

### Registro
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "confirmPassword": "test123"
  }'
```

### Verificación (reemplaza TOKEN con el token real)
```bash
curl http://localhost:5000/api/auth/verify-email/TOKEN
```

### Reenvío
```bash
curl -X POST http://localhost:5000/api/auth/resend-verification \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Testing con VS Code REST Client

Si usas la extensión REST Client, añade esto a `API_EJEMPLOS.http`:

```http
### Registro con verificación de email
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123",
  "confirmPassword": "test123"
}

### Verificar email (reemplaza con token real)
GET http://localhost:5000/api/auth/verify-email/abc123def456

### Reenviar verificación
POST http://localhost:5000/api/auth/resend-verification
Content-Type: application/json

{
  "email": "test@example.com"
}

### Login (debería fallar si no está verificado)
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```
