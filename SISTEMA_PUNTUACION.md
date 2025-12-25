# 🏆 Sistema de Puntuación - Friends Trivia

## Descripción General

El sistema de puntuación en Friends Trivia está basado en la **dificultad de las preguntas**. Esto hace que el juego sea más estratégico y gratificante, donde preguntas más difíciles ofrecen más puntos de recompensa pero también mayor penalización por errores.

---

## 📊 Tabla de Puntos por Dificultad

| Dificultad | Respuesta Correcta | Respuesta Incorrecta | Diferencia |
|:-----------|:------------------:|:-------------------:|:-----------:|
| 🟢 **Fácil** | +1 punto | -1 punto | 2 puntos |
| 🟡 **Medio** | +1 punto | -1 punto | 2 puntos |
| 🔴 **Difícil** | +3 puntos | -2 puntos | 5 puntos |

---

## 🎯 Reglas del Sistema

### ✅ Respuesta Correcta
Cuando un usuario selecciona la opción correcta:
- **Pregunta Fácil**: Gana **+1 punto**
- **Pregunta Media**: Gana **+1 punto**
- **Pregunta Difícil**: Gana **+3 puntos**

### ❌ Respuesta Incorrecta
Cuando un usuario selecciona una opción incorrecta:
- **Pregunta Fácil**: Pierde **-1 punto**
- **Pregunta Media**: Pierde **-1 punto**
- **Pregunta Difícil**: Pierde **-2 puntos**

---

## 💡 Estrategia y Equilibrio

### Por Qué Este Sistema Funciona

1. **Recompensa al Conocimiento**
   - Las preguntas fáciles dan pocos puntos
   - Las preguntas difíciles dan más puntos para quienes saben la respuesta

2. **Castigo Proporcional**
   - El castigo es menor en preguntas fáciles (-1)
   - El castigo es mayor en preguntas difíciles (-2)
   - Anima a los usuarios a ser más cuidadosos con preguntas difíciles

3. **Equilibrio de Riesgo-Recompensa**
   - Preguntas fáciles: Bajo riesgo, baja recompensa (1-1=0 diferencia)
   - Preguntas difíciles: Alto riesgo, alta recompensa (3-2=1 diferencia positiva esperada)

---

## 🛠️ Implementación Técnica

### Backend - scoreController.js

La lógica se encuentra en la función `answerQuestion`:

```javascript
// Calcular puntos basados en dificultad
let pointsEarned;
switch(question.difficulty) {
  case 'easy':
    pointsEarned = isCorrect ? 1 : -1;
    break;
  case 'medium':
    pointsEarned = isCorrect ? 1 : -1;
    break;
  case 'hard':
    pointsEarned = isCorrect ? 3 : -2;
    break;
  default:
    pointsEarned = isCorrect ? 1 : -1;
}
```

### Modelo de Pregunta

Cada pregunta tiene un campo `difficulty`:

```javascript
difficulty: {
  type: String,
  enum: ['easy', 'medium', 'hard'],
  default: 'medium'
}
```

### Frontend - Quiz Component

El usuario ve:
- 🟢 Dificultad de la pregunta (visual indicator)
- Puntos ganados o perdidos después de responder
- Total de puntos actualizado

---

## 📈 Ejemplos de Sesiones

### Ejemplo 1: Usuario Experto (6 preguntas)
- Fácil ✅ → +1 (Total: 1)
- Medio ✅ → +1 (Total: 2)
- Difícil ✅ → +3 (Total: 5)
- Fácil ✅ → +1 (Total: 6)
- Medio ✅ → +1 (Total: 7)
- Difícil ✅ → +3 (Total: 10)

**Total de puntos: 10**

### Ejemplo 2: Usuario Principiante (6 preguntas)
- Fácil ✅ → +1 (Total: 1)
- Medio ❌ → -1 (Total: 0)
- Difícil ❌ → -2 (Total: -2)
- Fácil ✅ → +1 (Total: -1)
- Medio ✅ → +1 (Total: 0)
- Difícil ❌ → -2 (Total: -2)

**Total de puntos: -2**

### Ejemplo 3: Usuario Intermedio (6 preguntas)
- Fácil ✅ → +1 (Total: 1)
- Medio ✅ → +1 (Total: 2)
- Difícil ❌ → -2 (Total: 0)
- Fácil ✅ → +1 (Total: 1)
- Medio ❌ → -1 (Total: 0)
- Difícil ✅ → +3 (Total: 3)

**Total de puntos: 3**

---

## 🎓 Cómo Crear Preguntas con Dificultad

### Vía Panel de Administración

1. Accede al panel: **🛠️ Admin**
2. Llena el formulario:
   - ☕ Pregunta: Tu pregunta sobre Friends
   - Opciones: Las 4 opciones de respuesta
   - 🎯 Dificultad: Selecciona fácil/medio/difícil
   - ⭐ Puntos: Campo opcional (no afecta en v1.1)
3. Click en ✨ Crear Pregunta

### Ejemplo de Pregunta por Dificultad

**Fácil:**
> ¿Cuál es el nombre del café donde se reúnen los amigos?
> - Central Perk ✅
> - Coffee Bean
> - Brew Café
> - The Daily Grind

**Medio:**
> ¿En qué ciudad viven los personajes principales de Friends?
> - Nueva York ✅
> - Los Ángeles
> - Chicago
> - Boston

**Difícil:**
> ¿Cuál es el nombre del piso (departamento) de Monica?
> - Edificio de Monica ✅
> - Número 1
> - Piso 12 Edificio Central
> - Departamento Monica

---

## 🔍 Monitoreo y Análisis

### Visualizar Puntos

**Navbar** → Muestra puntos actuales del usuario
**Quiz** → Muestra puntos ganados/perdidos después de cada respuesta
**Ranking** → Posición global por puntos totales
**Perfil** → Estadísticas completas de puntos

### Datos en Base de Datos

Tabla `scores`:
```javascript
{
  userId: ObjectId,
  questionId: ObjectId,
  isCorrect: Boolean,
  pointsEarned: Number,  // Puede ser positivo o negativo
  createdAt: Date
}
```

Tabla `users`:
```javascript
{
  username: String,
  points: Number,  // Total acumulado
  ...
}
```

---

## 🔧 Modificaciones Futuras

Si deseas ajustar los puntos, edita:

**Archivo:** `server/controllers/scoreController.js`
**Función:** `answerQuestion`
**Línea:** ~40-55

Ejemplo para cambiar easy a +2/-2:
```javascript
case 'easy':
  pointsEarned = isCorrect ? 2 : -2;
  break;
```

---

## ✅ Checklist de Implementación

- ✅ Modelo Question tiene campo difficulty
- ✅ scoreController.js implementa lógica por dificultad
- ✅ AdminPanel permite seleccionar dificultad
- ✅ Quiz component muestra dificultad
- ✅ Quiz component muestra puntos ganados/perdidos
- ✅ Ranking ordena por puntos totales
- ✅ Base de datos registra puntos en cada respuesta

---

## 📞 Soporte

Si tienes dudas sobre el sistema de puntuación:

1. **Revisa ARQUITECTURA.txt** para entender el flujo completo
2. **Lee DOCUMENTACION_COMPLETA.md** para detalles técnicos
3. **Consulta API_EJEMPLOS.http** para ver requests de ejemplo

---

**Última actualización:** Diciembre 24, 2024
**Versión del sistema:** 1.1.0 (Basado en dificultad)
