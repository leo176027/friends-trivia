import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/Auth.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verificando tu email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);
        
        // Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);
        
        setStatus('success');
        setMessage(response.data.message || 'Email verificado exitosamente');
        
        // Redirigir al quiz después de 3 segundos
        setTimeout(() => {
          navigate('/quiz');
          window.location.reload(); // Para actualizar el contexto de autenticación
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Error al verificar el email');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate, login]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {status === 'verifying' && (
          <>
            <h1>⏳ Verificando Email</h1>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>{message}</p>
              <div className="spinner" style={{ margin: '20px auto' }}></div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <h1>✅ Email Verificado</h1>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: '#4A90E2', fontWeight: 'bold' }}>{message}</p>
              <p style={{ marginTop: '20px', color: '#666' }}>
                Serás redirigido al quiz en unos segundos...
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/quiz" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  Ir al Quiz Ahora
                </Link>
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <h1>❌ Error de Verificación</h1>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ color: '#e74c3c' }}>{message}</p>
              <p style={{ marginTop: '20px', color: '#666' }}>
                El enlace puede haber expirado o ser inválido.
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/login" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  Ir al Login
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
