import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setNeedsVerification(false);

    try {
      await login(formData.email, formData.password);
      navigate('/quiz');
    } catch (err) {
      const errorData = err.response?.data;
      setError(errorData?.message || 'Error al iniciar sesión');
      
      // Si el error es por falta de verificación de email
      if (errorData?.requiresEmailVerification) {
        setNeedsVerification(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      await api.post('/auth/resend-verification', { email: formData.email });
      setResendMessage('Email de verificación reenviado. Por favor revisa tu bandeja de entrada.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al reenviar el email');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>☕ {t('welcomeTitle')}</h1>
        <p style={{textAlign: 'center', marginTop: '-10px'}}>{t('loginTitle')}</p>
        
        {error && <div className="error-message">{error}</div>}
        {resendMessage && <div className="success-message">{resendMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">📧 {t('email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔐 {t('password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? '⏳ ' + t('loading') + '...' : '✨ ' + t('loginButton')}
          </button>
        </form>

        {needsVerification && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px', textAlign: 'center' }}>
            <p style={{ color: '#856404', marginBottom: '10px' }}>
              Tu email aún no ha sido verificado.
            </p>
            <button 
              onClick={handleResendVerification} 
              disabled={resendLoading}
              className="submit-btn"
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              {resendLoading ? '⏳ Enviando...' : '📧 Reenviar Email de Verificación'}
            </button>
          </div>
        )}

        <p className="auth-link">
          {t('noAccount')} <Link to="/register">📝 {t('registerHere')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
