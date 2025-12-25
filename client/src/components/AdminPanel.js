import React, { useState, useEffect } from 'react';
import { questionService } from '../services/api';
import '../styles/Admin.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ],
    correctAnswer: '',
    difficulty: 'medium',
    points: 10
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleQuestionChange = (e) => {
    setFormData(prev => ({ ...prev, question: e.target.value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleCorrectAnswerChange = (index) => {
    const newOptions = formData.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    }));
    setFormData(prev => ({
      ...prev,
      options: newOptions,
      correctAnswer: formData.options[index].text
    }));
  };

  const handleDifficultyChange = (e) => {
    setFormData(prev => ({ ...prev, difficulty: e.target.value }));
  };

  const handlePointsChange = (e) => {
    setFormData(prev => ({ ...prev, points: parseInt(e.target.value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const correctAnswer = formData.options.find(opt => opt.isCorrect)?.text;
      if (!correctAnswer) {
        setError('Por favor selecciona una respuesta correcta');
        setLoading(false);
        return;
      }

      const submitData = {
        question: formData.question,
        options: formData.options,
        correctAnswer,
        difficulty: formData.difficulty,
        points: formData.points
      };

      await questionService.createQuestion(submitData);
      setSuccess('Pregunta creada exitosamente');
      setFormData({
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ],
        correctAnswer: '',
        difficulty: 'medium',
        points: 10
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la pregunta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>🛠️ Panel de Administración</h1>
        <h2>📝 Crear Pregunta del Día sobre Friends</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✅ {success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="question">☕ Pregunta</label>
            <textarea
              id="question"
              value={formData.question}
              onChange={handleQuestionChange}
              placeholder="Ingresa la pregunta sobre Friends"
              required
              rows="3"
            />
          </div>

          <div className="options-group">
            <label>Opciones de Respuesta</label>
            {formData.options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Opción ${index + 1}`}
                  required
                />
                <label className="correct-label">
                  <input
                    type="radio"
                    name="correctAnswer"
                    onChange={() => handleCorrectAnswerChange(index)}
                    checked={option.isCorrect}
                  />
                  Correcta
                </label>
              </div>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficulty">🎯 Dificultad</label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={handleDifficultyChange}
              >
                <option value="easy">🟢 Fácil</option>
                <option value="medium">🟡 Medio</option>
                <option value="hard">🔴 Difícil</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="points">⭐ Puntos</label>
              <input
                type="number"
                id="points"
                value={formData.points}
                onChange={handlePointsChange}
                min="5"
                max="100"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? '⏳ Creando...' : '✨ Crear Pregunta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
