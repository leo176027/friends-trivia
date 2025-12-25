# 🚀 Ejecución Rápida - Friends Trivia

## Paso 1: Clonar/Descargar el Proyecto

```bash
cd Friends
```

## Paso 2: Instalar Dependencias

### Windows
```bash
setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

### Manual
```bash
# Terminal 1
cd server
npm install

# Terminal 2
cd client
npm install
```

## Paso 3: Configurar Base de Datos

### Opción A: MongoDB Local (Recomendado para desarrollo)

1. **Descargar MongoDB Community Edition**
   - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - Mac: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-mac/
   - Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

2. **Iniciar MongoDB**
   ```bash
   mongod
   ```

3. **Configurar .env**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Asegúrate de que tiene:
   ```
   MONGODB_URI=mongodb://localhost:27017/friends-trivia
   JWT_SECRET=tu_clave_secreta
   PORT=5000
   ```

### Opción B: MongoDB Atlas (Recomendado para producción)

1. **Crear cuenta gratuita**: https://www.mongodb.com/cloud/atlas

2. **Obtener URI de conexión** desde el cluster

3. **Actualizar .env**:
   ```
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/friends-trivia
   ```

## Paso 4: Ejecutar la Aplicación

### Terminal 1 - Backend
```bash
cd server
npm run dev
```

Espera a ver: `Servidor ejecutándose en puerto 5000`

### Terminal 2 - Frontend
```bash
cd client
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## ✅ Verificar que Funciona

### 1. Acceder a la aplicación
```
http://localhost:3000
```

### 2. Probar el registro
- Click en "Registrarse"
- Llenar formulario
- Crear cuenta

### 3. Probar login
- Ingresar con las credenciales creadas

### 4. Responder pregunta diaria
- Ir a "Quiz"
- Seleccionar una opción
- Enviar respuesta

### 5. Ver ranking
- Click en "Ranking"
- Ver posición en la lista

### 6. Ver perfil
- Click en "Mi Perfil"
- Ver estadísticas personales

## 🔧 Configuración Adicional

### Variables de Entorno

`server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/friends-trivia
JWT_SECRET=mi_clave_secreta_super_segura
NODE_ENV=development
```

`client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Cambiar Puerto del Servidor

En `server/.env`:
```
PORT=5001  # En lugar de 5000
```

En `client/.env`:
```
REACT_APP_API_URL=http://localhost:5001/api
```

## 🐛 Solución de Problemas

### "Error: connect ECONNREFUSED 127.0.0.1:27017"
- MongoDB no está corriendo
- Solución: Ejecuta `mongod` en otra terminal

### "Error: Cannot find module"
- Dependencias no instaladas
- Solución: `npm install` en la carpeta (server o client)

### "CORS error en consola del navegador"
- Servidor no está corriendo
- Solución: Asegúrate de tener `npm run dev` en la terminal del server

### "La página se carga pero no se ve nada"
- Espera a que React compile
- Comprueba la consola del navegador (F12)
- Recarga la página

### "No puedo iniciar sesión"
- Comprueba que el email y contraseña son correctos
- Revisa la consola del servidor para mensajes de error

## 📱 URLs Importantes

| Recurso | URL |
|---------|-----|
| Aplicación | http://localhost:3000 |
| API | http://localhost:5000/api |
| API Health | http://localhost:5000/api/health |
| MongoDB Local | mongodb://localhost:27017 |

## 📚 Documentación Adicional

- `DOCUMENTACION_COMPLETA.md` - Documentación detallada
- `GUIA_USO.md` - Cómo usar la aplicación
- `API_EJEMPLOS.http` - Ejemplos de llamadas a la API
- `MONGODB_SETUP.md` - Configuración de MongoDB Atlas
- `README.md` - Descripción del proyecto

## 🎓 Próximos Pasos Recomendados

1. **Crear preguntas** - Accede a `/admin` para crear más preguntas
2. **Agregar usuarios** - Registra varios usuarios para probar el ranking
3. **Probar la API** - Usa Postman para hacer llamadas HTTP
4. **Personalizar** - Cambia colores, agrupa preguntas, etc.

## 💡 Tips

- El servidor debe estar corriendo en http://localhost:5000
- El cliente se conecta automáticamente si está correctamente configurado
- Cada usuario puede responder solo una pregunta por día
- Las respuestas incorrectas restan 5 puntos
- El ranking se actualiza en tiempo real

## 🚀 Despliegue (Después)

Cuando estés listo para publicar:

1. **Backend en Heroku**
2. **Frontend en Vercel o Netlify**
3. **Base de datos en MongoDB Atlas**

Ver `DOCUMENTACION_COMPLETA.md` para instrucciones detalladas.

---

¡Listo! Si todo funciona correctamente, ¡ya tienes Friends Trivia ejecutándose! 🎉
