@echo off
echo ====================================
echo  🔧 CONFIGURANDO INTEGRACIÓN MCP
echo ====================================
echo.

echo 📋 Paso 1: Verificando estructura del proyecto...
if not exist "mcp-server" (
    echo ❌ Error: Directorio mcp-server no encontrado
    pause
    exit /b 1
)

echo ✅ Estructura verificada

echo.
echo 📋 Paso 2: Compilando servidor MCP...
cd /d "mcp-server"
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Error compilando servidor MCP
    pause
    exit /b 1
)

echo ✅ Servidor MCP compilado

cd /d ..

echo.
echo 📋 Paso 3: Configuración para Claude Desktop
echo.
echo Para usar el servidor MCP en Claude Desktop:
echo 1. Abre Claude Desktop
echo 2. Ve a Settings (⚙️)
echo 3. En "Developer", activa "Model Context Protocol"
echo 4. Copia este contenido en tu archivo de configuración:
echo.
echo {
echo   "mcpServers": {
echo     "padelhub": {
echo       "command": "node",
echo       "args": ["%cd%\\mcp-server\\dist\\index.js"]
echo     }
echo   }
echo }
echo.

echo 📋 Paso 4: Verificando tareas VS Code...
if exist ".vscode\tasks.json" (
    echo ✅ Tareas VS Code configuradas
) else (
    echo ⚠️  Tareas VS Code no encontradas
)

echo.
echo 📋 Paso 5: Probando servidor MCP...
echo.
echo 🧪 Ejecutando prueba rápida...
cd /d "mcp-server"
echo {"jsonrpc":"2.0","id":1,"method":"tools/list"} | node dist/index.js > nul 2>&1
if %errorlevel% eq 0 (
    echo ✅ Servidor MCP funciona correctamente
) else (
    echo ⚠️  Advertencia: El servidor puede tener problemas
)

cd /d ..

echo.
echo ==========================================
echo  🎉 CONFIGURACIÓN COMPLETADA
echo ==========================================
echo.
echo 🔧 Comandos VS Code disponibles:
echo   - Ctrl+Shift+P → "Tasks: Run Task" → "Start MCP Server"
echo   - Ctrl+Shift+P → "Tasks: Run Task" → "Start MCP Server (Dev)"
echo   - Ctrl+Shift+P → "Tasks: Run Task" → "Build MCP Server"
echo   - Ctrl+Shift+P → "Tasks: Run Task" → "Test MCP Tools"
echo.
echo 🚀 Para iniciar manualmente:
echo   - Producción: npm run start (en mcp-server/)
echo   - Desarrollo: npm run dev (en mcp-server/)
echo.
echo 📖 Archivos de configuración creados:
echo   - .vscode/settings.json (configuración MCP)
echo   - .vscode/tasks.json (tareas actualizadas)
echo   - .vscode/launch.json (debugging)
echo   - claude_desktop_config.json (Claude Desktop)
echo.

pause
