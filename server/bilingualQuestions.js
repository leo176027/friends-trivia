// 100 Questions about Friends in Spanish and English
// Distribution: 60 easy, 20 medium, 20 hard
// Usage: node bilingual Questions.js

require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

const bilingualQuestions = [
  // EASY QUESTIONS (60)
  {
    question: {
      es: "¿Cuál es el nombre del bar donde se reúnen los personajes?",
      en: "What is the name of the coffee shop where the characters hang out?"
    },
    options: [
      {
        text: { es: "Central Perk", en: "Central Perk" },
        isCorrect: true
      },
      {
        text: { es: "The Ritz", en: "The Ritz" },
        isCorrect: false
      },
      {
        text: { es: "The Coffee Bean", en: "The Coffee Bean" },
        isCorrect: false
      },
      {
        text: { es: "Brew Haven", en: "Brew Haven" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Central Perk",
      en: "Central Perk"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama el mono de Ross?",
      en: "What is the name of Ross's monkey?"
    },
    options: [
      {
        text: { es: "Marcel", en: "Marcel" },
        isCorrect: true
      },
      {
        text: { es: "Charlie", en: "Charlie" },
        isCorrect: false
      },
      {
        text: { es: "George", en: "George" },
        isCorrect: false
      },
      {
        text: { es: "Bobby", en: "Bobby" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Marcel",
      en: "Marcel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿De qué color es el sofá de Central Perk?",
      en: "What color is the couch at Central Perk?"
    },
    options: [
      {
        text: { es: "Naranja", en: "Orange" },
        isCorrect: true
      },
      {
        text: { es: "Rojo", en: "Red" },
        isCorrect: false
      },
      {
        text: { es: "Verde", en: "Green" },
        isCorrect: false
      },
      {
        text: { es: "Azul", en: "Blue" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Naranja",
      en: "Orange"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué profesión tiene Joey?",
      en: "What is Joey's profession?"
    },
    options: [
      {
        text: { es: "Actor", en: "Actor" },
        isCorrect: true
      },
      {
        text: { es: "Chef", en: "Chef" },
        isCorrect: false
      },
      {
        text: { es: "Paleontólogo", en: "Paleontologist" },
        isCorrect: false
      },
      {
        text: { es: "Masajista", en: "Masseuse" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Actor",
      en: "Actor"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es el apellido de Rachel?",
      en: "What is Rachel's last name?"
    },
    options: [
      {
        text: { es: "Green", en: "Green" },
        isCorrect: true
      },
      {
        text: { es: "Brown", en: "Brown" },
        isCorrect: false
      },
      {
        text: { es: "White", en: "White" },
        isCorrect: false
      },
      {
        text: { es: "Black", en: "Black" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Green",
      en: "Green"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es la famosa canción de Phoebe?",
      en: "What is Phoebe's famous song?"
    },
    options: [
      {
        text: { es: "Smelly Cat", en: "Smelly Cat" },
        isCorrect: true
      },
      {
        text: { es: "Sticky Shoes", en: "Sticky Shoes" },
        isCorrect: false
      },
      {
        text: { es: "Crazy Underwear", en: "Crazy Underwear" },
        isCorrect: false
      },
      {
        text: { es: "Itchy Monkey", en: "Itchy Monkey" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Smelly Cat",
      en: "Smelly Cat"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama la hija de Ross y Rachel?",
      en: "What is the name of Ross and Rachel's daughter?"
    },
    options: [
      {
        text: { es: "Emma", en: "Emma" },
        isCorrect: true
      },
      {
        text: { es: "Emily", en: "Emily" },
        isCorrect: false
      },
      {
        text: { es: "Erica", en: "Erica" },
        isCorrect: false
      },
      {
        text: { es: "Elizabeth", en: "Elizabeth" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Emma",
      en: "Emma"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué profesión tiene Ross?",
      en: "What is Ross's profession?"
    },
    options: [
      {
        text: { es: "Paleontólogo", en: "Paleontologist" },
        isCorrect: true
      },
      {
        text: { es: "Chef", en: "Chef" },
        isCorrect: false
      },
      {
        text: { es: "Actor", en: "Actor" },
        isCorrect: false
      },
      {
        text: { es: "Masajista", en: "Masseuse" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Paleontólogo",
      en: "Paleontologist"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué profesión tiene Monica?",
      en: "What is Monica's profession?"
    },
    options: [
      {
        text: { es: "Chef", en: "Chef" },
        isCorrect: true
      },
      {
        text: { es: "Actriz", en: "Actress" },
        isCorrect: false
      },
      {
        text: { es: "Masajista", en: "Masseuse" },
        isCorrect: false
      },
      {
        text: { es: "Cantante", en: "Singer" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Chef",
      en: "Chef"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué profesión tiene Phoebe?",
      en: "What is Phoebe's profession?"
    },
    options: [
      {
        text: { es: "Masajista", en: "Masseuse" },
        isCorrect: true
      },
      {
        text: { es: "Chef", en: "Chef" },
        isCorrect: false
      },
      {
        text: { es: "Actriz", en: "Actress" },
        isCorrect: false
      },
      {
        text: { es: "Doctora", en: "Doctor" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Masajista",
      en: "Masseuse"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Con quién se casa Monica?",
      en: "Who does Monica marry?"
    },
    options: [
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Richard", en: "Richard" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Chandler",
      en: "Chandler"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Con quién se casa Phoebe?",
      en: "Who does Phoebe marry?"
    },
    options: [
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: true
      },
      {
        text: { es: "David", en: "David" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Gary", en: "Gary" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Mike",
      en: "Mike"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama el hijo de Ross y Carol?",
      en: "What is the name of Ross and Carol's son?"
    },
    options: [
      {
        text: { es: "Ben", en: "Ben" },
        isCorrect: true
      },
      {
        text: { es: "Jack", en: "Jack" },
        isCorrect: false
      },
      {
        text: { es: "Dylan", en: "Dylan" },
        isCorrect: false
      },
      {
        text: { es: "Cole", en: "Cole" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ben",
      en: "Ben"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué animal tiene Joey de mascota?",
      en: "What animal does Joey have as a pet?"
    },
    options: [
      {
        text: { es: "Un pato y un pollito", en: "A duck and a chick" },
        isCorrect: true
      },
      {
        text: { es: "Un gato", en: "A cat" },
        isCorrect: false
      },
      {
        text: { es: "Un perro", en: "A dog" },
        isCorrect: false
      },
      {
        text: { es: "Un conejo", en: "A rabbit" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Un pato y un pollito",
      en: "A duck and a chick"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿En qué ciudad se desarrolla Friends?",
      en: "In what city does Friends take place?"
    },
    options: [
      {
        text: { es: "Nueva York", en: "New York" },
        isCorrect: true
      },
      {
        text: { es: "Los Ángeles", en: "Los Angeles" },
        isCorrect: false
      },
      {
        text: { es: "Chicago", en: "Chicago" },
        isCorrect: false
      },
      {
        text: { es: "Boston", en: "Boston" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Nueva York",
      en: "New York"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué frase famosa dice Joey?",
      en: "What famous phrase does Joey say?"
    },
    options: [
      {
        text: { es: "How you doin'?", en: "How you doin'?" },
        isCorrect: true
      },
      {
        text: { es: "We were on a break!", en: "We were on a break!" },
        isCorrect: false
      },
      {
        text: { es: "Could I BE any...?", en: "Could I BE any...?" },
        isCorrect: false
      },
      {
        text: { es: "Oh. My. God.", en: "Oh. My. God." },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "How you doin'?",
      en: "How you doin'?"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién es el hermano de Monica?",
      en: "Who is Monica's brother?"
    },
    options: [
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: true
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross",
      en: "Ross"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Dónde trabaja Rachel durante la mayor parte de la serie?",
      en: "Where does Rachel work for most of the series?"
    },
    options: [
      {
        text: { es: "En moda", en: "In fashion" },
        isCorrect: true
      },
      {
        text: { es: "En un hospital", en: "In a hospital" },
        isCorrect: false
      },
      {
        text: { es: "En una escuela", en: "In a school" },
        isCorrect: false
      },
      {
        text: { es: "En un banco", en: "In a bank" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "En moda",
      en: "In fashion"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es la obsesión de Monica?",
      en: "What is Monica's obsession?"
    },
    options: [
      {
        text: { es: "Limpieza y orden", en: "Cleaning and order" },
        isCorrect: true
      },
      {
        text: { es: "Dinosaurios", en: "Dinosaurs" },
        isCorrect: false
      },
      {
        text: { es: "Actuar", en: "Acting" },
        isCorrect: false
      },
      {
        text: { es: "Cantar", en: "Singing" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Limpieza y orden",
      en: "Cleaning and order"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué instrumento toca Phoebe?",
      en: "What instrument does Phoebe play?"
    },
    options: [
      {
        text: { es: "Guitarra", en: "Guitar" },
        isCorrect: true
      },
      {
        text: { es: "Piano", en: "Piano" },
        isCorrect: false
      },
      {
        text: { es: "Violín", en: "Violin" },
        isCorrect: false
      },
      {
        text: { es: "Batería", en: "Drums" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Guitarra",
      en: "Guitar"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuántos hermanos tiene Joey?",
      en: "How many siblings does Joey have?"
    },
    options: [
      {
        text: { es: "7 hermanas", en: "7 sisters" },
        isCorrect: true
      },
      {
        text: { es: "3 hermanas", en: "3 sisters" },
        isCorrect: false
      },
      {
        text: { es: "5 hermanas", en: "5 sisters" },
        isCorrect: false
      },
      {
        text: { es: "No tiene hermanas", en: "No sisters" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "7 hermanas",
      en: "7 sisters"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué tipo de doctor es Ross?",
      en: "What type of doctor is Ross?"
    },
    options: [
      {
        text: { es: "Paleontólogo", en: "Paleontologist" },
        isCorrect: true
      },
      {
        text: { es: "Médico", en: "Medical doctor" },
        isCorrect: false
      },
      {
        text: { es: "Dentista", en: "Dentist" },
        isCorrect: false
      },
      {
        text: { es: "Veterinario", en: "Veterinarian" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Paleontólogo",
      en: "Paleontologist"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Dónde trabaja Ross?",
      en: "Where does Ross work?"
    },
    options: [
      {
        text: { es: "En un museo", en: "At a museum" },
        isCorrect: true
      },
      {
        text: { es: "En un hospital", en: "At a hospital" },
        isCorrect: false
      },
      {
        text: { es: "En una tienda", en: "At a store" },
        isCorrect: false
      },
      {
        text: { es: "En un banco", en: "At a bank" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "En un museo",
      en: "At a museum"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién fue la compañera de cuarto original de Monica?",
      en: "Who was Monica's original roommate?"
    },
    options: [
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: true
      },
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Janice", en: "Janice" },
        isCorrect: false
      },
      {
        text: { es: "Julie", en: "Julie" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Phoebe",
      en: "Phoebe"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿De qué huye Rachel en el primer episodio?",
      en: "What does Rachel run away from in the first episode?"
    },
    options: [
      {
        text: { es: "De su boda", en: "From her wedding" },
        isCorrect: true
      },
      {
        text: { es: "De su trabajo", en: "From her job" },
        isCorrect: false
      },
      {
        text: { es: "De su casa", en: "From her house" },
        isCorrect: false
      },
      {
        text: { es: "De la universidad", en: "From college" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "De su boda",
      en: "From her wedding"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién vive al cruzar el pasillo de Monica?",
      en: "Who lives across the hall from Monica?"
    },
    options: [
      {
        text: { es: "Joey y Chandler", en: "Joey and Chandler" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      },
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Joey y Chandler",
      en: "Joey and Chandler"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama el novio de Janice?",
      en: "What is Janice's catchphrase?"
    },
    options: [
      {
        text: { es: "Oh. My. God.", en: "Oh. My. God." },
        isCorrect: true
      },
      {
        text: { es: "How you doin'?", en: "How you doin'?" },
        isCorrect: false
      },
      {
        text: { es: "We were on a break!", en: "We were on a break!" },
        isCorrect: false
      },
      {
        text: { es: "Pivot!", en: "Pivot!" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Oh. My. God.",
      en: "Oh. My. God."
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué comida no comparte Joey?",
      en: "What food doesn't Joey share?"
    },
    options: [
      {
        text: { es: "Comida", en: "Food" },
        isCorrect: true
      },
      {
        text: { es: "Bebidas", en: "Drinks" },
        isCorrect: false
      },
      {
        text: { es: "Postres", en: "Desserts" },
        isCorrect: false
      },
      {
        text: { es: "Pizza", en: "Pizza" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Comida",
      en: "Food"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién dice 'We were on a break!'?",
      en: "Who says 'We were on a break!'?"
    },
    options: [
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: true
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross",
      en: "Ross"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Dónde se conocieron Monica y Chandler?",
      en: "Where did Monica and Chandler meet?"
    },
    options: [
      {
        text: { es: "En Acción de Gracias", en: "At Thanksgiving" },
        isCorrect: true
      },
      {
        text: { es: "En Central Perk", en: "At Central Perk" },
        isCorrect: false
      },
      {
        text: { es: "En una boda", en: "At a wedding" },
        isCorrect: false
      },
      {
        text: { es: "En el trabajo", en: "At work" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "En Acción de Gracias",
      en: "At Thanksgiving"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es el apellido de Joey?",
      en: "What is Joey's last name?"
    },
    options: [
      {
        text: { es: "Tribbiani", en: "Tribbiani" },
        isCorrect: true
      },
      {
        text: { es: "Geller", en: "Geller" },
        isCorrect: false
      },
      {
        text: { es: "Bing", en: "Bing" },
        isCorrect: false
      },
      {
        text: { es: "Buffay", en: "Buffay" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Tribbiani",
      en: "Tribbiani"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es el apellido de Phoebe?",
      en: "What is Phoebe's last name?"
    },
    options: [
      {
        text: { es: "Buffay", en: "Buffay" },
        isCorrect: true
      },
      {
        text: { es: "Green", en: "Green" },
        isCorrect: false
      },
      {
        text: { es: "Geller", en: "Geller" },
        isCorrect: false
      },
      {
        text: { es: "Bing", en: "Bing" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Buffay",
      en: "Buffay"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuál es el apellido de Chandler?",
      en: "What is Chandler's last name?"
    },
    options: [
      {
        text: { es: "Bing", en: "Bing" },
        isCorrect: true
      },
      {
        text: { es: "Tribbiani", en: "Tribbiani" },
        isCorrect: false
      },
      {
        text: { es: "Geller", en: "Geller" },
        isCorrect: false
      },
      {
        text: { es: "Green", en: "Green" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Bing",
      en: "Bing"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién trabaja como barista en Central Perk?",
      en: "Who works as a barista at Central Perk?"
    },
    options: [
      {
        text: { es: "Gunther", en: "Gunther" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Gunther",
      en: "Gunther"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿De quién está enamorado Gunther?",
      en: "Who is Gunther in love with?"
    },
    options: [
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      },
      {
        text: { es: "Janice", en: "Janice" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Rachel",
      en: "Rachel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué ciudad no es Nueva York en la serie?",
      en: "Which city is visited in the series besides New York?"
    },
    options: [
      {
        text: { es: "Londres", en: "London" },
        isCorrect: true
      },
      {
        text: { es: "París", en: "Paris" },
        isCorrect: false
      },
      {
        text: { es: "Madrid", en: "Madrid" },
        isCorrect: false
      },
      {
        text: { es: "Roma", en: "Rome" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Londres",
      en: "London"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién es el mejor amigo de Chandler?",
      en: "Who is Chandler's best friend?"
    },
    options: [
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      },
      {
        text: { es: "Richard", en: "Richard" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Joey",
      en: "Joey"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿A qué se dedica Rachel al final de la serie?",
      en: "What does Rachel do at the end of the series?"
    },
    options: [
      {
        text: { es: "Trabaja en moda", en: "Works in fashion" },
        isCorrect: true
      },
      {
        text: { es: "Es chef", en: "Is a chef" },
        isCorrect: false
      },
      {
        text: { es: "Es actriz", en: "Is an actress" },
        isCorrect: false
      },
      {
        text: { es: "Es cantante", en: "Is a singer" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Trabaja en moda",
      en: "Works in fashion"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién adopta gemelos?",
      en: "Who adopts twins?"
    },
    options: [
      {
        text: { es: "Monica y Chandler", en: "Monica and Chandler" },
        isCorrect: true
      },
      {
        text: { es: "Ross y Rachel", en: "Ross and Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe y Mike", en: "Phoebe and Mike" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Monica y Chandler",
      en: "Monica and Chandler"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién tiene una hermana gemela?",
      en: "Who has a twin sister?"
    },
    options: [
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Phoebe",
      en: "Phoebe"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama la hermana gemela de Phoebe?",
      en: "What is Phoebe's twin sister's name?"
    },
    options: [
      {
        text: { es: "Ursula", en: "Ursula" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Erica", en: "Erica" },
        isCorrect: false
      },
      {
        text: { es: "Julie", en: "Julie" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ursula",
      en: "Ursula"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién se mudó varias veces de apartamento?",
      en: "Who moved apartments several times?"
    },
    options: [
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Rachel",
      en: "Rachel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién dice 'Could I BE any more...?'",
      en: "Who says 'Could I BE any more...?'"
    },
    options: [
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: true
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Chandler",
      en: "Chandler"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuántas temporadas tiene Friends?",
      en: "How many seasons does Friends have?"
    },
    options: [
      {
        text: { es: "10", en: "10" },
        isCorrect: true
      },
      {
        text: { es: "8", en: "8" },
        isCorrect: false
      },
      {
        text: { es: "12", en: "12" },
        isCorrect: false
      },
      {
        text: { es: "9", en: "9" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "10",
      en: "10"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién se besó con todos los amigos?",
      en: "Who kissed all the friends?"
    },
    options: [
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      },
      {
        text: { es: "Janice", en: "Janice" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Rachel",
      en: "Rachel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué bebida toman frecuentemente en Central Perk?",
      en: "What drink do they frequently have at Central Perk?"
    },
    options: [
      {
        text: { es: "Café", en: "Coffee" },
        isCorrect: true
      },
      {
        text: { es: "Té", en: "Tea" },
        isCorrect: false
      },
      {
        text: { es: "Cerveza", en: "Beer" },
        isCorrect: false
      },
      {
        text: { es: "Vino", en: "Wine" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Café",
      en: "Coffee"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿En qué trabaja Chandler después de cambiar de carrera?",
      en: "What does Chandler do after changing careers?"
    },
    options: [
      {
        text: { es: "Publicidad", en: "Advertising" },
        isCorrect: true
      },
      {
        text: { es: "Cocina", en: "Cooking" },
        isCorrect: false
      },
      {
        text: { es: "Actuación", en: "Acting" },
        isCorrect: false
      },
      {
        text: { es: "Música", en: "Music" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Publicidad",
      en: "Advertising"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué actor interpreta a Joey?",
      en: "What actor plays Joey?"
    },
    options: [
      {
        text: { es: "Matt LeBlanc", en: "Matt LeBlanc" },
        isCorrect: true
      },
      {
        text: { es: "Matthew Perry", en: "Matthew Perry" },
        isCorrect: false
      },
      {
        text: { es: "David Schwimmer", en: "David Schwimmer" },
        isCorrect: false
      },
      {
        text: { es: "Matt Damon", en: "Matt Damon" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Matt LeBlanc",
      en: "Matt LeBlanc"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién canta el tema de apertura de Friends?",
      en: "Who sings the Friends opening theme?"
    },
    options: [
      {
        text: { es: "The Rembrandts", en: "The Rembrandts" },
        isCorrect: true
      },
      {
        text: { es: "The Beatles", en: "The Beatles" },
        isCorrect: false
      },
      {
        text: { es: "Queen", en: "Queen" },
        isCorrect: false
      },
      {
        text: { es: "ABBA", en: "ABBA" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "The Rembrandts",
      en: "The Rembrandts"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cómo se llama el tema de apertura de Friends?",
      en: "What is the name of the Friends opening theme?"
    },
    options: [
      {
        text: { es: "I'll Be There for You", en: "I'll Be There for You" },
        isCorrect: true
      },
      {
        text: { es: "We Are Friends", en: "We Are Friends" },
        isCorrect: false
      },
      {
        text: { es: "Together Forever", en: "Together Forever" },
        isCorrect: false
      },
      {
        text: { es: "Best Friends", en: "Best Friends" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "I'll Be There for You",
      en: "I'll Be There for You"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién es el padre de Emma?",
      en: "Who is Emma's father?"
    },
    options: [
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: true
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross",
      en: "Ross"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién tiene miedo de los pájaros?",
      en: "Who is afraid of birds?"
    },
    options: [
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: true
      },
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Monica",
      en: "Monica"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué hacen Phoebe como trabajo de masajista?",
      en: "What does Phoebe do as a masseuse?"
    },
    options: [
      {
        text: { es: "Masajes", en: "Massages" },
        isCorrect: true
      },
      {
        text: { es: "Yoga", en: "Yoga" },
        isCorrect: false
      },
      {
        text: { es: "Cocina", en: "Cooking" },
        isCorrect: false
      },
      {
        text: { es: "Canta", en: "Singing" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Masajes",
      en: "Massages"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Dónde se casan Monica y Chandler?",
      en: "Where do Monica and Chandler get married?"
    },
    options: [
      {
        text: { es: "En Nueva York", en: "In New York" },
        isCorrect: true
      },
      {
        text: { es: "En Londres", en: "In London" },
        isCorrect: false
      },
      {
        text: { es: "En Las Vegas", en: "In Las Vegas" },
        isCorrect: false
      },
      {
        text: { es: "En París", en: "In Paris" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "En Nueva York",
      en: "In New York"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién se casa borracho en Las Vegas?",
      en: "Who gets married drunk in Las Vegas?"
    },
    options: [
      {
        text: { es: "Ross y Rachel", en: "Ross and Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica y Chandler", en: "Monica and Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe y Mike", en: "Phoebe and Mike" },
        isCorrect: false
      },
      {
        text: { es: "Joey y Janice", en: "Joey and Janice" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross y Rachel",
      en: "Ross and Rachel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué frase dice Ross cuando mueve el sofá?",
      en: "What phrase does Ross say when moving the couch?"
    },
    options: [
      {
        text: { es: "Pivot!", en: "Pivot!" },
        isCorrect: true
      },
      {
        text: { es: "Push!", en: "Push!" },
        isCorrect: false
      },
      {
        text: { es: "Pull!", en: "Pull!" },
        isCorrect: false
      },
      {
        text: { es: "Lift!", en: "Lift!" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Pivot!",
      en: "Pivot!"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién actúa en Days of Our Lives?",
      en: "Who acts in Days of Our Lives?"
    },
    options: [
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: true
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Joey",
      en: "Joey"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué personaje interpreta Joey en Days of Our Lives?",
      en: "What character does Joey play in Days of Our Lives?"
    },
    options: [
      {
        text: { es: "Dr. Drake Ramoray", en: "Dr. Drake Ramoray" },
        isCorrect: true
      },
      {
        text: { es: "Dr. Ross Geller", en: "Dr. Ross Geller" },
        isCorrect: false
      },
      {
        text: { es: "Joey Tribbiani", en: "Joey Tribbiani" },
        isCorrect: false
      },
      {
        text: { es: "Dr. House", en: "Dr. House" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Dr. Drake Ramoray",
      en: "Dr. Drake Ramoray"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Qué le regala Ross a Rachel en su cumpleaños?",
      en: "What does Ross give Rachel for her birthday?"
    },
    options: [
      {
        text: { es: "Un broche", en: "A brooch" },
        isCorrect: true
      },
      {
        text: { es: "Un collar", en: "A necklace" },
        isCorrect: false
      },
      {
        text: { es: "Un anillo", en: "A ring" },
        isCorrect: false
      },
      {
        text: { es: "Una pulsera", en: "A bracelet" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Un broche",
      en: "A brooch"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién lleva a cabo los bebés de Phoebe?",
      en: "Who carries Phoebe's babies?"
    },
    options: [
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Carol", en: "Carol" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Phoebe",
      en: "Phoebe"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Para quién lleva Phoebe los trillizos?",
      en: "For whom does Phoebe carry the triplets?"
    },
    options: [
      {
        text: { es: "Su hermano Frank", en: "Her brother Frank" },
        isCorrect: true
      },
      {
        text: { es: "Su hermana Ursula", en: "Her sister Ursula" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Su hermano Frank",
      en: "Her brother Frank"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Cuántos bebés tiene Phoebe para su hermano?",
      en: "How many babies does Phoebe have for her brother?"
    },
    options: [
      {
        text: { es: "3 (trillizos)", en: "3 (triplets)" },
        isCorrect: true
      },
      {
        text: { es: "2 (gemelos)", en: "2 (twins)" },
        isCorrect: false
      },
      {
        text: { es: "1", en: "1" },
        isCorrect: false
      },
      {
        text: { es: "4", en: "4" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "3 (trillizos)",
      en: "3 (triplets)"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién tiene una hija llamada Emma?",
      en: "Who has a daughter named Emma?"
    },
    options: [
      {
        text: { es: "Ross y Rachel", en: "Ross and Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica y Chandler", en: "Monica and Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe y Mike", en: "Phoebe and Mike" },
        isCorrect: false
      },
      {
        text: { es: "Ross y Carol", en: "Ross and Carol" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross y Rachel",
      en: "Ross and Rachel"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién tiene un hijo llamado Ben?",
      en: "Who has a son named Ben?"
    },
    options: [
      {
        text: { es: "Ross y Carol", en: "Ross and Carol" },
        isCorrect: true
      },
      {
        text: { es: "Ross y Rachel", en: "Ross and Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Monica y Chandler", en: "Monica and Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe y Mike", en: "Phoebe and Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross y Carol",
      en: "Ross and Carol"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿En qué año terminó Friends?",
      en: "What year did Friends end?"
    },
    options: [
      {
        text: { es: "2004", en: "2004" },
        isCorrect: true
      },
      {
        text: { es: "2005", en: "2005" },
        isCorrect: false
      },
      {
        text: { es: "2003", en: "2003" },
        isCorrect: false
      },
      {
        text: { es: "2006", en: "2006" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "2004",
      en: "2004"
    },
    difficulty: "easy",
    points: 1
  },
  {
    question: {
      es: "¿Quién se va a París al final de la serie?",
      en: "Who goes to Paris at the end of the series?"
    },
    options: [
      {
        text: { es: "Rachel (pero regresa)", en: "Rachel (but comes back)" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Phoebe", en: "Phoebe" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Rachel (pero regresa)",
      en: "Rachel (but comes back)"
    },
    difficulty: "easy",
    points: 1
  },

  // MEDIUM QUESTIONS (20)
  {
    question: {
      es: "¿Cuántas veces se divorcia Ross?",
      en: "How many times does Ross get divorced?"
    },
    options: [
      {
        text: { es: "3", en: "3" },
        isCorrect: true
      },
      {
        text: { es: "2", en: "2" },
        isCorrect: false
      },
      {
        text: { es: "4", en: "4" },
        isCorrect: false
      },
      {
        text: { es: "1", en: "1" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "3",
      en: "3"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Cuál es el trabajo de Chandler durante la mayoría de la serie?",
      en: "What is Chandler's job for most of the series?"
    },
    options: [
      {
        text: { es: "Procesamiento de Datos", en: "Data Processing" },
        isCorrect: true
      },
      {
        text: { es: "Estadístico", en: "Statistician" },
        isCorrect: false
      },
      {
        text: { es: "Abogado", en: "Lawyer" },
        isCorrect: false
      },
      {
        text: { es: "Contable", en: "Accountant" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Procesamiento de Datos",
      en: "Data Processing"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Cómo se llama la primera esposa de Ross?",
      en: "What is the name of Ross's first wife?"
    },
    options: [
      {
        text: { es: "Carol", en: "Carol" },
        isCorrect: true
      },
      {
        text: { es: "Emily", en: "Emily" },
        isCorrect: false
      },
      {
        text: { es: "Julie", en: "Julie" },
        isCorrect: false
      },
      {
        text: { es: "Charlie", en: "Charlie" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Carol",
      en: "Carol"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué nombre dice Ross en vez de Emily en la boda?",
      en: "What name does Ross say instead of Emily at the wedding?"
    },
    options: [
      {
        text: { es: "Rachel", en: "Rachel" },
        isCorrect: true
      },
      {
        text: { es: "Monica", en: "Monica" },
        isCorrect: false
      },
      {
        text: { es: "Julie", en: "Julie" },
        isCorrect: false
      },
      {
        text: { es: "Carol", en: "Carol" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Rachel",
      en: "Rachel"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué juego juegan los amigos en Acción de Gracias?",
      en: "What game do the friends play on Thanksgiving?"
    },
    options: [
      {
        text: { es: "Fútbol americano", en: "Football" },
        isCorrect: true
      },
      {
        text: { es: "Baloncesto", en: "Basketball" },
        isCorrect: false
      },
      {
        text: { es: "Béisbol", en: "Baseball" },
        isCorrect: false
      },
      {
        text: { es: "Voleibol", en: "Volleyball" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Fútbol americano",
      en: "Football"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué le pasó a Monica en la cabeza durante el fútbol de Acción de Gracias?",
      en: "What happened to Monica's head during Thanksgiving football?"
    },
    options: [
      {
        text: { es: "Se cortó la oreja", en: "She cut her ear" },
        isCorrect: true
      },
      {
        text: { es: "Se rompió la nariz", en: "She broke her nose" },
        isCorrect: false
      },
      {
        text: { es: "Se golpeó la cabeza", en: "She hit her head" },
        isCorrect: false
      },
      {
        text: { es: "Se torció el tobillo", en: "She sprained her ankle" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Se cortó la oreja",
      en: "She cut her ear"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Quién de los amigos besó a Rachel primero?",
      en: "Which friend kissed Rachel first?"
    },
    options: [
      {
        text: { es: "Chandler (en la universidad)", en: "Chandler (in college)" },
        isCorrect: true
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      },
      {
        text: { es: "Joey", en: "Joey" },
        isCorrect: false
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Chandler (en la universidad)",
      en: "Chandler (in college)"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Dónde se besan Monica y Chandler por primera vez?",
      en: "Where do Monica and Chandler first kiss?"
    },
    options: [
      {
        text: { es: "En Londres", en: "In London" },
        isCorrect: true
      },
      {
        text: { es: "En Nueva York", en: "In New York" },
        isCorrect: false
      },
      {
        text: { es: "En Las Vegas", en: "In Las Vegas" },
        isCorrect: false
      },
      {
        text: { es: "En París", en: "In Paris" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "En Londres",
      en: "In London"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Por qué viajan a Londres?",
      en: "Why do they travel to London?"
    },
    options: [
      {
        text: { es: "Boda de Ross", en: "Ross's wedding" },
        isCorrect: true
      },
      {
        text: { es: "Trabajo de Chandler", en: "Chandler's job" },
        isCorrect: false
      },
      {
        text: { es: "Vacaciones", en: "Vacation" },
        isCorrect: false
      },
      {
        text: { es: "Conferencia de Ross", en: "Ross's conference" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Boda de Ross",
      en: "Ross's wedding"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué hace Ross para vivir después de ser despedido del museo?",
      en: "What does Ross do for a living after being fired from the museum?"
    },
    options: [
      {
        text: { es: "Profesor universitario", en: "College professor" },
        isCorrect: true
      },
      {
        text: { es: "Escritor", en: "Writer" },
        isCorrect: false
      },
      {
        text: { es: "Consultor", en: "Consultant" },
        isCorrect: false
      },
      {
        text: { es: "Actor", en: "Actor" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Profesor universitario",
      en: "College professor"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Cómo se llama la novia de Ross que es paleontóloga?",
      en: "What is the name of Ross's girlfriend who is a paleontologist?"
    },
    options: [
      {
        text: { es: "Charlie", en: "Charlie" },
        isCorrect: true
      },
      {
        text: { es: "Julie", en: "Julie" },
        isCorrect: false
      },
      {
        text: { es: "Emily", en: "Emily" },
        isCorrect: false
      },
      {
        text: { es: "Carol", en: "Carol" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Charlie",
      en: "Charlie"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué postre famoso hace Rachel que sale mal?",
      en: "What famous dessert does Rachel make that goes wrong?"
    },
    options: [
      {
        text: { es: "Trifle con carne", en: "Trifle with beef" },
        isCorrect: true
      },
      {
        text: { es: "Pastel de chocolate", en: "Chocolate cake" },
        isCorrect: false
      },
      {
        text: { es: "Cheesecake", en: "Cheesecake" },
        isCorrect: false
      },
      {
        text: { es: "Tarta de manzana", en: "Apple pie" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Trifle con carne",
      en: "Trifle with beef"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué juego inventan Chandler y Ross cuando eran jóvenes?",
      en: "What game did Chandler and Ross invent when they were young?"
    },
    options: [
      {
        text: { es: "Bamboozled", en: "Bamboozled" },
        isCorrect: true
      },
      {
        text: { es: "Fireball", en: "Fireball" },
        isCorrect: false
      },
      {
        text: { es: "Bamboozle", en: "Bamboozle" },
        isCorrect: false
      },
      {
        text: { es: "Quiz Master", en: "Quiz Master" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Bamboozled",
      en: "Bamboozled"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué apuesta pierden las chicas contra los chicos?",
      en: "What bet do the girls lose against the guys?"
    },
    options: [
      {
        text: { es: "El apartamento", en: "The apartment" },
        isCorrect: true
      },
      {
        text: { es: "Dinero", en: "Money" },
        isCorrect: false
      },
      {
        text: { es: "Un viaje", en: "A trip" },
        isCorrect: false
      },
      {
        text: { es: "Un auto", en: "A car" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "El apartamento",
      en: "The apartment"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué estaba haciendo Monica cuando Chandler la vio por primera vez?",
      en: "What was Monica doing when Chandler first saw her?"
    },
    options: [
      {
        text: { es: "Bailando con un pavo en la cabeza", en: "Dancing with a turkey on her head" },
        isCorrect: true
      },
      {
        text: { es: "Cocinando", en: "Cooking" },
        isCorrect: false
      },
      {
        text: { es: "Limpiando", en: "Cleaning" },
        isCorrect: false
      },
      {
        text: { es: "Cantando", en: "Singing" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Bailando con un pavo en la cabeza",
      en: "Dancing with a turkey on her head"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Quién le propone matrimonio a Monica primero?",
      en: "Who proposes to Monica first?"
    },
    options: [
      {
        text: { es: "Richard", en: "Richard" },
        isCorrect: true
      },
      {
        text: { es: "Chandler", en: "Chandler" },
        isCorrect: false
      },
      {
        text: { es: "Pete", en: "Pete" },
        isCorrect: false
      },
      {
        text: { es: "Ross", en: "Ross" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Richard",
      en: "Richard"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué le pasa al dedo de Chandler?",
      en: "What happens to Chandler's toe?"
    },
    options: [
      {
        text: { es: "Monica se lo corta", en: "Monica cuts it off" },
        isCorrect: true
      },
      {
        text: { es: "Se lo rompe", en: "He breaks it" },
        isCorrect: false
      },
      {
        text: { es: "Se lo quema", en: "He burns it" },
        isCorrect: false
      },
      {
        text: { es: "Se lo congela", en: "He freezes it" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Monica se lo corta",
      en: "Monica cuts it off"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué hace Phoebe antes de ser masajista?",
      en: "What did Phoebe do before being a masseuse?"
    },
    options: [
      {
        text: { es: "Vivía en las calles", en: "Lived on the streets" },
        isCorrect: true
      },
      {
        text: { es: "Cantante", en: "Singer" },
        isCorrect: false
      },
      {
        text: { es: "Actriz", en: "Actress" },
        isCorrect: false
      },
      {
        text: { es: "Chef", en: "Chef" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Vivía en las calles",
      en: "Lived on the streets"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué hace Joey cuando está nervioso?",
      en: "What does Joey do when he's nervous?"
    },
    options: [
      {
        text: { es: "Come", en: "Eats" },
        isCorrect: true
      },
      {
        text: { es: "Canta", en: "Sings" },
        isCorrect: false
      },
      {
        text: { es: "Baila", en: "Dances" },
        isCorrect: false
      },
      {
        text: { es: "Duerme", en: "Sleeps" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Come",
      en: "Eats"
    },
    difficulty: "medium",
    points: 2
  },
  {
    question: {
      es: "¿Qué regalo le da Joey a Chandler cuando se muda?",
      en: "What gift does Joey give Chandler when he moves out?"
    },
    options: [
      {
        text: { es: "Un pollito y un pato de peluche", en: "A stuffed chick and duck" },
        isCorrect: true
      },
      {
        text: { es: "Una foto", en: "A picture" },
        isCorrect: false
      },
      {
        text: { es: "Un reloj", en: "A watch" },
        isCorrect: false
      },
      {
        text: { es: "Una lámpara", en: "A lamp" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Un pollito y un pato de peluche",
      en: "A stuffed chick and duck"
    },
    difficulty: "medium",
    points: 2
  },

  // HARD QUESTIONS (20)
  {
    question: {
      es: "¿Cuáles son los nombres de los gemelos adoptados por Monica y Chandler?",
      en: "What are the names of the twins adopted by Monica and Chandler?"
    },
    options: [
      {
        text: { es: "Jack y Erica", en: "Jack and Erica" },
        isCorrect: true
      },
      {
        text: { es: "Ben y Emma", en: "Ben and Emma" },
        isCorrect: false
      },
      {
        text: { es: "Ross y Rachel", en: "Ross and Rachel" },
        isCorrect: false
      },
      {
        text: { es: "Mike y Phoebe", en: "Mike and Phoebe" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Jack y Erica",
      en: "Jack and Erica"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre completo del alter ego de Phoebe?",
      en: "What is Phoebe's alter ego's full name?"
    },
    options: [
      {
        text: { es: "Regina Phalange", en: "Regina Phalange" },
        isCorrect: true
      },
      {
        text: { es: "Erica Bing", en: "Erica Bing" },
        isCorrect: false
      },
      {
        text: { es: "Julie Graff", en: "Julie Graff" },
        isCorrect: false
      },
      {
        text: { es: "Rachel West", en: "Rachel West" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Regina Phalange",
      en: "Regina Phalange"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el segundo nombre de Chandler?",
      en: "What is Chandler's middle name?"
    },
    options: [
      {
        text: { es: "Muriel", en: "Muriel" },
        isCorrect: true
      },
      {
        text: { es: "Michael", en: "Michael" },
        isCorrect: false
      },
      {
        text: { es: "Matthew", en: "Matthew" },
        isCorrect: false
      },
      {
        text: { es: "Martin", en: "Martin" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Muriel",
      en: "Muriel"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre completo de Ross?",
      en: "What is Ross's full name?"
    },
    options: [
      {
        text: { es: "Ross Eustace Geller", en: "Ross Eustace Geller" },
        isCorrect: true
      },
      {
        text: { es: "Ross Edward Geller", en: "Ross Edward Geller" },
        isCorrect: false
      },
      {
        text: { es: "Ross Ernest Geller", en: "Ross Ernest Geller" },
        isCorrect: false
      },
      {
        text: { es: "Ross Ethan Geller", en: "Ross Ethan Geller" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Ross Eustace Geller",
      en: "Ross Eustace Geller"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuántos episodios tiene Friends en total?",
      en: "How many episodes does Friends have in total?"
    },
    options: [
      {
        text: { es: "236", en: "236" },
        isCorrect: true
      },
      {
        text: { es: "240", en: "240" },
        isCorrect: false
      },
      {
        text: { es: "220", en: "220" },
        isCorrect: false
      },
      {
        text: { es: "250", en: "250" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "236",
      en: "236"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Qué marca de bolso le roba a Rachel en el primer episodio?",
      en: "What handbag brand does Rachel have in the first episode?"
    },
    options: [
      {
        text: { es: "Louis Vuitton", en: "Louis Vuitton" },
        isCorrect: true
      },
      {
        text: { es: "Gucci", en: "Gucci" },
        isCorrect: false
      },
      {
        text: { es: "Prada", en: "Prada" },
        isCorrect: false
      },
      {
        text: { es: "Chanel", en: "Chanel" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Louis Vuitton",
      en: "Louis Vuitton"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre del novio que deja Rachel en el altar?",
      en: "What is the name of the fiancé Rachel leaves at the altar?"
    },
    options: [
      {
        text: { es: "Barry Farber", en: "Barry Farber" },
        isCorrect: true
      },
      {
        text: { es: "Barry White", en: "Barry White" },
        isCorrect: false
      },
      {
        text: { es: "Barry Allen", en: "Barry Allen" },
        isCorrect: false
      },
      {
        text: { es: "Barry Sanders", en: "Barry Sanders" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Barry Farber",
      en: "Barry Farber"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cómo se llama la compañera de Carol?",
      en: "What is Carol's partner's name?"
    },
    options: [
      {
        text: { es: "Susan", en: "Susan" },
        isCorrect: true
      },
      {
        text: { es: "Sandra", en: "Sandra" },
        isCorrect: false
      },
      {
        text: { es: "Sarah", en: "Sarah" },
        isCorrect: false
      },
      {
        text: { es: "Samantha", en: "Samantha" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Susan",
      en: "Susan"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el apodo de Monica en la secundaria?",
      en: "What was Monica's nickname in high school?"
    },
    options: [
      {
        text: { es: "Big Fat Goalie", en: "Big Fat Goalie" },
        isCorrect: true
      },
      {
        text: { es: "Fat Monica", en: "Fat Monica" },
        isCorrect: false
      },
      {
        text: { es: "Big Monica", en: "Big Monica" },
        isCorrect: false
      },
      {
        text: { es: "Goalie Girl", en: "Goalie Girl" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Big Fat Goalie",
      en: "Big Fat Goalie"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuánto tiempo duran Ross y Emily casados?",
      en: "How long are Ross and Emily married?"
    },
    options: [
      {
        text: { es: "Menos de un día", en: "Less than one day" },
        isCorrect: true
      },
      {
        text: { es: "Una semana", en: "One week" },
        isCorrect: false
      },
      {
        text: { es: "Un mes", en: "One month" },
        isCorrect: false
      },
      {
        text: { es: "Tres meses", en: "Three months" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Menos de un día",
      en: "Less than one day"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Qué estudió Ross en la universidad?",
      en: "What did Ross study in college?"
    },
    options: [
      {
        text: { es: "Paleontología", en: "Paleontology" },
        isCorrect: true
      },
      {
        text: { es: "Biología", en: "Biology" },
        isCorrect: false
      },
      {
        text: { es: "Arqueología", en: "Archaeology" },
        isCorrect: false
      },
      {
        text: { es: "Geología", en: "Geology" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Paleontología",
      en: "Paleontology"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿En qué edificio viven Monica y Rachel?",
      en: "What building do Monica and Rachel live in?"
    },
    options: [
      {
        text: { es: "Apartamento 20", en: "Apartment 20" },
        isCorrect: true
      },
      {
        text: { es: "Apartamento 10", en: "Apartment 10" },
        isCorrect: false
      },
      {
        text: { es: "Apartamento 15", en: "Apartment 15" },
        isCorrect: false
      },
      {
        text: { es: "Apartamento 25", en: "Apartment 25" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Apartamento 20",
      en: "Apartment 20"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre real de la actriz que interpreta a Rachel?",
      en: "What is the real name of the actress who plays Rachel?"
    },
    options: [
      {
        text: { es: "Jennifer Aniston", en: "Jennifer Aniston" },
        isCorrect: true
      },
      {
        text: { es: "Courteney Cox", en: "Courteney Cox" },
        isCorrect: false
      },
      {
        text: { es: "Lisa Kudrow", en: "Lisa Kudrow" },
        isCorrect: false
      },
      {
        text: { es: "Jennifer Lawrence", en: "Jennifer Lawrence" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Jennifer Aniston",
      en: "Jennifer Aniston"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre real del actor que interpreta a Ross?",
      en: "What is the real name of the actor who plays Ross?"
    },
    options: [
      {
        text: { es: "David Schwimmer", en: "David Schwimmer" },
        isCorrect: true
      },
      {
        text: { es: "Matt LeBlanc", en: "Matt LeBlanc" },
        isCorrect: false
      },
      {
        text: { es: "Matthew Perry", en: "Matthew Perry" },
        isCorrect: false
      },
      {
        text: { es: "David Arquette", en: "David Arquette" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "David Schwimmer",
      en: "David Schwimmer"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre de la madre de Monica y Ross?",
      en: "What is the name of Monica and Ross's mother?"
    },
    options: [
      {
        text: { es: "Judy Geller", en: "Judy Geller" },
        isCorrect: true
      },
      {
        text: { es: "Gloria Geller", en: "Gloria Geller" },
        isCorrect: false
      },
      {
        text: { es: "Linda Geller", en: "Linda Geller" },
        isCorrect: false
      },
      {
        text: { es: "Sandra Geller", en: "Sandra Geller" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Judy Geller",
      en: "Judy Geller"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es el nombre del padre de Monica y Ross?",
      en: "What is the name of Monica and Ross's father?"
    },
    options: [
      {
        text: { es: "Jack Geller", en: "Jack Geller" },
        isCorrect: true
      },
      {
        text: { es: "Leonard Geller", en: "Leonard Geller" },
        isCorrect: false
      },
      {
        text: { es: "Richard Geller", en: "Richard Geller" },
        isCorrect: false
      },
      {
        text: { es: "Howard Geller", en: "Howard Geller" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Jack Geller",
      en: "Jack Geller"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuántos años tiene la diferencia entre Monica y Ross?",
      en: "What is the age difference between Monica and Ross?"
    },
    options: [
      {
        text: { es: "1 año", en: "1 year" },
        isCorrect: true
      },
      {
        text: { es: "2 años", en: "2 years" },
        isCorrect: false
      },
      {
        text: { es: "3 años", en: "3 years" },
        isCorrect: false
      },
      {
        text: { es: "Son gemelos", en: "They're twins" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "1 año",
      en: "1 year"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cómo se llama el científico con el que sale Phoebe que va a Minsk?",
      en: "What is the name of the scientist Phoebe dates who goes to Minsk?"
    },
    options: [
      {
        text: { es: "David", en: "David" },
        isCorrect: true
      },
      {
        text: { es: "Mike", en: "Mike" },
        isCorrect: false
      },
      {
        text: { es: "Gary", en: "Gary" },
        isCorrect: false
      },
      {
        text: { es: "Richard", en: "Richard" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "David",
      en: "David"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cuál es la profesión de Richard, el ex de Monica?",
      en: "What is Richard's profession, Monica's ex?"
    },
    options: [
      {
        text: { es: "Oftalmólogo", en: "Ophthalmologist" },
        isCorrect: true
      },
      {
        text: { es: "Dentista", en: "Dentist" },
        isCorrect: false
      },
      {
        text: { es: "Cirujano", en: "Surgeon" },
        isCorrect: false
      },
      {
        text: { es: "Pediatra", en: "Pediatrician" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Oftalmólogo",
      en: "Ophthalmologist"
    },
    difficulty: "hard",
    points: 3
  },
  {
    question: {
      es: "¿Cómo se llama el millonario que sale con Monica?",
      en: "What is the name of the millionaire who dates Monica?"
    },
    options: [
      {
        text: { es: "Pete Becker", en: "Pete Becker" },
        isCorrect: true
      },
      {
        text: { es: "Paul Stevens", en: "Paul Stevens" },
        isCorrect: false
      },
      {
        text: { es: "Mark Robinson", en: "Mark Robinson" },
        isCorrect: false
      },
      {
        text: { es: "Joshua Burgin", en: "Joshua Burgin" },
        isCorrect: false
      }
    ],
    correctAnswer: {
      es: "Pete Becker",
      en: "Pete Becker"
    },
    difficulty: "hard",
    points: 3
  }
];

// Function to insert bilingual questions
async function insertBilingualQuestions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friends-trivia');
    console.log('✅ Connected to MongoDB');

    await Question.deleteMany({});
    console.log('🗑️  Previous questions deleted');

    const questionsToInsert = bilingualQuestions.map(q => ({
      ...q,
      dailyDate: new Date()
    }));

    await Question.insertMany(questionsToInsert);
    console.log(`✅ ${bilingualQuestions.length} bilingual questions inserted successfully`);
    
    const counts = {
      easy: bilingualQuestions.filter(q => q.difficulty === 'easy').length,
      medium: bilingualQuestions.filter(q => q.difficulty === 'medium').length,
      hard: bilingualQuestions.filter(q => q.difficulty === 'hard').length
    };
    
    console.log('\n📊 Question distribution:');
    console.log(`   🟢 Easy: ${counts.easy}`);
    console.log(`   🟡 Medium: ${counts.medium}`);
    console.log(`   🔴 Hard: ${counts.hard}`);
    console.log('\n💡 Each quiz has: 2 easy, 1 medium, 1 hard');
    console.log('🌐 Questions available in Spanish and English');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  insertBilingualQuestions();
}

module.exports = bilingualQuestions;
