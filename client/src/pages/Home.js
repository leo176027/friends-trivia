import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  if (user) {
    return navigate('/quiz');
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>🎬 Friends Trivia 🎬</h1>
          <p>{t('welcomeSubtitle')}</p>
          <p className="subtitle">{t('homeDescription')}</p>

          <div className="hero-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary"
            >
              {t('login')}
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="btn btn-secondary"
            >
              {t('register')}
            </button>
          </div>
        </div>

        <div className="features-section">
          <h2>¿Cómo Funciona?</h2>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">☕</span>
              <h3>Preguntas Diarias</h3>
              <p>Una nueva pregunta cada día sobre los 6 personajes de Central Perk</p>
            </div>
            <div className="feature">
              <span className="feature-icon">⭐</span>
              <h3>Suma Puntos</h3>
              <p>+10 puntos por respuesta correcta | -5 puntos por incorrecta</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🏆</span>
              <h3>Ranking Global</h3>
              <p>Compite con tus amigos y obtén medallas como el mejor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
