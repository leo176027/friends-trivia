# 🎮 EJEMPLOS PRÁCTICOS - Friends Trivia

## Ejemplo 1: Flujo Completo de un Usuario Nuevo

### Paso 1: Acceder a la aplicación
```
URL: http://localhost:3000
```

Ves la página de inicio con dos botones:
- Iniciar Sesión
- Registrarse

### Paso 2: Registrarse
```
Click en "Registrarse"

Formulario:
Usuario:        joey_tribbiani
Email:          joey@example.com
Contraseña:     password123
Confirmar:      password123

Click en "Registrarse"
```

Backend recibe:
```json
POST /api/auth/register
{
  "username": "joey_tribbiani",
  "email": "joey@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Servidor:
1. Valida que el email sea único
2. Valida que el username sea único
3. Hashea la contraseña
4. Guarda el usuario en MongoDB
5. Crea un JWT token
6. Responde con el token

Cliente:
1. Guarda el token en localStorage
2. Actualiza el contexto de autenticación
3. Redirige a /quiz

### Paso 3: Ver Pregunta del Día
```
Automáticamente redirigido a /quiz

La aplicación hace:
GET /api/questions/daily

Servidor busca en MongoDB la pregunta del día

Respuesta:
{
  "question": {
    "id": "123abc",
    "question": "¿Cuál es el nombre del bar?",
    "options": [
      {"text": "Central Perk", "isCorrect": true},
      {"text": "The Ritz", "isCorrect": false},
      {"text": "The Coffee Bean", "isCorrect": false},
      {"text": "Brew Haven", "isCorrect": false}
    ],
    "difficulty": "easy",
    "category": "Friends"
  }
}
```

Cliente renderiza:
- Pregunta en grande
- 4 opciones de respuesta con radio buttons
- Botón "Enviar Respuesta"
- Mostrado el total de puntos (0 para nuevo usuario)

### Paso 4: Responder Pregunta
```
Usuario selecciona: "Central Perk"
Click en "Enviar Respuesta"

Frontend valida:
✓ Opción seleccionada
✓ Token disponible
✓ questionId disponible

Envía:
POST /api/scores/answer
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
{
  "questionId": "123abc",
  "answer": "Central Perk"
}
```

Backend:
1. Verifica token JWT
2. Busca al usuario
3. Busca la pregunta
4. Verifica que no haya respondido hoy
5. Compara: "Central Perk" === "Central Perk" ✓
6. Es correcta: +10 puntos
7. Actualiza puntos del usuario (0 → 10)
8. Guarda el registro en collection scores
9. Responde con éxito

Respuesta:
```json
{
  "message": "¡Respuesta correcta!",
  "isCorrect": true,
  "pointsEarned": 10,
  "newTotalPoints": 10,
  "correctAnswer": "Central Perk"
}
```

Cliente:
- Muestra ✓ "¡Respuesta correcta!"
- Muestra "+10 puntos"
- Muestra "Total: 10 puntos"
- Desactiva las opciones
- Los botones de opciones cambian a color verde

### Paso 5: Ver Ranking
```
Click en "Ranking" en la navbar

GET /api/scores/ranking

Servidor retorna:
{
  "ranking": [
    {
      "position": 1,
      "username": "phoebe_artist",
      "points": 250,
      "email": "phoebe@example.com"
    },
    {
      "position": 2,
      "username": "chandler_bing",
      "points": 200,
      "email": "chandler@example.com"
    },
    {
      "position": 3,
      "username": "ross_paleontologist",
      "points": 150,
      "email": "ross@example.com"
    },
    {
      "position": 4,
      "username": "joey_tribbiani",
      "points": 10,  ← El usuario nuevo
      "email": "joey@example.com"
    }
  ]
}

Cliente muestra:
┌─────────────────────────────────┐
│      RANKING GLOBAL             │
├─────────────────────────────────┤
│ 🥇 phoebe_artist        250 pts │
│ 🥈 chandler_bing        200 pts │
│ 🥉 ross_paleontologist  150 pts │
│ #4 joey_tribbiani        10 pts │
└─────────────────────────────────┘
```

### Paso 6: Ver Perfil
```
Click en "Mi Perfil"

GET /api/scores/user-rank
Authorization: Bearer <token>

GET /api/scores/stats
Authorization: Bearer <token>

Servidor retorna:
{
  "rank": 4,
  "points": 10,
  "username": "joey_tribbiani"
}

{
  "stats": {
    "totalPoints": 10,
    "totalAnswered": 1,
    "correctAnswers": 1,
    "accuracy": 100,
    "username": "joey_tribbiani"
  }
}

