// Este archivo contiene 100 preguntas sobre Friends
// Distribución: 60 fáciles, 20 medianas, 20 difíciles
// Para usar este script: node sampleQuestions.js

require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const sampleQuestions = [
  // ===== PREGUNTAS FÁCILES (60 preguntas) =====
  {
    question: "¿Cuál es el nombre del bar donde se reúnen los personajes?",
    options: [
      { text: "Central Perk", isCorrect: true },
      { text: "The Ritz", isCorrect: false },
      { text: "The Coffee Bean", isCorrect: false },
      { text: "Brew Haven", isCorrect: false }
    ],
    correctAnswer: "Central Perk",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se llama el mono de Ross?",
    options: [
      { text: "Marcel", isCorrect: true },
      { text: "Charlie", isCorrect: false },
      { text: "George", isCorrect: false },
      { text: "Bobby", isCorrect: false }
    ],
    correctAnswer: "Marcel",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿De qué color es el sofá de Central Perk?",
    options: [
      { text: "Naranja", isCorrect: true },
      { text: "Rojo", isCorrect: false },
      { text: "Verde", isCorrect: false },
      { text: "Azul", isCorrect: false }
    ],
    correctAnswer: "Naranja",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué profesión tiene Joey?",
    options: [
      { text: "Actor", isCorrect: true },
      { text: "Chef", isCorrect: false },
      { text: "Paleontólogo", isCorrect: false },
      { text: "Masajista", isCorrect: false }
    ],
    correctAnswer: "Actor",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es el apellido de Rachel?",
    options: [
      { text: "Green", isCorrect: true },
      { text: "Brown", isCorrect: false },
      { text: "White", isCorrect: false },
      { text: "Black", isCorrect: false }
    ],
    correctAnswer: "Green",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es la famosa canción de Phoebe?",
    options: [
      { text: "Smelly Cat", isCorrect: true },
      { text: "Sticky Shoes", isCorrect: false },
      { text: "Crazy Underwear", isCorrect: false },
      { text: "Itchy Monkey", isCorrect: false }
    ],
    correctAnswer: "Smelly Cat",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se llama la hija de Ross y Rachel?",
    options: [
      { text: "Emma", isCorrect: true },
      { text: "Emily", isCorrect: false },
      { text: "Erica", isCorrect: false },
      { text: "Elizabeth", isCorrect: false }
    ],
    correctAnswer: "Emma",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué profesión tiene Ross?",
    options: [
      { text: "Paleontólogo", isCorrect: true },
      { text: "Chef", isCorrect: false },
      { text: "Actor", isCorrect: false },
      { text: "Masajista", isCorrect: false }
    ],
    correctAnswer: "Paleontólogo",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué profesión tiene Monica?",
    options: [
      { text: "Chef", isCorrect: true },
      { text: "Actriz", isCorrect: false },
      { text: "Masajista", isCorrect: false },
      { text: "Cantante", isCorrect: false }
    ],
    correctAnswer: "Chef",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué profesión tiene Phoebe?",
    options: [
      { text: "Masajista", isCorrect: true },
      { text: "Chef", isCorrect: false },
      { text: "Actriz", isCorrect: false },
      { text: "Doctora", isCorrect: false }
    ],
    correctAnswer: "Masajista",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se llama el hijo de Ross?",
    options: [
      { text: "Ben", isCorrect: true },
      { text: "Jack", isCorrect: false },
      { text: "Mike", isCorrect: false },
      { text: "David", isCorrect: false }
    ],
    correctAnswer: "Ben",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Con quién se casa Monica?",
    options: [
      { text: "Chandler", isCorrect: true },
      { text: "Ross", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Richard", isCorrect: false }
    ],
    correctAnswer: "Chandler",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Con quién se casa Phoebe?",
    options: [
      { text: "Mike", isCorrect: true },
      { text: "David", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Gary", isCorrect: false }
    ],
    correctAnswer: "Mike",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es el apellido de Monica y Ross?",
    options: [
      { text: "Geller", isCorrect: true },
      { text: "Green", isCorrect: false },
      { text: "Bing", isCorrect: false },
      { text: "Tribbiani", isCorrect: false }
    ],
    correctAnswer: "Geller",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es el apellido de Joey?",
    options: [
      { text: "Tribbiani", isCorrect: true },
      { text: "Geller", isCorrect: false },
      { text: "Bing", isCorrect: false },
      { text: "Green", isCorrect: false }
    ],
    correctAnswer: "Tribbiani",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es el apellido de Chandler?",
    options: [
      { text: "Bing", isCorrect: true },
      { text: "Tribbiani", isCorrect: false },
      { text: "Geller", isCorrect: false },
      { text: "Green", isCorrect: false }
    ],
    correctAnswer: "Bing",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es el apellido de Phoebe?",
    options: [
      { text: "Buffay", isCorrect: true },
      { text: "Green", isCorrect: false },
      { text: "Bing", isCorrect: false },
      { text: "Geller", isCorrect: false }
    ],
    correctAnswer: "Buffay",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿En qué ciudad viven los personajes?",
    options: [
      { text: "Nueva York", isCorrect: true },
      { text: "Los Ángeles", isCorrect: false },
      { text: "Chicago", isCorrect: false },
      { text: "Boston", isCorrect: false }
    ],
    correctAnswer: "Nueva York",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se llama el personaje interpretado por Joey en Days of Our Lives?",
    options: [
      { text: "Dr. Drake Ramoray", isCorrect: true },
      { text: "Dr. John Carter", isCorrect: false },
      { text: "Dr. Mike Ross", isCorrect: false },
      { text: "Dr. Ben Geller", isCorrect: false }
    ],
    correctAnswer: "Dr. Drake Ramoray",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué animal es Phoebe conocida por cantar sobre él?",
    options: [
      { text: "Un gato", isCorrect: true },
      { text: "Un perro", isCorrect: false },
      { text: "Un pájaro", isCorrect: false },
      { text: "Un ratón", isCorrect: false }
    ],
    correctAnswer: "Un gato",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué fobia tiene Chandler?",
    options: [
      { text: "Miedo a los perros", isCorrect: true },
      { text: "Miedo a las alturas", isCorrect: false },
      { text: "Miedo a volar", isCorrect: false },
      { text: "Miedo al agua", isCorrect: false }
    ],
    correctAnswer: "Miedo a los perros",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué es lo que más le gusta comer a Joey?",
    options: [
      { text: "Pizza", isCorrect: true },
      { text: "Hamburguesas", isCorrect: false },
      { text: "Sushi", isCorrect: false },
      { text: "Tacos", isCorrect: false }
    ],
    correctAnswer: "Pizza",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué deporte juega Ross?",
    options: [
      { text: "Hockey", isCorrect: true },
      { text: "Fútbol", isCorrect: false },
      { text: "Béisbol", isCorrect: false },
      { text: "Tenis", isCorrect: false }
    ],
    correctAnswer: "Hockey",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué tipo de dinosaurio estudia Ross?",
    options: [
      { text: "Todos los tipos", isCorrect: true },
      { text: "T-Rex", isCorrect: false },
      { text: "Velociraptor", isCorrect: false },
      { text: "Triceratops", isCorrect: false }
    ],
    correctAnswer: "Todos los tipos",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se llama la hermana gemela de Phoebe?",
    options: [
      { text: "Ursula", isCorrect: true },
      { text: "Rachel", isCorrect: false },
      { text: "Monica", isCorrect: false },
      { text: "Julie", isCorrect: false }
    ],
    correctAnswer: "Ursula",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué hace Monica cuando está nerviosa?",
    options: [
      { text: "Limpia", isCorrect: true },
      { text: "Canta", isCorrect: false },
      { text: "Grita", isCorrect: false },
      { text: "Baila", isCorrect: false }
    ],
    correctAnswer: "Limpia",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cómo se conocieron Ross y Rachel?",
    options: [
      { text: "En la secundaria", isCorrect: true },
      { text: "En la universidad", isCorrect: false },
      { text: "En Central Perk", isCorrect: false },
      { text: "En el trabajo", isCorrect: false }
    ],
    correctAnswer: "En la secundaria",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué instrumento toca Phoebe?",
    options: [
      { text: "Guitarra", isCorrect: true },
      { text: "Piano", isCorrect: false },
      { text: "Batería", isCorrect: false },
      { text: "Violín", isCorrect: false }
    ],
    correctAnswer: "Guitarra",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el mejor amigo de Chandler?",
    options: [
      { text: "Joey", isCorrect: true },
      { text: "Ross", isCorrect: false },
      { text: "Monica", isCorrect: false },
      { text: "Rachel", isCorrect: false }
    ],
    correctAnswer: "Joey",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quiénes son hermanos?",
    options: [
      { text: "Monica y Ross", isCorrect: true },
      { text: "Joey y Chandler", isCorrect: false },
      { text: "Rachel y Phoebe", isCorrect: false },
      { text: "Ross y Chandler", isCorrect: false }
    ],
    correctAnswer: "Monica y Ross",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué hace Joey cuando está confundido?",
    options: [
      { text: "Se rasca la cabeza", isCorrect: true },
      { text: "Grita", isCorrect: false },
      { text: "Llora", isCorrect: false },
      { text: "Ríe", isCorrect: false }
    ],
    correctAnswer: "Se rasca la cabeza",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué comida no comparte Joey?",
    options: [
      { text: "Su comida", isCorrect: true },
      { text: "Su bebida", isCorrect: false },
      { text: "Su ropa", isCorrect: false },
      { text: "Su dinero", isCorrect: false }
    ],
    correctAnswer: "Su comida",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Dónde trabaja Rachel después de Central Perk?",
    options: [
      { text: "En moda", isCorrect: true },
      { text: "En un restaurante", isCorrect: false },
      { text: "En un hospital", isCorrect: false },
      { text: "En una escuela", isCorrect: false }
    ],
    correctAnswer: "En moda",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el padre de los gemelos de Monica?",
    options: [
      { text: "Chandler", isCorrect: true },
      { text: "Ross", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Richard", isCorrect: false }
    ],
    correctAnswer: "Chandler",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el padre de Emma?",
    options: [
      { text: "Ross", isCorrect: true },
      { text: "Chandler", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Mike", isCorrect: false }
    ],
    correctAnswer: "Ross",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el padre de Ben?",
    options: [
      { text: "Ross", isCorrect: true },
      { text: "Chandler", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Richard", isCorrect: false }
    ],
    correctAnswer: "Ross",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Dónde viven Chandler y Joey?",
    options: [
      { text: "En un apartamento", isCorrect: true },
      { text: "En una casa", isCorrect: false },
      { text: "En un hotel", isCorrect: false },
      { text: "En un dormitorio", isCorrect: false }
    ],
    correctAnswer: "En un apartamento",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Dónde viven Monica y Rachel?",
    options: [
      { text: "En un apartamento", isCorrect: true },
      { text: "En una casa", isCorrect: false },
      { text: "En un hotel", isCorrect: false },
      { text: "En un dormitorio", isCorrect: false }
    ],
    correctAnswer: "En un apartamento",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué edad tiene aproximadamente el grupo de amigos al inicio de la serie?",
    options: [
      { text: "Alrededor de 25 años", isCorrect: true },
      { text: "Alrededor de 30 años", isCorrect: false },
      { text: "Alrededor de 20 años", isCorrect: false },
      { text: "Alrededor de 35 años", isCorrect: false }
    ],
    correctAnswer: "Alrededor de 25 años",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el más grande del grupo?",
    options: [
      { text: "Ross", isCorrect: true },
      { text: "Chandler", isCorrect: false },
      { text: "Joey", isCorrect: false },
      { text: "Monica", isCorrect: false }
    ],
    correctAnswer: "Ross",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién es el más joven del grupo?",
    options: [
      { text: "Rachel", isCorrect: true },
      { text: "Phoebe", isCorrect: false },
      { text: "Monica", isCorrect: false },
      { text: "Joey", isCorrect: false }
    ],
    correctAnswer: "Rachel",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué color es el apartamento de Monica?",
    options: [
      { text: "Morado/Lila", isCorrect: true },
      { text: "Rojo", isCorrect: false },
      { text: "Verde", isCorrect: false },
      { text: "Azul", isCorrect: false }
    ],
    correctAnswer: "Morado/Lila",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué mueble emblemático hay en el apartamento de Monica?",
    options: [
      { text: "Un sillón reclinable", isCorrect: true },
      { text: "Un piano", isCorrect: false },
      { text: "Una cama king", isCorrect: false },
      { text: "Un sofá rojo", isCorrect: false }
    ],
    correctAnswer: "Un sillón reclinable",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué hace Ross cuando miente?",
    options: [
      { text: "Toca su oreja", isCorrect: true },
      { text: "Se ríe", isCorrect: false },
      { text: "Se ruboriza", isCorrect: false },
      { text: "Grita", isCorrect: false }
    ],
    correctAnswer: "Toca su oreja",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué animal tiene Ross además de Marcel?",
    options: [
      { text: "Una serpiente", isCorrect: true },
      { text: "Un perro", isCorrect: false },
      { text: "Un gato", isCorrect: false },
      { text: "Un pájaro", isCorrect: false }
    ],
    correctAnswer: "Una serpiente",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué palabra dice Ross cuando está enojado?",
    options: [
      { text: "Unagi", isCorrect: true },
      { text: "Pivot", isCorrect: false },
      { text: "Break", isCorrect: false },
      { text: "Fine", isCorrect: false }
    ],
    correctAnswer: "Unagi",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué dice Joey como frase de conquista?",
    options: [
      { text: "How you doin'?", isCorrect: true },
      { text: "What's up?", isCorrect: false },
      { text: "Hey baby", isCorrect: false },
      { text: "Hello gorgeous", isCorrect: false }
    ],
    correctAnswer: "How you doin'?",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué grita Ross cuando mueve el sofá?",
    options: [
      { text: "Pivot!", isCorrect: true },
      { text: "Careful!", isCorrect: false },
      { text: "Watch out!", isCorrect: false },
      { text: "Stop!", isCorrect: false }
    ],
    correctAnswer: "Pivot!",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué tipo de comida hace Monica profesionalmente?",
    options: [
      { text: "Comida gourmet", isCorrect: true },
      { text: "Comida rápida", isCorrect: false },
      { text: "Comida italiana", isCorrect: false },
      { text: "Comida mexicana", isCorrect: false }
    ],
    correctAnswer: "Comida gourmet",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué bebe constantemente en Central Perk?",
    options: [
      { text: "Café", isCorrect: true },
      { text: "Té", isCorrect: false },
      { text: "Jugo", isCorrect: false },
      { text: "Agua", isCorrect: false }
    ],
    correctAnswer: "Café",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuántas temporadas tiene Friends?",
    options: [
      { text: "10", isCorrect: true },
      { text: "8", isCorrect: false },
      { text: "12", isCorrect: false },
      { text: "9", isCorrect: false }
    ],
    correctAnswer: "10",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué mascota tienen Chandler y Joey?",
    options: [
      { text: "Un pollito y un pato", isCorrect: true },
      { text: "Un gato y un perro", isCorrect: false },
      { text: "Dos perros", isCorrect: false },
      { text: "Un conejo", isCorrect: false }
    ],
    correctAnswer: "Un pollito y un pato",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué estudió Ross en la universidad?",
    options: [
      { text: "Paleontología", isCorrect: true },
      { text: "Medicina", isCorrect: false },
      { text: "Derecho", isCorrect: false },
      { text: "Ingeniería", isCorrect: false }
    ],
    correctAnswer: "Paleontología",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Dónde trabaja Ross?",
    options: [
      { text: "En un museo", isCorrect: true },
      { text: "En un hospital", isCorrect: false },
      { text: "En una escuela", isCorrect: false },
      { text: "En una tienda", isCorrect: false }
    ],
    correctAnswer: "En un museo",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué tipo de médico pretendía ser Joey?",
    options: [
      { text: "Neurocirujano", isCorrect: true },
      { text: "Cardiólogo", isCorrect: false },
      { text: "Pediatra", isCorrect: false },
      { text: "Psiquiatra", isCorrect: false }
    ],
    correctAnswer: "Neurocirujano",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué evento interrumpe Rachel al inicio de la serie?",
    options: [
      { text: "Su boda", isCorrect: true },
      { text: "Su graduación", isCorrect: false },
      { text: "Su cumpleaños", isCorrect: false },
      { text: "Su trabajo", isCorrect: false }
    ],
    correctAnswer: "Su boda",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Quién estaba Rachel a punto de casarse?",
    options: [
      { text: "Barry", isCorrect: true },
      { text: "Ross", isCorrect: false },
      { text: "Paolo", isCorrect: false },
      { text: "Mark", isCorrect: false }
    ],
    correctAnswer: "Barry",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué día es el día de Acción de Gracias en la serie?",
    options: [
      { text: "Un día importante", isCorrect: true },
      { text: "Un día normal", isCorrect: false },
      { text: "Un día triste", isCorrect: false },
      { text: "No se celebra", isCorrect: false }
    ],
    correctAnswer: "Un día importante",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Qué animal tiene Chandler miedo?",
    options: [
      { text: "Perros", isCorrect: true },
      { text: "Gatos", isCorrect: false },
      { text: "Pájaros", isCorrect: false },
      { text: "Arañas", isCorrect: false }
    ],
    correctAnswer: "Perros",
    difficulty: "easy",
    points: 1
  },
  {
    question: "¿Cuál es la bebida favorita de los amigos en Central Perk?",
    options: [
      { text: "Café", isCorrect: true },
      { text: "Té", isCorrect: false },
      { text: "Jugo", isCorrect: false },
      { text: "Refresco", isCorrect: false }
    ],
    correctAnswer: "Café",
    difficulty: "easy",
    points: 1
  },
  
  // ===== PREGUNTAS MEDIANAS (20 preguntas) =====
  {
    question: "¿Cuántos años cumple Ross en el episodio donde hace su lista de lo bueno y lo malo?",
    options: [
      { text: "29", isCorrect: true },
      { text: "30", isCorrect: false },
      { text: "28", isCorrect: false },
      { text: "31", isCorrect: false }
    ],
    correctAnswer: "29",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Cuál es el trabajo de Chandler durante la mayoría de la serie?",
    options: [
      { text: "Procesamiento de Datos", isCorrect: true },
      { text: "Estadístico", isCorrect: false },
      { text: "Abogado", isCorrect: false },
      { text: "Contable", isCorrect: false }
    ],
    correctAnswer: "Procesamiento de Datos",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿En qué temporada Rachel se entera de que está embarazada?",
    options: [
      { text: "Temporada 8", isCorrect: true },
      { text: "Temporada 7", isCorrect: false },
      { text: "Temporada 9", isCorrect: false },
      { text: "Temporada 6", isCorrect: false }
    ],
    correctAnswer: "Temporada 8",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Cuántas veces se divorcia Ross?",
    options: [
      { text: "3", isCorrect: true },
      { text: "2", isCorrect: false },
      { text: "4", isCorrect: false },
      { text: "1", isCorrect: false }
    ],
    correctAnswer: "3",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Cuál era el trabajo de Rachel antes de Central Perk?",
    options: [
      { text: "Ninguno/Ama de casa", isCorrect: true },
      { text: "Mesera", isCorrect: false },
      { text: "Secretaria", isCorrect: false },
      { text: "Vendedora", isCorrect: false }
    ],
    correctAnswer: "Ninguno/Ama de casa",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿En qué compañía trabaja Chandler antes de cambiar de carrera?",
    options: [
      { text: "Una empresa de estadísticas", isCorrect: true },
      { text: "Microsoft", isCorrect: false },
      { text: "Apple", isCorrect: false },
      { text: "Google", isCorrect: false }
    ],
    correctAnswer: "Una empresa de estadísticas",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué nueva carrera comienza Chandler?",
    options: [
      { text: "Publicidad", isCorrect: true },
      { text: "Ventas", isCorrect: false },
      { text: "Marketing", isCorrect: false },
      { text: "Diseño", isCorrect: false }
    ],
    correctAnswer: "Publicidad",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Cómo se llama la primera esposa de Ross?",
    options: [
      { text: "Carol", isCorrect: true },
      { text: "Emily", isCorrect: false },
      { text: "Julie", isCorrect: false },
      { text: "Charlie", isCorrect: false }
    ],
    correctAnswer: "Carol",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Con quién se casa Carol después de divorciarse de Ross?",
    options: [
      { text: "Susan", isCorrect: true },
      { text: "Julie", isCorrect: false },
      { text: "Emily", isCorrect: false },
      { text: "Nadie", isCorrect: false }
    ],
    correctAnswer: "Susan",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Cómo se llama la segunda esposa de Ross?",
    options: [
      { text: "Emily", isCorrect: true },
      { text: "Carol", isCorrect: false },
      { text: "Julie", isCorrect: false },
      { text: "Rachel", isCorrect: false }
    ],
    correctAnswer: "Emily",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué nombre dice Ross en vez de Emily en la boda?",
    options: [
      { text: "Rachel", isCorrect: true },
      { text: "Monica", isCorrect: false },
      { text: "Julie", isCorrect: false },
      { text: "Carol", isCorrect: false }
    ],
    correctAnswer: "Rachel",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿En qué ciudad se casa Ross con Emily?",
    options: [
      { text: "Londres", isCorrect: true },
      { text: "París", isCorrect: false },
      { text: "Nueva York", isCorrect: false },
      { text: "Las Vegas", isCorrect: false }
    ],
    correctAnswer: "Londres",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué restaurante abre Monica?",
    options: [
      { text: "Alessandro's", isCorrect: true },
      { text: "Javu", isCorrect: false },
      { text: "Central Perk Kitchen", isCorrect: false },
      { text: "Monica's", isCorrect: false }
    ],
    correctAnswer: "Alessandro's",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Quién es el exnovio mayor de Monica?",
    options: [
      { text: "Richard", isCorrect: true },
      { text: "Pete", isCorrect: false },
      { text: "Chandler", isCorrect: false },
      { text: "Fun Bobby", isCorrect: false }
    ],
    correctAnswer: "Richard",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué profesión tiene Richard?",
    options: [
      { text: "Oftalmólogo", isCorrect: true },
      { text: "Cardiólogo", isCorrect: false },
      { text: "Dentista", isCorrect: false },
      { text: "Cirujano", isCorrect: false }
    ],
    correctAnswer: "Oftalmólogo",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Quién es el padre de Richard?",
    options: [
      { text: "Amigo de los padres de Monica", isCorrect: true },
      { text: "Su jefe", isCorrect: false },
      { text: "Su vecino", isCorrect: false },
      { text: "Su profesor", isCorrect: false }
    ],
    correctAnswer: "Amigo de los padres de Monica",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué le regala Chandler a Phoebe por error?",
    options: [
      { text: "Calcetines", isCorrect: true },
      { text: "Un libro", isCorrect: false },
      { text: "Una taza", isCorrect: false },
      { text: "Chocolates", isCorrect: false }
    ],
    correctAnswer: "Calcetines",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Qué trabajo secundario tiene Phoebe?",
    options: [
      { text: "Cantante callejera", isCorrect: true },
      { text: "Mesera", isCorrect: false },
      { text: "Actriz", isCorrect: false },
      { text: "Vendedora", isCorrect: false }
    ],
    correctAnswer: "Cantante callejera",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿Quién cría Phoebe como hijos subrogados?",
    options: [
      { text: "Trillizos de su hermano", isCorrect: true },
      { text: "Gemelos de Monica", isCorrect: false },
      { text: "Un bebé de Rachel", isCorrect: false },
      { text: "Gemelos de su hermana", isCorrect: false }
    ],
    correctAnswer: "Trillizos de su hermano",
    difficulty: "medium",
    points: 2
  },
  {
    question: "¿En qué trabaja Rachel después de Bloomingdale's?",
    options: [
      { text: "Ralph Lauren", isCorrect: true },
      { text: "Gucci", isCorrect: false },
      { text: "Prada", isCorrect: false },
      { text: "Chanel", isCorrect: false }
    ],
    correctAnswer: "Ralph Lauren",
    difficulty: "medium",
    points: 2
  },
  
  // ===== PREGUNTAS DIFÍCILES (20 preguntas) =====
  {
    question: "¿Cuáles son los nombres de los gemelos adoptados por Monica y Chandler?",
    options: [
      { text: "Jack y Erica", isCorrect: true },
      { text: "Ben y Emma", isCorrect: false },
      { text: "Ross y Rachel", isCorrect: false },
      { text: "Mike y Phoebe", isCorrect: false }
    ],
    correctAnswer: "Jack y Erica",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre completo del alter ego de Phoebe?",
    options: [
      { text: "Regina Phalange", isCorrect: true },
      { text: "Erica Bing", isCorrect: false },
      { text: "Julie Graff", isCorrect: false },
      { text: "Rachel West", isCorrect: false }
    ],
    correctAnswer: "Regina Phalange",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿En qué episodio Ross y Rachel se casan en Las Vegas?",
    options: [
      { text: "The One in Vegas, Part 2", isCorrect: true },
      { text: "The One After Vegas", isCorrect: false },
      { text: "The One with the Wedding", isCorrect: false },
      { text: "The One in Atlantic City", isCorrect: false }
    ],
    correctAnswer: "The One in Vegas, Part 2",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el segundo nombre de Chandler?",
    options: [
      { text: "Muriel", isCorrect: true },
      { text: "Michael", isCorrect: false },
      { text: "Matthew", isCorrect: false },
      { text: "Martin", isCorrect: false }
    ],
    correctAnswer: "Muriel",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el apellido de soltera de la madre de Chandler?",
    options: [
      { text: "Tribbiani", isCorrect: false },
      { text: "Buffay", isCorrect: false },
      { text: "No se menciona", isCorrect: true },
      { text: "Geller", isCorrect: false }
    ],
    correctAnswer: "No se menciona",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre del científico que Phoebe amaba?",
    options: [
      { text: "David", isCorrect: true },
      { text: "Mike", isCorrect: false },
      { text: "Gary", isCorrect: false },
      { text: "Paul", isCorrect: false }
    ],
    correctAnswer: "David",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿A qué país se muda David para su trabajo?",
    options: [
      { text: "Minsk (Bielorrusia)", isCorrect: true },
      { text: "Rusia", isCorrect: false },
      { text: "Polonia", isCorrect: false },
      { text: "Ucrania", isCorrect: false }
    ],
    correctAnswer: "Minsk (Bielorrusia)",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el apellido completo de Mike, el esposo de Phoebe?",
    options: [
      { text: "Hannigan", isCorrect: true },
      { text: "Harrison", isCorrect: false },
      { text: "Hamilton", isCorrect: false },
      { text: "Henderson", isCorrect: false }
    ],
    correctAnswer: "Hannigan",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es la profesión original de Mike antes de ser pianista?",
    options: [
      { text: "Abogado", isCorrect: true },
      { text: "Médico", isCorrect: false },
      { text: "Ingeniero", isCorrect: false },
      { text: "Profesor", isCorrect: false }
    ],
    correctAnswer: "Abogado",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuántos años de diferencia hay entre Monica y Ross?",
    options: [
      { text: "1 año", isCorrect: true },
      { text: "2 años", isCorrect: false },
      { text: "3 años", isCorrect: false },
      { text: "Son gemelos", isCorrect: false }
    ],
    correctAnswer: "1 año",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre real de la actriz que interpreta a Rachel?",
    options: [
      { text: "Jennifer Aniston", isCorrect: true },
      { text: "Courteney Cox", isCorrect: false },
      { text: "Lisa Kudrow", isCorrect: false },
      { text: "Jennifer Lawrence", isCorrect: false }
    ],
    correctAnswer: "Jennifer Aniston",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿En qué año comenzó la serie Friends?",
    options: [
      { text: "1994", isCorrect: true },
      { text: "1995", isCorrect: false },
      { text: "1993", isCorrect: false },
      { text: "1996", isCorrect: false }
    ],
    correctAnswer: "1994",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿En qué año terminó la serie Friends?",
    options: [
      { text: "2004", isCorrect: true },
      { text: "2005", isCorrect: false },
      { text: "2003", isCorrect: false },
      { text: "2006", isCorrect: false }
    ],
    correctAnswer: "2004",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre del padre de Monica y Ross?",
    options: [
      { text: "Jack", isCorrect: true },
      { text: "Leonard", isCorrect: false },
      { text: "Richard", isCorrect: false },
      { text: "Charles", isCorrect: false }
    ],
    correctAnswer: "Jack",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre de la madre de Monica y Ross?",
    options: [
      { text: "Judy", isCorrect: true },
      { text: "Sandra", isCorrect: false },
      { text: "Patricia", isCorrect: false },
      { text: "Barbara", isCorrect: false }
    ],
    correctAnswer: "Judy",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre del perro imaginario de Phoebe?",
    options: [
      { text: "Chi-Chi", isCorrect: true },
      { text: "Fluffy", isCorrect: false },
      { text: "Spot", isCorrect: false },
      { text: "Max", isCorrect: false }
    ],
    correctAnswer: "Chi-Chi",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuántos hermanos tiene Joey?",
    options: [
      { text: "7 hermanas", isCorrect: true },
      { text: "5 hermanas", isCorrect: false },
      { text: "6 hermanas", isCorrect: false },
      { text: "8 hermanas", isCorrect: false }
    ],
    correctAnswer: "7 hermanas",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre completo de Ross?",
    options: [
      { text: "Ross Eustace Geller", isCorrect: true },
      { text: "Ross Edward Geller", isCorrect: false },
      { text: "Ross Ernest Geller", isCorrect: false },
      { text: "Ross Ethan Geller", isCorrect: false }
    ],
    correctAnswer: "Ross Eustace Geller",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Qué universidad contrató a Ross como profesor?",
    options: [
      { text: "NYU (Universidad de Nueva York)", isCorrect: true },
      { text: "Columbia", isCorrect: false },
      { text: "Harvard", isCorrect: false },
      { text: "Yale", isCorrect: false }
    ],
    correctAnswer: "NYU (Universidad de Nueva York)",
    difficulty: "hard",
    points: 3
  },
  {
    question: "¿Cuál es el nombre de la tienda donde trabaja Rachel primero en moda?",
    options: [
      { text: "Bloomingdale's", isCorrect: true },
      { text: "Macy's", isCorrect: false },
      { text: "Saks Fifth Avenue", isCorrect: false },
      { text: "Nordstrom", isCorrect: false }
    ],
    correctAnswer: "Bloomingdale's",
    difficulty: "hard",
    points: 3
  }
];

// Función para insertar preguntas de ejemplo
async function insertSampleQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friends-trivia');
    console.log('✅ Conectado a MongoDB');

    // Eliminar preguntas existentes
    await Question.deleteMany({});
    console.log('🗑️  Preguntas anteriores eliminadas');

    // Insertar preguntas sin el campo dailyDate ya que ahora usamos random selection
    const questionsToInsert = sampleQuestions.map(q => ({
      ...q,
      dailyDate: new Date() // Este campo ya no es tan importante
    }));

    await Question.insertMany(questionsToInsert);
    console.log(`✅ ${sampleQuestions.length} preguntas insertadas exitosamente`);
    
    const counts = {
      easy: sampleQuestions.filter(q => q.difficulty === 'easy').length,
      medium: sampleQuestions.filter(q => q.difficulty === 'medium').length,
      hard: sampleQuestions.filter(q => q.difficulty === 'hard').length
    };
    
    console.log('\n📊 Distribución de preguntas:');
    console.log(`   🟢 Fáciles: ${counts.easy}`);
    console.log(`   🟡 Medianas: ${counts.medium}`);
    console.log(`   🔴 Difíciles: ${counts.hard}`);
    console.log('\n💡 Cada quiz tiene: 2 fáciles, 1 mediana y 1 difícil');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  insertSampleQuestions();
}

module.exports = sampleQuestions;
