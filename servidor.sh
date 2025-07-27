#!/bin/bash
echo "===================================="
echo " 🚀 INICIANDO SERVIDOR PADELHUB"
echo "===================================="

echo ""
echo "📦 Instalando dependencias..."
npm run install:all

echo ""
echo "🔧 Compilando shared..."
npm run build:shared

echo ""
echo "🔧 Compilando backend..."
npm run build:backend

echo ""
echo "🚀 Iniciando servidor en modo desarrollo..."
echo "Backend estará disponible en: http://localhost:3000"
echo "Frontend estará disponible en: http://localhost:4200"
echo "Documentación Swagger en: http://localhost:3000/api/docs"
echo ""

npm run dev
