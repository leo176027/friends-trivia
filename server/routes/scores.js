const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');
const authMiddleware = require('../middleware/auth');

// Responder pregunta (protegido)
router.post('/answer', authMiddleware, scoreController.answerQuestion);

// Obtener ranking (requiere autenticación)
router.get('/ranking', authMiddleware, scoreController.getRanking);

// Obtener ranking del usuario (protegido)
router.get('/user-rank', authMiddleware, scoreController.getUserRank);

// Obtener estadísticas del usuario (protegido)
router.get('/stats', authMiddleware, scoreController.getUserStats);

module.exports = router;
