# 🎯 Sistema de Preguntas Únicas y Opciones Aleatorias

## 📋 Descripción

El sistema ahora incluye dos mejoras importantes:

### 1️⃣ Preguntas No Repetibles
Los usuarios **nunca responderán la misma pregunta dos veces**. El sistema trackea automáticamente todas las preguntas respondidas y las excluye en futuros quizzes.

### 2️⃣ Opciones Aleatorias
Las opciones de respuesta se muestran en **orden aleatorio** cada vez, evitando que los usuarios memoricen posiciones en lugar del contenido.

---

## 🔧 Implementación Técnica

### Backend (Server)

#### Modelo de Usuario
```javascript
answeredQuestions: [{
  questionId: ObjectId,           // ID de la pregunta respondida
  answer: String,                  // Respuesta del usuario
  isCorrect: Boolean,              // Si fue correcta
  pointsEarned: Number,            // Puntos ganados/perdidos
  answeredAt: Date                 // Timestamp
}]
```

#### Controlador de Preguntas
- Al seleccionar preguntas para un quiz, se excluyen las que están en `answeredQuestions`
- Filtro aplicado en las consultas de agregación MongoDB:
  ```javascript
  {
    difficulty: 'easy',
    _id: { $nin: answeredQuestionIds }  // Excluir respondidas
  }
  ```

#### Controlador de Puntuación
- Cada vez que un usuario responde, se agrega a `answeredQuestions`
- Se registra: pregunta, respuesta, corrección, puntos y timestamp

### Frontend (Client)

#### Función de Mezcla (Fisher-Yates Shuffle)
```javascript
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

#### Aplicación en Quiz
- Las opciones se mezclan al cargar las preguntas
- Se aplica tanto a sesiones nuevas como a sesiones activas
- Cada pregunta mantiene su orden mezclado durante toda la sesión

---

## 📊 Utilidades Administrativas

### 1. Verificar Progreso de Usuario
```bash
node checkUserProgress.js [username]
```

**Muestra:**
- Total de preguntas respondidas
- Preguntas disponibles
- Porcentaje completado
- Estadísticas de precisión
- Estado del cooldown (48h)

**Ejemplo de salida:**
```
📊 Progreso del Usuario
═══════════════════════════════════════
👤 Usuario: leonardo
📧 Email: marcelo1793@gmail.com
🏆 Puntos: 7

📝 Preguntas respondidas: 4 de 100
📋 Preguntas disponibles: 96
📈 Porcentaje completado: 4.0%

📊 Estadísticas de respuestas:
   ✅ Correctas: 4
   ❌ Incorrectas: 0
   🎯 Precisión: 100.0%
```

### 2. Resetear Preguntas Respondidas
```bash
node resetAnsweredQuestions.js
```

**Función:**
- Limpia el array `answeredQuestions` de todos los usuarios
- Permite que todos vuelvan a responder todas las preguntas
- ⚠️ **Usar con precaución** - acción irreversible

**Cuándo usar:**
- Después de agregar muchas preguntas nuevas
- Para resetear el sistema en desarrollo/testing
- Para permitir que usuarios completen el ciclo completo de nuevo

---

## 🎮 Experiencia del Usuario

### Ciclo de Vida de las Preguntas

1. **Primera Vez:**
   - Usuario tiene acceso a las 100 preguntas
   - Cada quiz usa 4 preguntas (2 fáciles, 1 mediana, 1 difícil)

2. **Después de cada Quiz:**
   - Las 4 preguntas respondidas se marcan como "respondidas"
   - Quedan 96 preguntas disponibles

3. **Progreso Continuo:**
   - Cada 48 horas puede responder 4 preguntas más
   - El pool de preguntas disponibles se reduce gradualmente
   - Estadísticas de precisión se acumulan

4. **Agotamiento del Pool:**
   - Después de 25 quizzes (100 preguntas / 4), el usuario habrá respondido todo
   - Tiempo total necesario: 25 quizzes × 48 horas = 50 días (7 semanas)
   - En este punto, necesitarás agregar más preguntas o resetear

### Opciones Aleatorias

**Antes:**
```
A) Central Perk     ← Siempre primera
B) The Ritz         ← Siempre segunda
C) The Coffee Bean  ← Siempre tercera
D) Brew Haven       ← Siempre cuarta
```

**Ahora:**
```
Quiz 1:
C) The Coffee Bean
A) Central Perk  ✓
D) Brew Haven
B) The Ritz

