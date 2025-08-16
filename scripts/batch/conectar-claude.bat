@echo off
echo =============================================
echo  🔗 VERIFICANDO CONEXIÓN CLAUDE DESKTOP MCP
echo =============================================
echo.

echo 📋 Paso 1: Verificando configuración Claude Desktop...
if exist "%APPDATA%\Claude\claude_desktop_config.json" (
    echo ✅ Archivo de configuración encontrado
    echo 📍 Ubicación: %APPDATA%\Claude\claude_desktop_config.json
) else (
    echo ❌ Archivo de configuración NO encontrado
    echo 💡 Ejecutando copia automática...
    copy "claude_desktop_config.json" "%APPDATA%\Claude\claude_desktop_config.json"
    if %errorlevel% eq 0 (
        echo ✅ Configuración copiada exitosamente
    ) else (
        echo ❌ Error copiando configuración
        pause
        exit /b 1
    )
)

echo.
echo 📋 Paso 2: Verificando servidor MCP...
cd /d "mcp-server"
if exist "dist\index.js" (
    echo ✅ Servidor MCP compilado
) else (
    echo ⚠️  Servidor no compilado, compilando...
    call npm run build
    if %errorlevel% eq 0 (
        echo ✅ Servidor compilado exitosamente
    ) else (
        echo ❌ Error compilando servidor
        pause
        exit /b 1
    )
)

echo.
echo 📋 Paso 3: Probando servidor MCP...
echo 🧪 Ejecutando prueba básica...
echo ^{"jsonrpc":"2.0","id":1,"method":"tools/list"^} | node dist/index.js >nul 2>&1
if %errorlevel% eq 0 (
    echo ✅ Servidor MCP funcionando correctamente
) else (
    echo ⚠️  Posible problema con el servidor MCP
)

cd /d ..

echo.
echo =============================================
echo  🎉 CONFIGURACIÓN COMPLETADA
echo =============================================
echo.
echo 📋 Próximos pasos:
echo.
echo 1️⃣ **Reinicia Claude Desktop** completamente:
echo    - Cierra Claude Desktop si está abierto
echo    - Ábrelo nuevamente
echo.
echo 2️⃣ **Verifica la conexión MCP**:
echo    - En Claude Desktop, debería aparecer un indicador MCP
echo    - Puedes preguntar: "¿Qué servidores MCP tienes disponibles?"
echo.
echo 3️⃣ **Prueba las herramientas**:
echo    - "Usa el servidor MCP PadelHUB para mostrar la estructura del proyecto"
echo    - "Lee el archivo package.json usando MCP"
echo    - "Busca el término 'Club' en el código usando MCP"
echo.
echo 🔧 **Herramientas MCP PadelHUB disponibles**:
echo    - get_project_structure    (Estructura del proyecto)
echo    - read_file_content        (Leer archivos)
echo    - get_backend_apis         (APIs del backend)
echo    - get_frontend_components  (Componentes Angular)
echo    - search_code              (Buscar en código)
echo.
echo 📍 **Ubicación configuración**: %APPDATA%\Claude\claude_desktop_config.json
echo 🖥️  **Servidor MCP**: e:\Repositorios\FRONTEND\Angular 20\padelHUB\mcp-server\dist\index.js
echo.

pause
