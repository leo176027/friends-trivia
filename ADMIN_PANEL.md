# 🛠️ Panel Administrativo - Friends Trivia

## Acceso al Panel Admin

### Credenciales por Defecto:
```
👤 Usuario: admin
📧 Email: admin@friendstrivia.com
🔐 Contraseña: Admin123!
```

## Cómo Acceder:

### 1️⃣ Iniciar Sesión
- Abre http://localhost:3000
- Haz clic en **🔓 Login**
- Ingresa las credenciales admin
- Haz clic en **✨ Iniciar Sesión**

### 2️⃣ Ir al Panel Admin
- Una vez autenticado, verás un nuevo botón en el navbar: **🛠️ Admin**
- Haz clic en él para acceder al panel

### 3️⃣ Crear Preguntas
En el panel admin podrás:
- ✍️ Escribir una nueva pregunta
- 4️⃣ Agregar 4 opciones de respuesta
- ✅ Marcar cuál es la respuesta correcta
- 🎯 Establecer dificultad (Fácil/Medio/Difícil)
- ⭐ Asignar puntos a la pregunta
- 📤 Guardar la pregunta

## Características de Seguridad:

✅ **Solo los admins pueden:**
- Crear preguntas diarias
- Ver todas las preguntas
- Acceder a /admin

✅ **Los usuarios normales:**
- No ven el botón 🛠️ Admin
- Si intentan acceder a /admin, son redirigidos a /quiz
- Solo pueden responder preguntas

## Crear Más Administradores:

Si necesitas crear otro usuario administrador, ejecuta:

```bash
cd server
node createAdmin.js
```

Nota: Si el usuario admin ya existe, el script te lo indicará.

## Cambiar Contraseña del Admin:

⚠️ **IMPORTANTE**: En producción, debes cambiar la contraseña del admin.

Para cambiar la contraseña manualmente:
1. Abre MongoDB Atlas/Local
2. Encuentra la colección `users`
3. Busca el usuario con `username: "admin"`
4. Genera un hash bcryptjs de tu nueva contraseña
5. Actualiza el documento

## Crear Usuario Admin Personalizado:

Puedes editar `server/createAdmin.js` para cambiar:
- Username
- Email
- Contraseña

Y ejecutar nuevamente el script.

## Protección de Rutas:

El backend verifica automáticamente:
- ✅ Token JWT válido
- ✅ Usuario tiene role: "admin"
- ✅ Solo admins pueden hacer POST a `/api/questions`

Si intentas crear una pregunta como usuario normal, recibirás:
```json
{
  "message": "Acceso denegado. Solo administradores pueden acceder"
}
```

---

📌 **Próximas Mejoras:**
- Panel de administración mejorado con vista de todas las preguntas
- Editar/Eliminar preguntas existentes
- Gestión de usuarios desde el panel
- Reportes y estadísticas
