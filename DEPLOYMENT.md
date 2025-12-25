# 🚀 Guía de Despliegue - Friends Trivia

## 📋 Requisitos Previos
- Cuenta GitHub (gratis)
- Cuenta Vercel (gratis)
- Cuenta Render o Railway (gratis)

---

## 🎯 Opción 1: Despliegue Completo (Recomendado)

### **Backend en Render.com** (Gratis, sin tarjeta)

1. **Ve a [render.com](https://render.com)**
   - Regístrate con GitHub

2. **Crea un nuevo Web Service**
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub
   - Selecciona la carpeta `server`

3. **Configuración:**
   ```
   Name: friends-trivia-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Variables de Entorno** (Environment Variables):
   ```
   MONGODB_URI = mongodb+srv://admin:7EdEMgRICEYR0Hgk@friends.hu3a06v.mongodb.net/
   JWT_SECRET = tu_secreto_super_seguro_cambiar_123456
   EMAIL_USER = tu_email@gmail.com
   EMAIL_PASS = tu_app_password_gmail
   PORT = 5000
   ```

5. **Deploy!** - Render lo desplegará automáticamente
   - Guarda la URL que te da (ej: `https://friends-trivia-api.onrender.com`)

---

### **Frontend en Vercel** (Gratis, ultra rápido)

1. **Ve a [vercel.com](https://vercel.com)**
   - Regístrate con GitHub

2. **Importa el proyecto**
   - Click en "Add New..." → "Project"
   - Importa tu repositorio
   - Selecciona la carpeta `client`

3. **Configuración:**
   ```
   Framework Preset: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   ```

4. **Variables de Entorno:**
   ```
   REACT_APP_API_URL = https://TU-API-DE-RENDER.onrender.com
   ```
   ⚠️ Reemplaza con la URL de tu backend de Render

5. **Deploy!** - Vercel lo desplegará en segundos
   - Tu app estará en: `https://tu-app.vercel.app`

---

## 🎯 Opción 2: Todo en Render.com

### **Backend** (igual que arriba)

### **Frontend en Render.com**

1. **Crea un Static Site**
   - Click en "New +" → "Static Site"
   
2. **Configuración:**
   ```
   Name: friends-trivia
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

3. **Variables de Entorno:**
   ```
   REACT_APP_API_URL = https://TU-API-DE-RENDER.onrender.com
   ```

---

## 🎯 Opción 3: Railway.app (Alternativa)

1. **Ve a [railway.app](https://railway.app)**
2. **Deploy desde GitHub** en 1 click
3. **Agrega las variables de entorno**
4. **Listo!**

---

## 🔧 Configuración Adicional Necesaria

### **1. Actualizar CORS en el Backend**

Después de desplegar, debes agregar tu URL de frontend a la whitelist de CORS.

En `server/server.js`, actualiza:
```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tu-app.vercel.app',  // ← Agrega tu URL de Vercel
    'https://tu-app.onrender.com' // ← O tu URL de Render
  ],
  credentials: true
}));
```

### **2. Actualizar la URL de la API en el Frontend**

Si no usaste la variable de entorno, actualiza manualmente:

`client/src/services/api.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://TU-API.onrender.com';
```

---

## 📝 Checklist Final

- [ ] Backend desplegado y funcionando
- [ ] MongoDB Atlas accesible (ya está ✅)
- [ ] Variables de entorno configuradas
- [ ] Frontend desplegado
- [ ] CORS configurado correctamente
- [ ] URL de la API actualizada en el frontend
- [ ] Email funcionando (opcional)
- [ ] Probar login/registro
- [ ] Probar quiz completo

---

## ⚠️ Notas Importantes

### **Render Free Tier:**
- El servidor se "duerme" después de 15 minutos de inactividad
- Primera carga puede tomar 30-50 segundos
- Para mantenerlo activo 24/7, necesitas plan pagado o usar un servicio de "ping" como [UptimeRobot](https://uptimerobot.com) (gratis)

### **MongoDB Atlas:**
- Ya está configurado ✅
- Permite 512MB gratis
- IP Whitelist: Asegúrate de tener "0.0.0.0/0" permitido para acceso desde cualquier IP

### **Emails:**
- Gmail requiere "App Password" (no tu contraseña normal)
- Genera uno en: Google Account → Security → 2-Step Verification → App passwords

---

## 🆘 Solución de Problemas

### Error: "Cannot connect to backend"
- Verifica que la URL del backend esté correcta
- Revisa que CORS incluya tu dominio de frontend

### Error: "MongoDB connection failed"
- Verifica que la MONGODB_URI sea correcta
- Asegúrate que la IP whitelist incluya "0.0.0.0/0"

### Backend muy lento en Render
- Normal en plan gratuito al despertar
- Considera Railway o plan pagado

---

## 💰 Costos

| Servicio | Plan Gratuito | Límites |
|----------|---------------|---------|
| Vercel | ✅ Ilimitado | 100GB ancho de banda/mes |
| Render | ✅ 750 horas/mes | Se duerme después de 15 min |
| Railway | ✅ $5 crédito/mes | ~500 horas |
| MongoDB Atlas | ✅ 512MB | Suficiente para miles de usuarios |

**Total: $0 al mes** 🎉

---

## 🚀 Despliegue en 5 Minutos

```bash
# 1. Sube tu código a GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/friends-trivia.git
git push -u origin main

# 2. Ve a Render.com → Conecta GitHub → Deploy backend
# 3. Ve a Vercel.com → Conecta GitHub → Deploy frontend
# 4. Actualiza las URLs
# 5. ¡Listo! 🎉
```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render/Vercel
2. Verifica las variables de entorno
3. Prueba localmente primero
4. Revisa la consola del navegador (F12)

¡Tu app estará online en minutos! 🚀
