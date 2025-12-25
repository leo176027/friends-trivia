# Friends Trivia

Una aplicación web responsive tipo cuestionario donde los usuarios pueden responder preguntas diarias sobre la serie "Friends" y competir en un ranking global.

## Características

- **Autenticación de Usuarios**: Registro y login seguro con verificación de email
- **Verificación de Email**: Confirmación obligatoria de email antes de poder iniciar sesión
- **Quiz de 4 Preguntas**: Responde 4 preguntas cada 48 horas (2 fáciles, 1 mediana, 1 difícil)
- **Timer de 30 Segundos**: Cada pregunta debe responderse en 30 segundos
- **Sistema de Puntuación**: Gana puntos por respuestas correctas según dificultad, pierde por incorrectas
- **Ranking Global**: Compite con otros jugadores
- **Perfil de Usuario**: Estadísticas personales y posición en el ranking
- **Diseño Responsive**: Funciona en móviles, tablets y escritorio

## Estructura del Proyecto

```
Friends/
├── server/          # Backend Node.js + Express
│   ├── models/      # Esquemas de base de datos
│   ├── controllers/ # Lógica de negocio
│   ├── routes/      # Rutas de la API
│   ├── middleware/  # Middleware personalizado
│   ├── config/      # Configuración
│   └── server.js    # Servidor principal
└── client/          # Frontend React
    ├── public/      # Archivos estáticos
    ├── src/
    │   ├── components/ # Componentes React
    │   ├── pages/      # Páginas
    │   ├── services/   # Servicios de API
    │   ├── context/    # Context API
    │   ├── styles/     # CSS
    │   └── App.js      # Componente principal
```

## Instalación

### Backend

1. Navega a la carpeta servidor:
```bash
cd server
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/friends-trivia
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development

# Configuración de Email (Requerido para verificación)
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_de_aplicación
CLIENT_URL=http://localhost:3000
```

> **📧 Configuración de Email**: Ver [QUICK_START_EMAIL.md](QUICK_START_EMAIL.md) para instrucciones detalladas de configuración de verificación de email.

5. Inicia el servidor:
```bash
npm run dev
```

### Frontend

1. Navega a la carpeta cliente:
```bash
cd client
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Inicia la aplicación:
```bash
npm start
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario (envía email de verificación)
- `POST /api/auth/login` - Iniciar sesión (requiere email verificado)
- `GET /api/auth/profile` - Obtener perfil (protegido)
- `GET /api/auth/verify-email/:token` - Verificar email con token
- `POST /api/auth/resend-verification` - Reenviar email de verificación

### Preguntas
- `GET /api/questions/daily` - Obtener pregunta del día
- `POST /api/questions` - Crear pregunta (admin)
- `GET /api/questions` - Obtener todas las preguntas

### Puntuación
- `POST /api/scores/answer` - Responder pregunta (protegido)
- `GET /api/scores/ranking` - Obtener ranking global
- `GET /api/scores/user-rank` - Obtener posición del usuario (protegido)
- `GET /api/scores/stats` - Obtener estadísticas del usuario (protegido)

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas

### Frontend
- **React** - Librería UI
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS3** - Estilos responsive

## Scripts Disponibles

### Server
```bash
npm start      # Inicia el servidor en producción
npm run dev    # Inicia con nodemon para desarrollo
npm test       # Ejecuta tests
```

### Client
```bash
npm start      # Inicia la aplicación en desarrollo
npm run build  # Construye para producción
npm test       # Ejecuta tests
```

## Próximos Pasos

1. ~~Conectar a una base de datos MongoDB real~~ ✅ Completado
2. **Desplegar la aplicación en producción** - Lee [DEPLOYMENT.md](DEPLOYMENT.md)
3. Agregar más funcionalidades (logros, badges, etc.)
4. Crear una app móvil nativa con React Native
5. Implementar notificaciones push para preguntas diarias

---

## 🌐 Deployment Online (GRATIS)

### ⚡ Despliegue Rápido

**Ejecuta el script automático:**
```bash
# Windows
deploy.bat

# Mac/Linux  
chmod +x deploy.sh
./deploy.sh
```

### 📖 Guía Completa de Deployment

Lee **[DEPLOYMENT.md](DEPLOYMENT.md)** para instrucciones paso a paso.

### 🎯 Plataformas Recomendadas (100% Gratis)

| Componente | Plataforma | Plan Gratis |
|------------|------------|-------------|
| 🔧 Backend | [Render.com](https://render.com) | 750 hrs/mes |
| 🎨 Frontend | [Vercel](https://vercel.com) | Ilimitado |
| 💾 Database | MongoDB Atlas | 512MB |

### 🚀 En 3 Pasos:

1. **Sube a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Friends Trivia App"
   git remote add origin https://github.com/TU-USUARIO/friends-trivia.git
   git push -u origin main
   ```

2. **Deploy Backend** en Render.com:
   - Conecta GitHub → Selecciona carpeta `server`
   - Agrega variables de entorno (ver `.env.example`)
   - Deploy!

3. **Deploy Frontend** en Vercel:
   - Conecta GitHub → Selecciona carpeta `client`
   - Agrega `REACT_APP_API_URL=https://tu-backend.onrender.com`
   - Deploy!

**✅ Costo total: $0/mes**

---

## 📚 Documentación

- 📘 [DEPLOYMENT.md](DEPLOYMENT.md) - Guía completa de deployment
- 📗 [.env.example](.env.example) - Variables de entorno
- 📙 [ARQUITECTURA.txt](ARQUITECTURA.txt) - Arquitectura técnica

## 🛠️ Scripts Útiles

```bash
cd server

# Gestión de datos
node bilingualQuestions.js    # Insertar 106 preguntas bilingües
node createAdmin.js           # Crear administrador
node listUsers.js            # Listar usuarios
node deleteUser.js email     # Eliminar usuario

# Utilidades
node checkUserProgress.js usuario  # Ver progreso
node resetRanking.js              # Resetear ranking
node verifyAdminEmail.js email    # Verificar admin
```

## 🔒 Seguridad

✅ Contraseñas hasheadas (bcrypt)
✅ JWT con expiración (12h)
✅ Variables de entorno
✅ CORS configurado
✅ Validación de inputs
✅ Protection contra injection

## 🌍 Características

- **106 preguntas** sobre Friends
- **Bilingüe**: Español e Inglés
- **Responsive**: Móvil, tablet, desktop
- **Timer**: 30 segundos por pregunta
- **Cooldown**: 48 horas entre quizzes
- **No repetibles**: Nunca la misma pregunta

---

## Licencia

Este proyecto está bajo la licencia ISC.
