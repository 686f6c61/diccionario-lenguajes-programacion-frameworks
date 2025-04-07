#!/bin/bash

# ============================================================
# Script para iniciar el Diccionario de Lenguajes y Frameworks
# ============================================================

echo -e "\e[1;34m"
echo "  _____  _            _                         _        "
echo " |  __ \(_)          (_)                       (_)       "
echo " | |  | |_  ___ _ __  _  ___  _ __   __ _ _ __ _  ___    "
echo " | |  | | |/ __| '_ \| |/ _ \| '_ \ / _\` | '__| |/ _ \\  "
echo " | |__| | | (__| | | | | (_) | | | | (_| | |  | | (_) |  "
echo " |_____/|_|\___|_| |_|_|\___/|_| |_|\__,_|_|  |_|\___/   "
echo "                                                          "
echo " Lenguajes de Programación y Frameworks (225+ y 300+)     "
echo -e "\e[0m"

# Verificar que estamos en el directorio correcto
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "\e[1;36m➤ Iniciando aplicación...\e[0m"
echo -e "\e[90m  Directorio: $SCRIPT_DIR\e[0m"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "\e[1;31m✗ Error: Node.js no está instalado\e[0m"
    echo -e "\e[33m  Por favor, instala Node.js desde https://nodejs.org\e[0m"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "\e[32m✓ Node.js detectado: $NODE_VERSION\e[0m"

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo -e "\e[1;33m⚠ Dependencias no encontradas\e[0m"
    echo -e "\e[36m➤ Instalando dependencias...\e[0m"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "\e[1;31m✗ Error instalando dependencias\e[0m"
        exit 1
    fi
    
    echo -e "\e[32m✓ Dependencias instaladas correctamente\e[0m"
else
    echo -e "\e[32m✓ Dependencias ya instaladas\e[0m"
fi

# Iniciar la aplicación
echo ""
echo -e "\e[1;36m➤ Iniciando el servidor de desarrollo...\e[0m"
echo -e "\e[33m  La aplicación se abrirá automáticamente en tu navegador\e[0m"
echo -e "\e[33m  Presiona Ctrl+C para detener el servidor cuando termines\e[0m"
echo ""
echo -e "\e[32m✓ URL: \e[1;32mhttp://localhost:3000\e[0m"
echo ""

npm start 