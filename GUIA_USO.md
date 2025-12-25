# Cómo usar la aplicación

## Instalación rápida

### 1. Instalar dependencias del servidor
```bash
cd server
npm install
```

### 2. Instalar dependencias del cliente
```bash
cd ../client
npm install
```

### 3. Variables de entorno

En `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/friends-trivia
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

En `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Ejecución

### Terminal 1 - Servidor
```bash
cd server
npm run dev
```

### Terminal 2 - Cliente
```bash
cd client
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Flujo de la aplicación

1. **Inicio**: Página de bienvenida con opciones de Login/Registro
2. **Registro**: Crear cuenta con usuario, email y contraseña
3. **Login**: Iniciar sesión con email y contraseña
4. **Quiz**: Responder la pregunta diaria
5. **Ranking**: Ver posición en el ranking global
6. **Perfil**: Ver estadísticas personales

## Características principales

### Sistema de Puntuación
- Respuesta correcta: +10 puntos (configurable)
- Respuesta incorrecta: -5 puntos
- Se puede responder una pregunta por día

### Ranking
- Clasificación automática por puntos
- Medallas para los top 3 (🥇 🥈 🥉)
- Se actualiza en tiempo real

### Estadísticas del Usuario
- Total de puntos
- Posición en ranking
- Preguntas respondidas
- Respuestas correctas
- Porcentaje de precisión

## Preguntas de ejemplo

La aplicación viene con 6 preguntas de ejemplo sobre la serie Friends.
Puedes agregar más preguntas a través del panel de administración.

## Panel de Administración

Para acceder al panel de administración (crear preguntas):
1. Navega a `/admin` en la URL
2. Crea una nueva pregunta para el día actual
3. Solo se permite una pregunta por día

## Base de datos

Por defecto, la aplicación usa MongoDB local en `mongodb://localhost:27017/friends-trivia`

Si deseas usar MongoDB Atlas (nube):
1. Crea una cuenta en https://www.mongodb.com/cloud/atlas
2. Obtén la URI de conexión
3. Actualiza `MONGODB_URI` en `.env`

## Solución de problemas

### "Error al conectar a MongoDB"
- Asegúrate de que MongoDB está corriendo localmente
- O configura una URI de MongoDB Atlas

### "CORS error"
- Verifica que el servidor está corriendo en `http://localhost:5000`
- Comprueba que `REACT_APP_API_URL` está configurado correctamente

### "Token no válido"
- Borra el localStorage y vuelve a iniciar sesión
- En navegador: F12 → Application → Local Storage → Clear All

## Próximas mejoras

- Agregar sistema de logros
- Implementar chat/comentarios
- Agregar modo multijugador
- Crear app móvil con React Native
- Agregar más categorías de preguntas
