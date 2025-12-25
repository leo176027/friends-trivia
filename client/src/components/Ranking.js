import React, { useState, useEffect } from 'react';
import { scoreService } from '../services/api';
import '../styles/Ranking.css';

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      setLoading(true);
      const response = await scoreService.getRanking();
      setRanking(response.data.ranking);
    } catch (err) {
      setError('Error al cargar el ranking');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="ranking-container"><div className="loading">Cargando ranking...</div></div>;
  }

  return (
    <div className="ranking-container">
      <div className="ranking-card">
        <h1>Ranking Global</h1>
        
        {error && <div className="error-message">{error}</div>}

        <div className="ranking-table">
          <div className="ranking-header">
            <div className="rank-col">Posición</div>
            <div className="user-col">👥 Usuario</div>
            <div className="points-col">⭐ Puntos</div>
          </div>

          {ranking.length > 0 ? (
            ranking.map((player, index) => (
              <div key={index} className={`ranking-row ${index === 0 ? 'first' : ''} ${index === 1 ? 'second' : ''} ${index === 2 ? 'third' : ''}`}>
                <div className="rank-col">
                  <span className="medal">{index === 0 ? '🥇 1°' : index === 1 ? '🥈 2°' : index === 2 ? '🥉 3°' : `#${player.position}`}</span>
                </div>
                <div className="user-col">☕ {player.username}</div>
                <div className="points-col">{player.points} 🏆</div>
              </div>
            ))
          ) : (
            <div className="no-data">🤔 No hay jugadores aún</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
