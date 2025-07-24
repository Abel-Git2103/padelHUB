@echo off
echo ====================================
echo  🚀 INICIANDO SERVIDOR PADELHUB
echo ====================================

echo.
echo 📦 Instalando dependencias...
call npm run install:all

echo.
echo 🔧 Compilando shared...
call npm run build:shared

echo.
echo 🔧 Compilando backend...
call npm run build:backend

echo.
echo 🚀 Iniciando servidor en modo desarrollo...
echo El servidor estará disponible en: http://localhost:3000
echo Documentación Swagger en: http://localhost:3000/api/docs
echo.

call npm run dev:backend

pause
