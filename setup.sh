#!/bin/bash

# Script para instalar y preparar el proyecto

echo "================================================"
echo "  Friends Trivia - Setup"
echo "================================================"

# Backend setup
echo ""
echo "📦 Instalando dependencias del servidor..."
cd server
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creando archivo .env del servidor..."
    cp .env.example .env
    echo "⚠️  Por favor, configura las variables en server/.env"
fi

cd ..

# Frontend setup
echo ""
echo "📦 Instalando dependencias del cliente..."
cd client
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creando archivo .env del cliente..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
fi

cd ..

echo ""
echo "================================================"
echo "  ✅ Setup completado!"
echo "================================================"
echo ""
echo "Para iniciar la aplicación:"
echo ""
echo "Terminal 1 (Servidor):"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Cliente):"
echo "  cd client"
echo "  npm start"
echo ""
echo "Asegúrate de tener MongoDB corriendo localmente o configurado en .env"
echo ""
