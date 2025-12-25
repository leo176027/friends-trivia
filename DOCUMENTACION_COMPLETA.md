# Guía Completa - Friends Trivia

Una aplicación de trivia sobre la serie "Friends" con sistema de login, preguntas diarias, puntuación y ranking global.

## 🚀 Inicio Rápido

### Windows
```bash
setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

## 📋 Requisitos

- **Node.js** >= 14.0
- **npm** >= 6.0
- **MongoDB** (local o MongoDB Atlas)

## 🔧 Instalación Manual

### 1. Clonar y Navegar
```bash
cd Friends
```

### 2. Backend
```bash
cd server
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
```

### 3. Frontend (en otra terminal)
```bash
cd client
npm install
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🗄️ Base de Datos

### Opción 1: MongoDB Local (Recomendado para desarrollo)
```bash
# Windows - Instalar MongoDB Community Edition
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Una vez instalado:
mongod
```

### Opción 2: MongoDB Atlas (Recomendado para producción)
1. Crea cuenta en https://www.mongodb.com/cloud/atlas
2. Obtén la URI de conexión
3. Actualiza en `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/friends-trivia
   ```

## 📱 Páginas Principales

| Página | Ruta | Descripción |
|--------|------|-------------|
| Inicio | `/` | Página de bienvenida |
| Login | `/login` | Iniciar sesión |
| Registro | `/register` | Crear nueva cuenta |
| Quiz | `/quiz` | Responder pregunta diaria |
| Ranking | `/ranking` | Ver clasificación global |
| Perfil | `/profile` | Ver estadísticas personales |
| Admin | `/admin` | Crear preguntas (protegido) |

## 🎯 Funcionalidades

### Sistema de Autenticación
- Registro con email y contraseña
- Login seguro con JWT
- Contraseñas hasheadas con bcryptjs
- Tokens con expiración de 30 días

### Preguntas Diarias
- Una pregunta nueva cada día
- Múltiples opciones de respuesta
- Dificultad configurable
- Puntos personalizables

### Sistema de Puntuación
```
Respuesta correcta:  +10 puntos (configurable)
Respuesta incorrecta: -5 puntos
```

### Ranking
- Clasificación automática por puntos
- Medallas para top 3 (🥇 🥈 🥉)
- Top 100 visible

### Estadísticas del Usuario
- Total de puntos
- Posición en ranking
- Preguntas respondidas
- Porcentaje de precisión
- Fecha de creación

## 📚 API REST

### Autenticación
```
POST   /api/auth/register    - Registrar usuario
POST   /api/auth/login       - Iniciar sesión
GET    /api/auth/profile     - Obtener perfil (🔒 protegido)
```

### Preguntas
```
GET    /api/questions/daily  - Pregunta del día
POST   /api/questions        - Crear pregunta
GET    /api/questions        - Todas las preguntas
```

### Puntuación
```
POST   /api/scores/answer    - Responder pregunta (🔒 protegido)
GET    /api/scores/ranking   - Ranking global
GET    /api/scores/user-rank - Posición del usuario (🔒 protegido)
GET    /api/scores/stats     - Estadísticas (🔒 protegido)
```

## 🛠️ Stack Tecnológico

### Backend
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Control de orígenes

### Frontend
- **React 18** - Librería UI
- **React Router 6** - Enrutamiento
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado
- **CSS3** - Estilos responsive

## 📦 Estructura del Proyecto

```
Friends/
├── server/
│   ├── models/              # Esquemas MongoDB
│   │   ├── User.js
│   │   ├── Question.js
│   │   └── Score.js
│   ├── controllers/         # Lógica de negocio
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   └── scoreController.js
│   ├── routes/              # Definición de rutas
│   │   ├── auth.js
│   │   ├── questions.js
│   │   └── scores.js
│   ├── middleware/          # Middleware personalizado
│   │   └── auth.js
│   ├── config/              # Configuración
│   │   └── database.js
│   ├── server.js            # Archivo principal
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Quiz.js
│   │   │   ├── Ranking.js
│   │   │   ├── Profile.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/           # Páginas
│   │   │   └── Home.js
│   │   ├── services/        # Servicios API
│   │   │   └── api.js
│   │   ├── context/         # Context API
│   │   │   └── AuthContext.js
│   │   ├── styles/          # Estilos CSS
│   │   │   ├── Navbar.css
│   │   │   ├── Auth.css
│   │   │   ├── Quiz.css
│   │   │   ├── Ranking.css
│   │   │   ├── Profile.css
│   │   │   ├── Home.css
│   │   │   └── Admin.css
│   │   ├── App.js           # Componente principal
│   │   ├── App.css
│   │   └── index.js         # Punto de entrada
│   ├── package.json
│   └── .env.example
│
├── README.md                # Documentación principal
├── GUIA_USO.md              # Guía de uso
├── MONGODB_SETUP.md         # Configuración MongoDB
├── setup.sh                 # Script de instalación (Linux/Mac)
├── setup.bat                # Script de instalación (Windows)
└── .gitignore               # Git ignore
```

## 🔐 Seguridad

- Contraseñas hasheadas con bcryptjs (10 rounds)
- JWT tokens para autenticación
- Rutas protegidas con middleware de autenticación
- CORS habilitado
- Variables sensibles en .env
- Validación de entrada en servidor

## 📊 Ejemplos de Datos

### Pregunta
```json
{
  "question": "¿Cuál es el nombre del bar donde se reúnen los personajes?",
  "options": [
    { "text": "Central Perk", "isCorrect": true },
    { "text": "The Ritz", "isCorrect": false },
    { "text": "The Coffee Bean", "isCorrect": false },
    { "text": "Brew Haven", "isCorrect": false }
  ],
  "correctAnswer": "Central Perk",
  "difficulty": "easy",
  "points": 10
}
```

### Usuario
```json
{
  "username": "ross_paleontologist",
  "email": "ross@example.com",
  "password": "hashed_password",
  "points": 250,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## 🚀 Despliegue

### Heroku (Recomendado)

#### Backend
1. Instala Heroku CLI
2. En carpeta `server`:
   ```bash
   heroku create nombre-app
   heroku addons:create mongolab:sandbox
   git push heroku main
   ```

#### Frontend
1. En carpeta `client`:
   ```bash
   npm run build
   # Despliega en Vercel o Netlify
   ```

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Netlify (Frontend)
1. Conecta tu repositorio Git
2. Build command: `npm run build`
3. Publish directory: `build`

## 🐛 Troubleshooting

### "Cannot GET /api/questions/daily"
- Verifica que el servidor está corriendo: `http://localhost:5000`
- Comprueba que las rutas están correctas

### "Failed to connect to MongoDB"
- Asegúrate MongoDB está corriendo: `mongod`
- O configura MongoDB Atlas en `.env`

### "CORS error"
- Comprueba `REACT_APP_API_URL` en cliente
- Verifica CORS está habilitado en servidor

### "Token no válido"
- Borra localStorage: `localStorage.clear()`
- Vuelve a iniciar sesión

## 📈 Mejoras Futuras

- [ ] Logros y badges
- [ ] Sistema de chat
- [ ] Modo multijugador
- [ ] Preguntas por categoría
- [ ] Temas personalizables
- [ ] Notificaciones push
- [ ] App móvil con React Native
- [ ] Leaderboard en tiempo real con WebSockets
- [ ] Sistema de comentarios
- [ ] Integración social (compartir resultados)

## 📄 Licencia

ISC

## 👨‍💻 Autor

Desarrollado como proyecto de trivia interactivo sobre la serie Friends.

## 💬 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

**¡Que disfrutes jugando Friends Trivia! 🎬**
