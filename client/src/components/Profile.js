import React, { useState, useEffect } from 'react';
import { scoreService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const [stats, setStats] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [statsResponse, rankResponse] = await Promise.all([
        scoreService.getUserStats(),
        scoreService.getUserRank()
      ]);
      setStats(statsResponse.data.stats);
      setRank(rankResponse.data);
    } catch (err) {
      setError('Error al cargar los datos del perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-container"><div className="loading">Cargando perfil...</div></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>👤 Mi Perfil</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-info">
          <div className="info-section">
            <h2>ℹ️ Información Personal</h2>
            <p><strong>Usuario:</strong> ☕ {user?.username}</p>
            <p><strong>Email:</strong> 📧 {user?.email}</p>
          </div>

          <div className="stats-section">
            <h2>📊 Estadísticas</h2>
            <div className="stat-item">
              <span>🏆 Puntos Totales:</span>
              <strong className="stat-value">{stats?.totalPoints}</strong>
            </div>
            <div className="stat-item">
              <span>📈 Posición en Ranking:</span>
              <strong className="stat-value">#{rank?.rank}</strong>
            </div>
            <div className="stat-item">
              <span>❓ Preguntas Respondidas:</span>
              <strong className="stat-value">{stats?.totalAnswered}</strong>
            </div>
            <div className="stat-item">
              <span>✅ Respuestas Correctas:</span>
              <strong className="stat-value">{stats?.correctAnswers}</strong>
            </div>
            <div className="stat-item">
              <span>🎯 Precisión:</span>
              <strong className="stat-value">{stats?.accuracy}%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
