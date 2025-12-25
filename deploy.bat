@echo off
echo.
echo ========================================
echo   PREPARANDO PROYECTO PARA DEPLOYMENT
echo ========================================
echo.

REM Verificar que estemos en el directorio correcto
if not exist "client\" (
    echo ERROR: Debes ejecutar este script desde la raiz del proyecto
    pause
    exit /b 1
)

if not exist "server\" (
    echo ERROR: Debes ejecutar este script desde la raiz del proyecto
    pause
    exit /b 1
)

echo [1/4] Verificando archivos necesarios...

REM Verificar .env.example
if not exist ".env.example" (
    echo ADVERTENCIA: No se encontro .env.example
)

REM Verificar DEPLOYMENT.md
if exist "DEPLOYMENT.md" (
    echo [OK] DEPLOYMENT.md encontrado
) else (
    echo ERROR: No se encontro DEPLOYMENT.md
)

echo.
echo [2/4] Verificando Git...

REM Inicializar git si no existe
if not exist ".git\" (
    echo Inicializando repositorio Git...
    git init
    git add .
    git commit -m "Initial commit - Friends Trivia App"
    echo [OK] Git inicializado
) else (
    echo [OK] Git ya esta configurado
)

echo.
echo [3/4] Instalando dependencias del servidor...
cd server
call npm install
cd ..

echo.
echo [4/4] Instalando dependencias del cliente...
cd client
call npm install
cd ..

echo.
echo ========================================
echo   PROYECTO LISTO PARA DEPLOYMENT!
echo ========================================
echo.
echo Proximos pasos:
echo.
echo 1. Crea un repositorio en GitHub
echo 2. Ejecuta:
echo    git remote add origin https://github.com/TU-USUARIO/friends-trivia.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Ve a render.com o vercel.com y conecta tu repositorio
echo.
echo Lee DEPLOYMENT.md para instrucciones detalladas
echo.
pause
