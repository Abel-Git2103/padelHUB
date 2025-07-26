#!/bin/bash

# Script de conveniencia para ejecutar scripts de utilidades
# Uso: ./ejecutar-script.sh nombre-del-script

if [ $# -eq 0 ]; then
    echo "📋 Scripts disponibles:"
    echo "======================"
    ls -1 scripts/*.js | sed 's/scripts\///g' | sed 's/\.js//g'
    echo ""
    echo "💡 Uso: ./ejecutar-script.sh nombre-del-script"
    echo "🔍 Ejemplo: ./ejecutar-script.sh verificar-usuarios"
    exit 1
fi

SCRIPT_NAME="$1"

# Agregar extensión .js si no la tiene
if [[ ! $SCRIPT_NAME == *.js ]]; then
    SCRIPT_NAME="$SCRIPT_NAME.js"
fi

# Verificar si el script existe
if [ ! -f "scripts/$SCRIPT_NAME" ]; then
    echo "❌ Error: El script 'scripts/$SCRIPT_NAME' no existe"
    echo ""
    echo "📋 Scripts disponibles:"
    ls -1 scripts/*.js | sed 's/scripts\///g'
    exit 1
fi

echo "🚀 Ejecutando: $SCRIPT_NAME"
echo "========================="
cd scripts && node "$SCRIPT_NAME"
