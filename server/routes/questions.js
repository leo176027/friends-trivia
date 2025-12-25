const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/auth');
const adminAuth = auth.adminAuth;

// Obtener pregunta del día (requiere autenticación)
router.get('/daily', auth, questionController.getDailyQuestion);

// Crear pregunta (solo admin)
router.post('/', adminAuth, questionController.createQuestion);

// Obtener todas las preguntas (solo admin)
router.get('/', adminAuth, questionController.getAllQuestions);

module.exports = router;