Cliente muestra:
┌──────────────────────────┐
│      MI PERFIL           │
├──────────────────────────┤
│ Usuario: joey_tribbiani  │
│ Email: joey@example.com  │
│                          │
│ Puntos Totales:      10  │
│ Posición:           #4   │
│ Preguntas:           1   │
│ Correctas:           1   │
│ Precisión:         100%  │
└──────────────────────────┘
```

---

## Ejemplo 2: Respuesta Incorrecta

### Usuario intenta responder una pregunta
```
Pregunta: "¿Cuántos años cumple Ross en 'The One With the Cake'?"
Opciones:
- 28
- 29  ← Respuesta correcta
- 30
- 31

Usuario selecciona: "30" (Incorrecta)

POST /api/scores/answer
{
  "questionId": "abc123",
  "answer": "30"
}
```

Servidor:
```
Compara: "30" !== "29" ✗
Respuesta incorrecta
Puntos: -5
Nuevo total: 10 + (-5) = 5 puntos
```

Cliente muestra:
```
✗ Respuesta incorrecta
-5 puntos
Total de puntos: 5

Respuesta correcta: 29
```

---

## Ejemplo 3: Usuario Intenta Responder Dos Veces el Mismo Día

```
Usuario ya respondió hoy
Intenta responder de nuevo

POST /api/scores/answer
{
  "questionId": "abc123",
  "answer": "Central Perk"
}

Servidor verifica:
const alreadyAnswered = user.answeredQuestions.some(q =>
  q.answeredAt >= today && q.answeredAt < tomorrow
)

true ✓ Ya respondió hoy

Respuesta del servidor:
{
  "message": "Ya has respondido la pregunta de hoy"
}

Estado HTTP: 400 (Bad Request)

Cliente muestra:
❌ Error: Ya has respondido la pregunta de hoy
```

---

## Ejemplo 4: Crear una Pregunta desde AdminPanel

### Acceder a Admin
```
URL: http://localhost:3000/admin
(Solo accesible si estás logueado)
```

### Formulario
```
Pregunta:
"¿En qué ciudad vive Monica en la serie?"

Opciones:
□ Los Angeles     (correcta) ✓
□ Nueva York
□ Boston
□ Las Vegas

Dificultad: easy
Puntos: 10

Click en "Crear Pregunta"
```

Frontend valida:
```javascript
if (!formData.question) error("Falta pregunta");
if (options.some(o => !o.text)) error("Falta opción");
if (!correctAnswer) error("Selecciona respuesta correcta");
```

Envía:
```json
POST /api/questions
{
  "question": "¿En qué ciudad vive Monica en la serie?",
  "options": [
    {"text": "Los Angeles", "isCorrect": true},
    {"text": "Nueva York", "isCorrect": false},
    {"text": "Boston", "isCorrect": false},
    {"text": "Las Vegas", "isCorrect": false}
  ],
  "correctAnswer": "Los Angeles",
  "difficulty": "easy",
  "points": 10
}
```

Servidor:
1. Verifica si ya existe pregunta para hoy
2. Si existe: error "Ya existe una pregunta para hoy"
3. Si no: crea la pregunta en MongoDB
4. Responde con éxito

Cliente muestra:
```
✓ Pregunta creada exitosamente
(Limpia el formulario)
```

Mañana, los usuarios verán esta pregunta cuando accedan a /quiz

---

## Ejemplo 5: Flujo de Login Fallido

```
Usuario intenta login con email incorrecto:

Email: pepe@example.com
Contraseña: password123

POST /api/auth/login
{
  "email": "pepe@example.com",
  "password": "password123"
}

Servidor busca usuario:
const user = await User.findOne({ email }).select('+password')
user = null (no encontrado)

Respuesta:
{
  "message": "Credenciales inválidas"
}

Estado HTTP: 400

Cliente:
- No crea token
- No redirige
- Muestra: ❌ Credenciales inválidas
```

---

## Ejemplo 6: Token Expirado

```
Usuario logueado, pero su token expiró (30 días después)

Usuario intenta acceder a /quiz:

Frontend intenta:
GET /api/questions/daily
Authorization: Bearer eyJhbGciOi... (token expirado)

Servidor valida token:
const decoded = jwt.verify(token, JWT_SECRET)
Error: TokenExpiredError

Servidor responde:
{
  "message": "Token no válido"
}

Estado HTTP: 401

Cliente:
- Recibe 401
- Limpia token del localStorage
- Redirige a /login
- Usuario debe loguearse de nuevo
```

---

## Ejemplo 7: Datos Multijugador Realista

### Escenario: 5 usuarios juegan durante 5 días

#### Día 1
```
Pregunta: "¿Cuál es el nombre del bar?"
Respuesta correcta: "Central Perk"

