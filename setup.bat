@echo off
REM Script para instalar y preparar el proyecto en Windows

cls
echo ================================================
echo   Friends Trivia - Setup
echo ================================================

REM Backend setup
echo.
echo Instalando dependencias del servidor...
cd server
call npm install

REM Crear archivo .env si no existe
if not exist .env (
    echo.
    echo Creando archivo .env del servidor...
    copy .env.example .env
    echo Por favor, configura las variables en server\.env
)

cd ..

REM Frontend setup
echo.
echo Instalando dependencias del cliente...
cd client
call npm install

REM Crear archivo .env si no existe
if not exist .env (
    echo.
    echo Creando archivo .env del cliente...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > .env
)

cd ..

echo.
echo ================================================
echo   ✓ Setup completado!
echo ================================================
echo.
echo Para iniciar la aplicacion:
echo.
echo Terminal 1 ^(Servidor^):
echo   cd server
echo   npm run dev
echo.
echo Terminal 2 ^(Cliente^):
echo   cd client
echo   npm start
echo.
echo Asegurate de tener MongoDB corriendo localmente o configurado en .env
echo.
pause
