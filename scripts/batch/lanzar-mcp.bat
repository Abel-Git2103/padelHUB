@echo off
echo ====================================
echo  🚀 INICIANDO SERVIDOR MCP PADELHUB
echo ====================================
echo.
echo 📡 Servidor MCP para proyecto PadelHUB
echo 🔧 Proporciona contexto y herramientas del proyecto
echo.

cd /d "e:\Repositorios\FRONTEND\Angular 20\padelHUB\mcp-server"
echo 🔄 Compilando servidor...
call npm run build

echo.
echo 🚀 Iniciando servidor MCP...
echo 📋 Herramientas disponibles:
echo   - get_project_structure: Estructura del proyecto
echo   - read_file_content: Leer archivos
echo   - get_backend_apis: APIs del backend
echo   - get_frontend_components: Componentes Angular
echo   - search_code: Buscar en el código
echo.

call npm run start

pause
