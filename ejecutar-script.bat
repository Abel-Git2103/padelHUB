@echo off
setlocal

REM Script de conveniencia para ejecutar scripts de utilidades en Windows
REM Uso: ejecutar-script.bat nombre-del-script

if "%1"=="" (
    echo 📋 Scripts disponibles:
    echo ======================
    for %%f in (scripts\*.js) do echo %%~nf
    echo.
    echo 💡 Uso: ejecutar-script.bat nombre-del-script
    echo 🔍 Ejemplo: ejecutar-script.bat verificar-usuarios
    exit /b 1
)

set SCRIPT_NAME=%1

REM Agregar extensión .js si no la tiene
echo %SCRIPT_NAME% | findstr /C:".js" >nul
if errorlevel 1 set SCRIPT_NAME=%SCRIPT_NAME%.js

REM Verificar si el script existe
if not exist "scripts\%SCRIPT_NAME%" (
    echo ❌ Error: El script 'scripts\%SCRIPT_NAME%' no existe
    echo.
    echo 📋 Scripts disponibles:
    for %%f in (scripts\*.js) do echo %%~nxf
    exit /b 1
)

echo 🚀 Ejecutando: %SCRIPT_NAME%
echo =========================
cd scripts && node "%SCRIPT_NAME%"
