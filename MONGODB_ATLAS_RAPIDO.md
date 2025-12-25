# ⚡ CONFIGURACIÓN RÁPIDA - MongoDB Atlas

Si no deseas instalar MongoDB localmente, esta es la forma más rápida de tener una base de datos en la nube.

---

## Paso 1: Crear Cuenta (2 minutos)

1. Ve a: https://www.mongodb.com/cloud/atlas
2. Click en "Try Free"
3. Crea una cuenta con tu email
4. Confirma tu email

---

## Paso 2: Crear Cluster (3 minutos)

1. En el dashboard, click en "Create"
2. Selecciona "Serverless" (opción gratuita)
3. Selecciona la región más cercana (ej: N. Virginia)
4. Click en "Create Deployment"
5. Espera ~2 minutos mientras se crea

---

## Paso 3: Obtener Cadena de Conexión (5 minutos)

### Crear Usuario de Base de Datos
1. En el menú izquierdo, click en "Database Access"
2. Click en "Add New Database User"
3. Selecciona "Password"
4. **Username**: trivia_user (o lo que prefieras)
5. **Password**: Usa "Autogenerate Secure Password"
6. Copia la contraseña en algún lugar seguro
7. Click en "Add User"

### Obtener Connection String
1. En el menú, click en "Deployment"
2. Click en tu cluster
3. Click en "Connect"
4. Selecciona "Drivers"
5. Selecciona "Node.js" versión "4.0 or later"
6. Copia la connection string

La URL se verá algo como:
```
mongodb+srv://trivia_user:<password>@cluster0.xxxxx.mongodb.net/friends-trivia?retryWrites=true&w=majority
```

---

## Paso 4: Configurar en el Proyecto (2 minutos)

1. Abre `server/.env`
2. Reemplaza la línea MONGODB_URI:

**Antes:**
```
MONGODB_URI=mongodb://localhost:27017/friends-trivia
```

**Después:**
```
MONGODB_URI=mongodb+srv://trivia_user:TU_CONTRASEÑA@cluster0.xxxxx.mongodb.net/friends-trivia?retryWrites=true&w=majority
```

**Importante**: Reemplaza `TU_CONTRASEÑA` con la contraseña que generaste

---

## Paso 5: Agregar IP a Whitelist (3 minutos)

1. En Atlas, ve a "Network Access"
2. Click en "Add IP Address"
3. Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
4. Click en "Confirm"

**Nota**: En producción, agradegarías solo tu IP del servidor

---

## Paso 6: Verificar Conexión (5 minutos)

1. En tu terminal:
   ```bash
   cd server
   npm run dev
   ```

2. Deberías ver:
   ```
   Servidor ejecutándose en puerto 5000
   MongoDB conectado: cluster0.xxxxx.mongodb.net
   ```

3. Si no ves "MongoDB conectado", revisa:
   - La URL en `.env` es correcta
   - La contraseña no tiene caracteres especiales o están escapados
   - Tu IP está en el whitelist

---

## Prueba de Funcionamiento (2 minutos)

1. Abre otra terminal:
   ```bash
   cd client
   npm start
   ```

2. La aplicación debería funcionar normalmente

3. Crea una cuenta de prueba

4. Si funciona, ¡tu BD está conectada! ✅

---

## Troubleshooting Rápido

### Error: "connect ECONNREFUSED"
- La URL en `.env` es incorrecta
- Solución: Copia la URL nuevamente desde Atlas

### Error: "authentication failed"
- La contraseña es incorrecta
- Solución: Revisa que la contraseña sea exacta

### Error: "IP address ... is not allowed"
- Tu IP no está en whitelist
- Solución: Agrega tu IP en Network Access de Atlas

### Error: "User ... is not authorized"
- El usuario de la BD no existe
- Solución: Crea nuevamente el usuario en Database Access

---

## URLs Importantes

### Panel de Atlas
```
https://account.mongodb.com/account/login
```

### Monitorear tu Base de Datos
1. Ve a tu cluster en Atlas
2. Click en "Collections"
3. Ahí ves todas tus colecciones en tiempo real

### Gestionar Datos
1. Click en "Browse Collections"
2. Selecciona la colección
3. Puedes ver, editar, eliminar documentos

---

## Limites Gratuitos (Importante)

- ⚠️ **Almacenamiento**: 512 MB
- ⚠️ **Conexiones**: Limitadas
- ⚠️ **Velocidad**: Más lenta que local (pero aceptable)

Para una aplicación grande, necesitarás actualizar a un plan pagado.

---

## Alternativas

Si Atlas no te funciona, puedes:

1. **MongoDB Local**
   - Instalar en tu PC
   - Más rápido
   - Solo en desarrollo

2. **Otras Bases de Datos**
   - Firebase (Google)
   - AWS DynamoDB
   - Azure Cosmos DB

---

## Pasos Resumidos

```
1. Ir a mongodb.com/cloud/atlas
2. Crear cuenta
3. Crear cluster serverless
4. Crear usuario de BD
5. Obtener connection string
6. Pegar en server/.env
7. Agregar IP al whitelist
8. Probar con npm run dev
```

**Tiempo total: ~20 minutos**

---

## Seguridad

✅ Buenas prácticas:
- No compartir la connection string
- Guardar contraseña en .env
- Usar whitelist de IPs en producción
- Usar contraseñas fuertes

❌ Evitar:
- Poner contraseña en código
- Compartir .env
- Usar 0.0.0.0/0 en producción

---

## Siguiente Paso

Una vez conectado a MongoDB Atlas:
1. Abre `INICIO_RAPIDO.md` para continuar
2. El resto del proyecto funciona igual
3. No necesitas cambiar nada más

---

¡Listo! Tu base de datos en la nube está configurada. 🎉
