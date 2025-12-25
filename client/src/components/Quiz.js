import React, { useState, useEffect, useRef } from 'react';
import { questionService, scoreService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Quiz.css';

// Función para mezclar aleatoriamente un array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();
  const { t } = useLanguage();
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!submitted && !loading && questions.length > 0 && !sessionCompleted) {
      // Iniciar timer de 30 segundos
      setTimeLeft(30);
      
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Tiempo agotado, enviar respuesta automáticamente
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, submitted, loading, sessionCompleted, questions.length]);

  const startQuiz = () => {
    setQuizStarted(true);
    loadQuestions();
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionService.getDailyQuestion(language);
      
      // Mezclar las opciones de cada pregunta
      const questionsWithShuffledOptions = (response.data.questions || []).map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }));
      
      setQuestions(questionsWithShuffledOptions);
      setQuestionsAnswered(response.data.questionsAnswered || 0);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar preguntas:', err.response?.data);
      
      // Error 401: Token inválido o expirado
      if (err.response?.status === 401) {
        setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
        setTimeout(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }, 2000);
      }
      // Error 400: Usuario debe esperar (cooldown de 48 horas)
      else if (err.response?.status === 400 && err.response?.data?.timeRemaining) {
        const { hours, minutes } = err.response.data.timeRemaining;
        setError(`Debes esperar ${hours} ${hours === 1 ? 'hora' : 'horas'} y ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} para responder nuevas preguntas`);
      }
      // Error 404: Usuario no encontrado (problema de base de datos)
      else if (err.response?.status === 404) {
        setError('Usuario no encontrado. Por favor cierra sesión e inicia sesión nuevamente.');
        setTimeout(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }, 3000);
      }
      // Otros errores
      else {
        setError(err.response?.data?.message || 'No hay preguntas disponibles en este momento');
      }
      setLoading(false);
    }
  };

  const handleTimeout = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentQuestion = questions[currentQuestionIndex];
    
    try {
      const response = await scoreService.answerQuestion({
        questionId: currentQuestion.id,
        timedOut: true
      });

      setResult(response.data);
      setSubmitted(true);
      setQuestionsAnswered(response.data.questionsAnswered);
      setTotalScore(prev => prev + response.data.pointsEarned);
      
      if (response.data.sessionCompleted) {
        setSessionCompleted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar timeout');
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      setError('Por favor selecciona una respuesta');
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentQuestion = questions[currentQuestionIndex];

    try {
      const response = await scoreService.answerQuestion({
        questionId: currentQuestion.id,
        answer: selectedAnswer
      });

      setResult(response.data);
      setSubmitted(true);
      setQuestionsAnswered(response.data.questionsAnswered);
      setTotalScore(prev => prev + response.data.pointsEarned);
      
      if (response.data.sessionCompleted) {
        setSessionCompleted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar respuesta');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
      setResult(null);
      setError('');
      setTimeLeft(30);
    }
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card welcome-card">
          <div className="welcome-content">
            <h1>{t('quizWelcomeTitle')}</h1>
            <div className="quiz-info">
              <p className="welcome-text">
                {t('welcomeUser')} {user?.username}! {t('welcomeText')}
              </p>
              
              <div className="quiz-rules">
                <h3>{t('quizRulesTitle')}</h3>
                <ul>
                  <li dangerouslySetInnerHTML={{ __html: t('rule1') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('rule2') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('rule3') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('rule4') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('rule5') }} />
                  <li dangerouslySetInnerHTML={{ __html: t('rule6') }} />
                </ul>
              </div>

              <div className="score-info">
                <p dangerouslySetInnerHTML={{ __html: t('currentScore') + ' ' + (user?.points || 0) + ' ' + t('points') }} />
                <p dangerouslySetInnerHTML={{ __html: t('maxScore') }} />
              </div>
            </div>

            <button 
              onClick={startQuiz}
              className="start-quiz-btn"
            >
              {t('startQuiz')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    const isWaitingError = error.includes('esperar') || error.includes('Debes') || error.includes('wait') || error.includes('must');
    return (
      <div className="quiz-container">
        <div className="error-state">
          <h2>{isWaitingError ? t('comeBackSoon') : t('error')}</h2>
          <p className="error-message">{error}</p>
          {isWaitingError && (
            <div className="info-box">
              <p>💡 {t('questionsInfo')}</p>
            </div>
          )}
          {!isWaitingError && !error.includes('sesión') && !error.includes('session') && (
            <button 
              onClick={loadQuestions} 
              className="retry-btn"
              style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
              {t('retry')}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (sessionCompleted) {
    return (
      <div className="quiz-container">
        <div className="quiz-card completion-card">
          <div className="completion-content">
            <h1>{t('quizCompleted')}</h1>
            <div className="final-stats">
              <p className="stat">
                <span className="stat-label">{t('questionsAnswered')}</span>
                <span className="stat-value">{questionsAnswered}/4</span>
              </p>
              <p className="stat">
                <span className="stat-label">{t('totalScore')}</span>
                <span className="stat-value">{totalScore > 0 ? '+' : ''}{totalScore} 🏆</span>
              </p>
              <p className="stat">
                <span className="stat-label">{t('newTotalScore')}</span>
                <span className="stat-value">{user?.points || 0} 🌟</span>
              </p>
            </div>
            <p className="next-quiz-info">
              {t('comeBackIn')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <div className="error-state">
          <h2>Error</h2>
          <p>No se pudo cargar la pregunta</p>
        </div>
      </div>
    );
  }

  const getDifficultyDisplay = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '🟢 ' + t('easy');
      case 'medium': return '🟡 ' + t('medium');
      case 'hard': return '🔴 ' + t('hard');
      default: return '🟡 ' + t('medium');
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 20) return '#27ae60';
    if (timeLeft > 10) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h1>Quiz de Friends</h1>
          <div className="quiz-progress">
            <span>{t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}</span>
            <span>{t('points')}: <strong>{user?.points || 0}</strong></span>
          </div>
        </div>

        <div className="timer-container" style={{ borderColor: getTimerColor() }}>
          <div className="timer-display" style={{ color: getTimerColor() }}>
            ⏱️ {timeLeft}s
          </div>
          <div className="timer-bar">
            <div 
              className="timer-bar-fill" 
              style={{ 
                width: `${(timeLeft / 30) * 100}%`,
                backgroundColor: getTimerColor()
              }}
            />
          </div>
        </div>

        <div className="question-content">
          <p className="difficulty">
            {getDifficultyDisplay(currentQuestion.difficulty)}
          </p>
          <h2 className="question-text">☕ {currentQuestion.question}</h2>

          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`option ${
                  selectedAnswer === option.text ? 'selected' : ''
                } ${
                  submitted && result?.correctAnswer === option.text ? 'correct' : ''
                } ${
                  submitted && selectedAnswer === option.text && result?.correctAnswer !== option.text
                    ? 'incorrect'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option.text}
                  checked={selectedAnswer === option.text}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={submitted}
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>
        </div>

        {!submitted ? (
          <button 
            onClick={handleSubmit} 
            className="submit-btn"
            disabled={!selectedAnswer}
          >
            ✨ {t('submitAnswer')}
          </button>
        ) : (
          <>
            <div className={`result ${result?.isCorrect ? 'success' : 'failure'}`}>
              <h3>{result?.message}</h3>
              <p>{t('points')}: <strong>{result?.pointsEarned > 0 ? '+' : ''}{result?.pointsEarned}</strong></p>
              <p>Respuesta correcta: <strong>{result?.correctAnswer}</strong></p>
            </div>
            
            {currentQuestionIndex < questions.length - 1 && (
              <button onClick={handleNextQuestion} className="submit-btn next-btn">
                ➡️ {t('nextQuestion')}
              </button>
            )}
          </>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Quiz;
