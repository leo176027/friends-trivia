#!/bin/bash

echo "🚀 Iniciando script de despliegue..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Preparando proyecto para deployment...${NC}"

# Verificar que estemos en el directorio correcto
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo -e "${RED}❌ Error: Debes ejecutar este script desde la raíz del proyecto${NC}"
    exit 1
fi

# Crear .gitignore si no existe
if [ ! -f ".gitignore" ]; then
    echo -e "${BLUE}📝 Creando .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
.env.production
server/.env
client/.env

# Production builds
build/
dist/
client/build/
server/dist/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db
EOF
    echo -e "${GREEN}✅ .gitignore creado${NC}"
fi

# Verificar que existe .env.example
if [ ! -f ".env.example" ]; then
    echo -e "${RED}⚠️  Advertencia: No se encontró .env.example${NC}"
fi

# Inicializar git si no está inicializado
if [ ! -d ".git" ]; then
    echo -e "${BLUE}🔧 Inicializando repositorio Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit - Friends Trivia App"
    echo -e "${GREEN}✅ Git inicializado${NC}"
else
    echo -e "${GREEN}✅ Repositorio Git ya existe${NC}"
fi

echo ""
echo -e "${GREEN}✅ Proyecto preparado para deployment!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos pasos:${NC}"
echo "1. Crea un repositorio en GitHub"
echo "2. Ejecuta:"
echo "   git remote add origin https://github.com/TU-USUARIO/friends-trivia.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Ve a render.com o vercel.com y conecta tu repositorio"
echo ""
echo -e "${BLUE}📖 Lee DEPLOYMENT.md para instrucciones detalladas${NC}"
