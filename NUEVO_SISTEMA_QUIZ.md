# 🎮 Sistema de Quiz - 4 Preguntas cada 48 Horas

## ⚡ Implementación Completa

Se ha renovado completamente el sistema de quiz con:

- ✅ **4 preguntas cada 48 horas** (antes era 1 diaria)
- ✅ **Timer de 30 segundos** por pregunta
- ✅ **Dificultades**: 2 fáciles 🟢, 1 mediana 🟡, 1 difícil 🔴
- ✅ **Timeout automático**: Marca como incorrecta si no se responde
- ✅ **Puntuación actualizada**: Basada en dificultad
- ✅ **Sesión de quiz**: Las 4 preguntas en secuencia

## 💎 Puntos por Dificultad

| Dificultad | ✅ Correcta | ❌ Incorrecta |
|------------|-------------|---------------|
| 🟢 Fácil   | +1          | -1            |
| 🟡 Mediana | +2          | -1            |
| 🔴 Difícil | +3          | -2            |

**Máximo por sesión**: +7 puntos  
**Mínimo por sesión**: -5 puntos

## 🚀 Inicio Rápido

### 1. Cargar Preguntas de Ejemplo
```bash
cd server
node sampleQuestions.js
```

Esto cargará:
- 5 preguntas fáciles 🟢
- 4 preguntas medianas 🟡
- 3 preguntas difíciles 🔴

### 2. Probar el Sistema
1. Iniciar sesión en la app
2. Ir al Quiz
3. Responder las 4 preguntas (puedes dejar que algunas lleguen a timeout)
4. Ver resumen final
5. Intentar jugar de nuevo → Deberías ver "Espera 48 horas"

### 3. Reset para Testing (Opcional)
```javascript
// En MongoDB
db.users.updateMany(
  {},
  { 
    $set: { lastQuizCompleted: null },
    $unset: { currentQuizSession: "" }
  }
)
```

## 📊 Flujo del Usuario

```
1. Usuario entra al quiz
    ↓
2. ¿Pasaron 48 horas?
    → NO: "Espera Xh Ym"
    → SÍ: Crear sesión con 4 preguntas
    ↓
3. Para cada pregunta (4 total):
    - Mostrar pregunta + timer 30s
    - Usuario responde O timeout
    - Mostrar resultado
    - Botón "Siguiente"
    ↓
4. Al completar 4 preguntas:
    - Mostrar resumen
    - Guardar lastQuizCompleted
    - Esperar 48 horas
```

## 🎨 Interfaz Visual

### Timer
- **Verde** (>20s): Todo tranquilo ✅
- **Amarillo** (10-20s): Date prisa ⚠️
- **Rojo** (<10s): ¡Rápido! 🚨

### Elementos
- Barra de progreso visual
- Contador de segundos grande
- "Pregunta X de 4"
- Puntos actuales visibles
- Indicador de dificultad

## 📁 Archivos Modificados

### Backend (5 archivos)
1. ✅ `server/models/User.js`
2. ✅ `server/controllers/questionController.js`
3. ✅ `server/controllers/scoreController.js`
4. ✅ `server/sampleQuestions.js`

### Frontend (2 archivos)
1. ✅ `client/src/components/Quiz.js`
2. ✅ `client/src/styles/Quiz.css`

## 🎯 API Actualizado

### GET /api/questions/daily
Devuelve 4 preguntas (antes 1):
```json
{
  "questions": [
    { "id": "...", "question": "...", "difficulty": "easy", "timeLimit": 30 },
    { "id": "...", "question": "...", "difficulty": "easy", "timeLimit": 30 },
    { "id": "...", "question": "...", "difficulty": "medium", "timeLimit": 30 },
    { "id": "...", "question": "...", "difficulty": "hard", "timeLimit": 30 }
  ],
  "questionsAnswered": 0
}
```

### POST /api/scores/answer
Ahora acepta `timedOut`:
```json
{
  "questionId": "...",
  "answer": "...",
  "timedOut": false
}
```

## ✨ ¡Listo para Usar!

El sistema está completamente funcional. Solo necesitas:
1. ✅ Cargar preguntas: `node sampleQuestions.js`
2. ✅ Reiniciar el servidor
3. ✅ ¡Jugar!

---

**Fecha**: 25 de diciembre de 2025  
**Estado**: ✅ Implementado y Funcional
