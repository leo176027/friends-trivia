require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const newHardQuestions = [
  {
    question: {
      es: "¿Cuál es el nombre del perro de Joey en su infancia?",
      en: "What was the name of Joey's childhood dog?"
    },
    options: [
      { text: { es: "Hugsy", en: "Hugsy" }, isCorrect: false },
      { text: { es: "Chick Jr.", en: "Chick Jr." }, isCorrect: false },
      { text: { es: "Fluffy", en: "Fluffy" }, isCorrect: true },
      { text: { es: "Max", en: "Max" }, isCorrect: false }
    ],
    correctAnswer: { es: "Fluffy", en: "Fluffy" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Qué edad tiene Marcel, el mono de Ross?",
      en: "How old is Marcel, Ross's monkey?"
    },
    options: [
      { text: { es: "2 años", en: "2 years" }, isCorrect: false },
      { text: { es: "3 años", en: "3 years" }, isCorrect: true },
      { text: { es: "4 años", en: "4 years" }, isCorrect: false },
      { text: { es: "5 años", en: "5 years" }, isCorrect: false }
    ],
    correctAnswer: { es: "3 años", en: "3 years" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuál es el nombre de la revista para la que trabaja Chandler antes de renunciar?",
      en: "What is the name of the magazine Chandler works for before quitting?"
    },
    options: [
      { text: { es: "Statistical Analysis and Data Reconfiguration", en: "Statistical Analysis and Data Reconfiguration" }, isCorrect: true },
      { text: { es: "Data Processing Corporation", en: "Data Processing Corporation" }, isCorrect: false },
      { text: { es: "Information Systems", en: "Information Systems" }, isCorrect: false },
      { text: { es: "Financial Analytics Group", en: "Financial Analytics Group" }, isCorrect: false }
    ],
    correctAnswer: { es: "Statistical Analysis and Data Reconfiguration", en: "Statistical Analysis and Data Reconfiguration" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuánto tiempo estuvo Ross casado con Carol antes de divorciarse?",
      en: "How long was Ross married to Carol before divorcing?"
    },
    options: [
      { text: { es: "7 años", en: "7 years" }, isCorrect: true },
      { text: { es: "5 años", en: "5 years" }, isCorrect: false },
      { text: { es: "6 años", en: "6 years" }, isCorrect: false },
      { text: { es: "8 años", en: "8 years" }, isCorrect: false }
    ],
    correctAnswer: { es: "7 años", en: "7 years" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuál es el nombre del personaje que Joey interpreta en Days of Our Lives?",
      en: "What is the name of the character Joey plays in Days of Our Lives?"
    },
    options: [
      { text: { es: "Dr. Drake Ramoray", en: "Dr. Drake Ramoray" }, isCorrect: true },
      { text: { es: "Dr. Richard Burke", en: "Dr. Richard Burke" }, isCorrect: false },
      { text: { es: "Dr. Bobby Rush", en: "Dr. Bobby Rush" }, isCorrect: false },
      { text: { es: "Dr. John Carter", en: "Dr. John Carter" }, isCorrect: false }
    ],
    correctAnswer: { es: "Dr. Drake Ramoray", en: "Dr. Drake Ramoray" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Qué palabra inventada grita Ross cuando mueve el sofá?",
      en: "What made-up word does Ross shout when moving the couch?"
    },
    options: [
      { text: { es: "PIVOT!", en: "PIVOT!" }, isCorrect: true },
      { text: { es: "ROTATE!", en: "ROTATE!" }, isCorrect: false },
      { text: { es: "TURN!", en: "TURN!" }, isCorrect: false },
      { text: { es: "MOVE!", en: "MOVE!" }, isCorrect: false }
    ],
    correctAnswer: { es: "PIVOT!", en: "PIVOT!" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuántas categorías de toallas tiene Monica?",
      en: "How many categories of towels does Monica have?"
    },
    options: [
      { text: { es: "11", en: "11" }, isCorrect: true },
      { text: { es: "8", en: "8" }, isCorrect: false },
      { text: { es: "10", en: "10" }, isCorrect: false },
      { text: { es: "12", en: "12" }, isCorrect: false }
    ],
    correctAnswer: { es: "11", en: "11" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuál es el nombre del jefe de Rachel en Bloomingdale's?",
      en: "What is the name of Rachel's boss at Bloomingdale's?"
    },
    options: [
      { text: { es: "Joanna", en: "Joanna" }, isCorrect: true },
      { text: { es: "Julie", en: "Julie" }, isCorrect: false },
      { text: { es: "Jessica", en: "Jessica" }, isCorrect: false },
      { text: { es: "Jennifer", en: "Jennifer" }, isCorrect: false }
    ],
    correctAnswer: { es: "Joanna", en: "Joanna" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Qué profesión tiene el padre de Emily?",
      en: "What is Emily's father's profession?"
    },
    options: [
      { text: { es: "Empresario", en: "Businessman" }, isCorrect: false },
      { text: { es: "Arquitecto", en: "Architect" }, isCorrect: false },
      { text: { es: "Vendedor de coches usados", en: "Used car salesman" }, isCorrect: true },
      { text: { es: "Abogado", en: "Lawyer" }, isCorrect: false }
    ],
    correctAnswer: { es: "Vendedor de coches usados", en: "Used car salesman" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuántos divorcios tuvo Ross en toda la serie?",
      en: "How many divorces did Ross have throughout the series?"
    },
    options: [
      { text: { es: "3", en: "3" }, isCorrect: true },
      { text: { es: "2", en: "2" }, isCorrect: false },
      { text: { es: "4", en: "4" }, isCorrect: false },
      { text: { es: "1", en: "1" }, isCorrect: false }
    ],
    correctAnswer: { es: "3", en: "3" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Qué le regala Phoebe a Monica y Chandler para su boda?",
      en: "What does Phoebe give Monica and Chandler for their wedding?"
    },
    options: [
      { text: { es: "Una lámpara", en: "A lamp" }, isCorrect: false },
      { text: { es: "Una bicicleta", en: "A bicycle" }, isCorrect: false },
      { text: { es: "Un masaje", en: "A massage" }, isCorrect: true },
      { text: { es: "Una canción", en: "A song" }, isCorrect: false }
    ],
    correctAnswer: { es: "Un masaje", en: "A massage" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuál es el nombre de la hermana gemela de Ursula?",
      en: "What is the name of Ursula's twin sister?"
    },
    options: [
      { text: { es: "Phoebe", en: "Phoebe" }, isCorrect: true },
      { text: { es: "Regina", en: "Regina" }, isCorrect: false },
      { text: { es: "Leslie", en: "Leslie" }, isCorrect: false },
      { text: { es: "Erica", en: "Erica" }, isCorrect: false }
    ],
    correctAnswer: { es: "Phoebe", en: "Phoebe" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuántos años tiene Gunther enamorado de Rachel?",
      en: "How many years has Gunther been in love with Rachel?"
    },
    options: [
      { text: { es: "10 años", en: "10 years" }, isCorrect: true },
      { text: { es: "8 años", en: "8 years" }, isCorrect: false },
      { text: { es: "9 años", en: "9 years" }, isCorrect: false },
      { text: { es: "7 años", en: "7 years" }, isCorrect: false }
    ],
    correctAnswer: { es: "10 años", en: "10 years" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Cuál es el segundo nombre de Rachel?",
      en: "What is Rachel's middle name?"
    },
    options: [
      { text: { es: "Karen", en: "Karen" }, isCorrect: true },
      { text: { es: "Marie", en: "Marie" }, isCorrect: false },
      { text: { es: "Anne", en: "Anne" }, isCorrect: false },
      { text: { es: "Elizabeth", en: "Elizabeth" }, isCorrect: false }
    ],
    correctAnswer: { es: "Karen", en: "Karen" },
    difficulty: "hard",
    category: "Friends"
  },
  {
    question: {
      es: "¿Qué edad tiene Ross cuando pierde su virginidad?",
      en: "How old was Ross when he lost his virginity?"
    },
    options: [
      { text: { es: "17 años", en: "17 years old" }, isCorrect: true },
      { text: { es: "16 años", en: "16 years old" }, isCorrect: false },
      { text: { es: "18 años", en: "18 years old" }, isCorrect: false },
      { text: { es: "19 años", en: "19 years old" }, isCorrect: false }
    ],
    correctAnswer: { es: "17 años", en: "17 years old" },
    difficulty: "hard",
    category: "Friends"
  }
];

const addQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    console.log(`Agregando ${newHardQuestions.length} nuevas preguntas difíciles...\n`);

    for (const questionData of newHardQuestions) {
      const existingQuestion = await Question.findOne({
        'question.es': questionData.question.es
      });

      if (existingQuestion) {
        console.log(`⚠️  Ya existe: ${questionData.question.es}`);
      } else {
        const question = new Question(questionData);
        await question.save();
        console.log(`✅ Agregada: ${questionData.question.es}`);
      }
    }

    const totalHard = await Question.countDocuments({ difficulty: 'hard' });
    console.log(`\n📊 Total de preguntas difíciles en BD: ${totalHard}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addQuestions();
