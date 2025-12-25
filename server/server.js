require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const connectDB = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const scoreRoutes = require('./routes/scores');

const app = express();

// Comprimir respuestas HTTP para mejor performance
app.use(compression());

// Configuración de CORS para producción y desarrollo
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://friends-trivia-tau.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El CORS policy no permite acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Conectar a la base de datos
connectDB().catch(err => {
  console.error('Error de conexión a BD:', err);
  // Continuar sin BD para desarrollo local
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/scores', scoreRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
