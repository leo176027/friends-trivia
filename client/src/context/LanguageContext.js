import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    // Navbar
    quiz: 'Quiz',
    ranking: 'Ranking',
    myProfile: 'Mi Perfil',
    admin: 'Admin',
    logout: 'Salir',
    login: 'Login',
    register: 'Registrarse',
    
    // Home
    welcomeTitle: 'Bienvenido a Friends Trivia',
    welcomeSubtitle: 'Pon a prueba tus conocimientos sobre la serie Friends',
    homeDescription: 'Responde preguntas sobre tus personajes favoritos, episodios memorables y momentos icónicos de la serie.',
    getStarted: 'Comenzar',
    
    // Login
    loginTitle: 'Iniciar Sesión',
    username: 'Nombre de usuario',
    password: 'Contraseña',
    loginButton: 'Entrar',
    noAccount: '¿No tienes cuenta?',
    registerHere: 'Regístrate aquí',
    
    // Register
    registerTitle: 'Registrarse',
    email: 'Email',
    confirmPassword: 'Confirmar contraseña',
    registerButton: 'Crear Cuenta',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    loginHere: 'Inicia sesión aquí',
    
    // Quiz Welcome
    quizWelcomeTitle: '🎬 Friends Trivia Quiz 🎬',
    welcomeUser: '¡Bienvenido',
    welcomeText: 'Prepárate para poner a prueba tus conocimientos sobre Friends.',
    quizRulesTitle: '📋 Reglas del Quiz',
    rule1: '📝 Responderás <strong>4 preguntas</strong> en esta sesión',
    rule2: '⏱️ Tienes <strong>30 segundos</strong> por pregunta',
    rule3: '🎯 <strong>2 preguntas fáciles</strong> (±1 punto)',
    rule4: '🎯 <strong>1 pregunta mediana</strong> (+2/-1 puntos)',
    rule5: '🎯 <strong>1 pregunta difícil</strong> (+3/-2 puntos)',
    rule6: '⏰ Después de completar, debes esperar <strong>48 horas</strong> para el próximo quiz',
    currentScore: '🏆 <strong>Tu puntuación actual:</strong>',
    maxScore: '💪 <strong>Puntuación máxima posible:</strong> +7 puntos (si aciertas todas)',
    startQuiz: '🚀 Comenzar Quiz',
    
    // Quiz
    question: 'Pregunta',
    of: 'de',
    timeRemaining: 'Tiempo restante:',
    seconds: 'segundos',
    difficulty: 'Dificultad:',
    easy: 'Fácil',
    medium: 'Mediana',
    hard: 'Difícil',
    submitAnswer: 'Enviar Respuesta',
    nextQuestion: 'Siguiente Pregunta',
    loading: '⏳ Cargando preguntas...',
    
    // Quiz Completion
    quizCompleted: '🎉 ¡Quiz Completado!',
    questionsAnswered: 'Preguntas respondidas:',
    totalScore: 'Puntuación total obtenida:',
    points: 'puntos',
    newTotalScore: 'Nueva puntuación total:',
    comeBackIn: 'Vuelve en 48 horas para responder más preguntas',
    backToHome: '🏠 Volver al Inicio',
    
    // Ranking
    rankingTitle: '🏆 Ranking de Jugadores',
    position: 'Posición',
    player: 'Jugador',
    score: 'Puntuación',
    noPlayers: 'No hay jugadores en el ranking todavía',
    
    // Profile
    profileTitle: 'Mi Perfil',
    accountInfo: 'Información de la Cuenta',
    emailVerified: 'Email Verificado',
    yes: 'Sí',
    no: 'No',
    statistics: 'Estadísticas',
    totalPoints: 'Puntos Totales:',
    questionsAnswered: 'Preguntas Respondidas:',
    correctAnswers: 'Respuestas Correctas:',
    accuracy: 'Precisión:',
    myRanking: 'Mi Posición en el Ranking',
    position: 'Posición:',
    
    // Admin Panel
    adminPanelTitle: '🛠️ Panel de Administración',
    userManagement: 'Gestión de Usuarios',
    totalUsers: 'Total de Usuarios:',
    verifiedUsers: 'Usuarios Verificados:',
    unverifiedUsers: 'Usuarios No Verificados:',
    actions: 'Acciones',
    deleteUser: 'Eliminar Usuario',
    verifyUser: 'Verificar Usuario',
    
    // Verify Email
    verifyingEmail: '🔄 Verificando tu email...',
    emailVerified: '✅ Email verificado exitosamente',
    verificationSuccess: '¡Tu cuenta ha sido verificada! Ya puedes iniciar sesión.',
    goToLogin: 'Ir al Login',
    verificationError: '❌ Error en la verificación',
    invalidToken: 'El enlace de verificación es inválido o ha expirado.',
    tryAgain: 'Intenta registrarte nuevamente.',
    
    // Errors
    error: 'Error',
    sessionExpired: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
    waitTime: 'Debes esperar',
    toAnswerMore: 'para responder nuevas preguntas',
    retry: '🔄 Reintentar',
    comeBackSoon: '⏰ Vuelve pronto',
    questionsInfo: 'Las preguntas están disponibles cada 48 horas para que tengas tiempo de pensar en tus respuestas.',
    
    // Common
    hours: 'h',
    minutes: 'm',
    language: 'Idioma'
  },
  en: {
    // Navbar
    quiz: 'Quiz',
    ranking: 'Ranking',
    myProfile: 'My Profile',
    admin: 'Admin',
    logout: 'Logout',
    login: 'Login',
    register: 'Sign Up',
    
    // Home
    welcomeTitle: 'Welcome to Friends Trivia',
    welcomeSubtitle: 'Test your knowledge about the Friends TV series',
    homeDescription: 'Answer questions about your favorite characters, memorable episodes, and iconic moments from the show.',
    getStarted: 'Get Started',
    
    // Login
    loginTitle: 'Login',
    username: 'Username',
    password: 'Password',
    loginButton: 'Sign In',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',
    
    // Register
    registerTitle: 'Sign Up',
    email: 'Email',
    confirmPassword: 'Confirm Password',
    registerButton: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    loginHere: 'Login here',
    
    // Quiz Welcome
    quizWelcomeTitle: '🎬 Friends Trivia Quiz 🎬',
    welcomeUser: 'Welcome',
    welcomeText: 'Get ready to test your knowledge about Friends.',
    quizRulesTitle: '📋 Quiz Rules',
    rule1: '📝 You will answer <strong>4 questions</strong> in this session',
    rule2: '⏱️ You have <strong>30 seconds</strong> per question',
    rule3: '🎯 <strong>2 easy questions</strong> (±1 point)',
    rule4: '🎯 <strong>1 medium question</strong> (+2/-1 points)',
    rule5: '🎯 <strong>1 hard question</strong> (+3/-2 points)',
    rule6: '⏰ After completing, you must wait <strong>48 hours</strong> for the next quiz',
    currentScore: '🏆 <strong>Your current score:</strong>',
    maxScore: '💪 <strong>Maximum possible score:</strong> +7 points (if you get all correct)',
    startQuiz: '🚀 Start Quiz',
    
    // Quiz
    question: 'Question',
    of: 'of',
    timeRemaining: 'Time remaining:',
    seconds: 'seconds',
    difficulty: 'Difficulty:',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question',
    loading: '⏳ Loading questions...',
    
    // Quiz Completion
    quizCompleted: '🎉 Quiz Completed!',
    questionsAnswered: 'Questions answered:',
    totalScore: 'Total score earned:',
    points: 'points',
    newTotalScore: 'New total score:',
    comeBackIn: 'Come back in 48 hours to answer more questions',
    backToHome: '🏠 Back to Home',
    
    // Ranking
    rankingTitle: '🏆 Player Ranking',
    position: 'Position',
    player: 'Player',
    score: 'Score',
    noPlayers: 'No players in the ranking yet',
    
    // Profile
    profileTitle: 'My Profile',
    accountInfo: 'Account Information',
    emailVerified: 'Email Verified',
    yes: 'Yes',
    no: 'No',
    statistics: 'Statistics',
    totalPoints: 'Total Points:',
    questionsAnswered: 'Questions Answered:',
    correctAnswers: 'Correct Answers:',
    accuracy: 'Accuracy:',
    myRanking: 'My Ranking Position',
    position: 'Position:',
    
    // Admin Panel
    adminPanelTitle: '🛠️ Administration Panel',
    userManagement: 'User Management',
    totalUsers: 'Total Users:',
    verifiedUsers: 'Verified Users:',
    unverifiedUsers: 'Unverified Users:',
    actions: 'Actions',
    deleteUser: 'Delete User',
    verifyUser: 'Verify User',
    
    // Verify Email
    verifyingEmail: '🔄 Verifying your email...',
    emailVerified: '✅ Email verified successfully',
    verificationSuccess: 'Your account has been verified! You can now log in.',
    goToLogin: 'Go to Login',
    verificationError: '❌ Verification error',
    invalidToken: 'The verification link is invalid or has expired.',
    tryAgain: 'Try registering again.',
    
    // Errors
    error: 'Error',
    sessionExpired: 'Your session has expired. Please log in again.',
    waitTime: 'You must wait',
    toAnswerMore: 'to answer new questions',
    retry: '🔄 Retry',
    comeBackSoon: '⏰ Come Back Soon',
    questionsInfo: 'Questions are available every 48 hours so you have time to think about your answers.',
    
    // Common
    hours: 'h',
    minutes: 'm',
    language: 'Language'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
