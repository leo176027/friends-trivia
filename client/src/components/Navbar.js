import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ☕ FRIENDS
        </Link>
        
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/quiz" className="nav-link">💡 {t('quiz')}</Link>
              <Link to="/ranking" className="nav-link">🏆 {t('ranking')}</Link>
              <Link to="/profile" className="nav-link">👤 {t('myProfile')}</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link" style={{color: '#FFD700'}}>
                  🛠️ {t('admin')}
                </Link>
              )}
              <button 
                onClick={toggleLanguage} 
                className="nav-link language-btn"
                title={t('language')}
              >
                🌐 {language.toUpperCase()}
              </button>
              <button onClick={logout} className="nav-link logout-btn">
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={toggleLanguage} 
                className="nav-link language-btn"
                title={t('language')}
              >
                🌐 {language.toUpperCase()}
              </button>
              <Link to="/login" className="nav-link">🔓 {t('login')}</Link>
              <Link to="/register" className="nav-link register-link">📝 {t('register')}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
