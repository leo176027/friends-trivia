import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await register(formData.username, formData.email, formData.password, formData.confirmPassword);
      
      // Si requiere verificación de email
      if (response.requiresEmailVerification) {
        setEmailSent(true);
        setUserEmail(response.email);
      } else {
        // Si no requiere verificación (no debería pasar con el nuevo sistema)
        navigate('/quiz');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  // Si el email fue enviado, mostrar mensaje de verificación
  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>📧 Verifica tu Email</h1>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Te hemos enviado un email de verificación a:</p>
            <p style={{ fontWeight: 'bold', color: '#4A90E2', marginTop: '10px' }}>
              {userEmail}
            </p>
            <p style={{ marginTop: '20px', color: '#666' }}>
              Por favor revisa tu bandeja de entrada y haz clic en el enlace de verificación.
            </p>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
              El enlace expirará en 24 horas.
            </p>
            <div style={{ marginTop: '30px' }}>
              <Link to="/login" className="submit-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Ir al Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🎬 Únete a Friends Trivia</h1>
        <p style={{textAlign: 'center', marginTop: '-10px'}}>Crea tu cuenta para empezar a jugar</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">👤 Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
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
            <label htmlFor="password">🔐 Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">🔐 Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? '⏳ Cargando...' : '✨ Crear Cuenta'}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">🔓 Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
