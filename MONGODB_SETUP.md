/* 
  Alternativa: Usar MongoDB Atlas (nube) sin instalar MongoDB localmente

  Si no deseas instalar MongoDB en tu máquina, sigue estos pasos:

  1. Crea una cuenta gratuita en: https://www.mongodb.com/cloud/atlas
  
  2. Crea un nuevo cluster:
     - Selecciona la región más cercana
     - Elige la opción gratuita (M0)
  
  3. Obtén la URI de conexión:
     - Ve a "Connect" en tu cluster
     - Selecciona "Connect your application"
     - Copia la URI (tendrá formato: mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombredb)
  
  4. Reemplaza en server/.env:
     MONGODB_URI=tu_uri_de_mongodb_atlas
  
  5. Asegúrate de que tu IP esté en la whitelist:
     - En Atlas, ve a "Network Access"
     - Agrega tu IP o permite acceso desde cualquier lugar (0.0.0.0/0)

  Ejemplo de URI:
  mongodb+srv://usuario:contraseña@cluster0.mongodb.net/friends-trivia?retryWrites=true&w=majority

  Beneficios de usar MongoDB Atlas:
  - No necesitas instalar MongoDB localmente
  - Acceso desde cualquier lugar
  - Datos persisten en la nube
  - Fácil de escalar
  - Tiene plan gratuito

  Para desarrollo local sin Base de Datos:
  Si quieres hacer pruebas sin MongoDB, puedes:
  
  1. Crear un mock service que simule las respuestas
  2. Usar un archivo JSON local para almacenar datos
  3. Usar SQLite en lugar de MongoDB

  Pero la recomendación es usar MongoDB Atlas gratuitamente.
*/