Ross:     responde "Central Perk" ✓ → +10 puntos → Total: 10
Chandler: responde "Central Perk" ✓ → +10 puntos → Total: 10
Monica:   responde "The Ritz"     ✗ → -5 puntos → Total: -5
Phoebe:   responde "Central Perk" ✓ → +10 puntos → Total: 10
Rachel:   NO responde

Ranking después del Día 1:
1. Ross, Chandler, Phoebe - 10 puntos
4. Monica - (-5) puntos
5. Rachel - 0 puntos
```

#### Día 2
```
Pregunta: "¿Cuántos años tiene Ross?" (Respuesta: 29)

Ross:     responde "29" ✓ → +10 → Total: 20
Chandler: responde "30" ✗ → -5 → Total: 5
Monica:   responde "29" ✓ → +10 → Total: 5
Phoebe:   responde "28" ✗ → -5 → Total: 5
Rachel:   responde "29" ✓ → +10 → Total: 10

Ranking después del Día 2:
1. Ross - 20
2. Rachel - 10
3. Chandler, Monica, Phoebe - 5 puntos
```

#### Después de 5 días
```
Ranking final (suposición):
1. Ross - 50 puntos (5/5 correctas)
2. Phoebe - 45 puntos (4/5 correctas)
3. Monica - 40 puntos (4/5 correctas)
4. Rachel - 35 puntos (3/5 correctas)
5. Chandler - 30 puntos (3/5 correctas)
```

---

## Ejemplo 8: Consulta de Estadísticas Avanzadas

```
Usuario: Ross
Puntos acumulados: 150

Historial de respuestas (simplificado):
Día 1: Central Perk ✓ +10
Día 2: 29 años ✓ +10
Día 3: Monica en NYC ✗ -5
Día 4: Rachel joven ✓ +10
Día 5: Joey actor ✓ +10
... (10 más)

Estadísticas calculadas:
- Total respondidas: 15
- Correctas: 14
- Incorrectas: 1
- Precisión: 93.33%
- Puntos ganados: 140
- Puntos perdidos: -5
- Neto: 140 - 5 = 135 (pero se suma progresivamente)
```

---

## Ejemplo 9: Validaciones del Servidor

```
1. Registro sin email
   POST /api/auth/register
   { username: "test", password: "123", confirmPassword: "123" }
   ❌ Error: "Por favor completa todos los campos"

2. Registro con contraseñas diferentes
   POST /api/auth/register
   { 
     username: "test",
     email: "test@test.com",
     password: "123",
     confirmPassword: "456"
   }
   ❌ Error: "Las contraseñas no coinciden"

3. Login con email no registrado
   POST /api/auth/login
   { email: "nope@test.com", password: "123" }
   ❌ Error: "Credenciales inválidas"

4. Responder pregunta sin token
   POST /api/scores/answer
   (sin Authorization header)
   ❌ Error: "No hay token, autorización denegada" (401)

5. Responder pregunta con el mismo userId dos veces hoy
   ❌ Error: "Ya has respondido la pregunta de hoy"

6. Crear pregunta cuando ya existe una para hoy
   POST /api/questions
   ❌ Error: "Ya existe una pregunta para hoy"
```

---

## Ejemplo 10: Flujo Completo en Modo Administrador

```
Usuario admin logueado
Accede a: http://localhost:3000/admin

1. Crea pregunta del Día 1:
   "¿Nombre del bar?" → Central Perk

2. Usuarios responden durante todo el día

3. Al día siguiente, el admin:
   - Accede a /admin
   - Crea la pregunta del Día 2

4. El sistema automáticamente:
   - Deshabilita la respuesta de Día 1
   - Habilita la respuesta de Día 2
   - Muestra la nueva pregunta a todos los usuarios

5. Usuarios pueden ver en /ranking:
   - Sus puntos actualizados
   - Su nueva posición
   - Las medallas si son top 3

6. El admin puede en el futuro:
   - Ver estadísticas de respuestas
   - Agregar más preguntas
   - Administrar usuarios (futuro)
```

---

## 🎯 Casos de Uso Reales

### Usuario Casual
```
- Abre la app
- Ve la pregunta del día
- Responde sin pensar
- Cierra la app
- Vuelve mañana
```

### Competidor Serio
```
- Abre la app todos los días
- Lee la pregunta cuidadosamente
- Piensa bien antes de responder
- Revisa el ranking constantemente
- Intenta ser #1
```

### Administrador
```
- Crea una pregunta cada día
- Monitorea el ranking
- Ve que usuarios están jugando
- Verifica que todo funcione
```

---

Estos ejemplos muestran cómo la aplicación funciona en la práctica. ¡Ahora estás listo para jugar! 🚀