Quiz 2 (misma pregunta, si pudiera repetirse):
B) The Ritz
D) Brew Haven
A) Central Perk  ✓
C) The Coffee Bean
```

---

## 📈 Escalabilidad

### Con 100 Preguntas
- **Duración:** 25 quizzes = 50 días
- **Suficiente para:** ~7 semanas de juego continuo

### Recomendaciones
- **Mínimo recomendado:** 200 preguntas (100 días / 14 semanas)
- **Ideal:** 400+ preguntas (200 días / 28 semanas)
- **Largo plazo:** Agregar 20-30 preguntas mensuales

### Agregar Más Preguntas
1. Editar `server/sampleQuestions.js`
2. Agregar preguntas siguiendo el formato existente
3. Ejecutar: `node sampleQuestions.js`
4. Las nuevas preguntas estarán disponibles inmediatamente
5. No es necesario resetear usuarios

---

## 🔒 Seguridad y Validación

### Backend
- ✅ Verifica que la pregunta pertenezca a la sesión actual
- ✅ Valida que la pregunta no haya sido respondida
- ✅ Trackea timestamp de cada respuesta
- ✅ Previene respuestas duplicadas

### Frontend
- ✅ Opciones mezcladas aleatoriamente cada vez
- ✅ No se puede manipular el orden para hacer trampa
- ✅ El mezclado ocurre en el cliente (mejor UX)

---

## 🐛 Solución de Problemas

### "No hay preguntas disponibles"
**Causa:** Usuario ha respondido todas las preguntas de una dificultad
**Solución:**
```bash
# Verificar cuántas preguntas quedan
node checkQuestions.js

# Verificar progreso del usuario
node checkUserProgress.js [username]

# Si es necesario, resetear
node resetAnsweredQuestions.js
```

### Las opciones no se mezclan
**Causa:** Caché del navegador
**Solución:**
1. Hacer hard refresh (Ctrl + Shift + R)
2. Limpiar caché del navegador
3. Verificar que no haya errores en consola

### Usuario no puede jugar a pesar de tener preguntas
**Verificar:**
1. Cooldown de 48 horas: `node checkUserProgress.js [username]`
2. Sesión activa sin completar
3. Email verificado

---

## 📝 Notas Importantes

1. **Persistencia:** Las preguntas respondidas se guardan permanentemente
2. **No hay "reset accidental":** Solo con script administrativo
3. **Estadísticas:** Se acumulan para análisis de progreso
4. **Performance:** Consultas optimizadas con índices MongoDB
5. **Aleatorización:** Usa Fisher-Yates, distribución uniforme garantizada

---

## 🚀 Próximas Mejoras Posibles

### Funcionalidades Futuras
- [ ] Sistema de "hints" para preguntas difíciles (costo: 1 punto)
- [ ] Modo "repaso" para preguntas ya respondidas (sin puntos)
- [ ] Categorías de preguntas (personajes, episodios, relaciones)
- [ ] Estadísticas por categoría
- [ ] Logros por completar todas las preguntas
- [ ] Leaderboard de precisión (no solo puntos)
- [ ] Preguntas con imagen
- [ ] Modo "desafío" con tiempo reducido

### Base de Datos
- [ ] Sistema de reportar preguntas incorrectas
- [ ] Versionado de preguntas
- [ ] Dificultad dinámica basada en tasa de aciertos
- [ ] Pool rotativo (preguntas temporales)

---

## 📞 Comandos Rápidos

```bash
# Ver todas las preguntas en DB
node checkQuestions.js

# Ver progreso de un usuario
node checkUserProgress.js leonardo

# Listar todos los usuarios
node listUsers.js

# Resetear preguntas respondidas
node resetAnsweredQuestions.js

# Agregar preguntas nuevas
node sampleQuestions.js
```

---

**Fecha de implementación:** 25 de diciembre de 2025
**Versión:** 2.0
**Estado:** ✅ Producción
