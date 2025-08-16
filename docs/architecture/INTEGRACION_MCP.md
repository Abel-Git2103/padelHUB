# 🔧 Integración MCP con VS Code - PadelHUB

## 📋 Configuración Completada

### ✅ Archivos Configurados

1. **`.vscode/settings.json`** - Configuración de VS Code para MCP
2. **`.vscode/tasks.json`** - Tareas para gestionar el servidor MCP  
3. **`.vscode/launch.json`** - Configuración de debugging
4. **`.vscode/extensions.json`** - Extensiones recomendadas
5. **`claude_desktop_config.json`** - Configuración para Claude Desktop

### 🚀 Comandos Disponibles

#### Desde VS Code (Ctrl+Shift+P → Tasks: Run Task)

- **"Start MCP Server"** - Inicia servidor en modo producción
- **"Start MCP Server (Dev)"** - Inicia con hot reload 
- **"Build MCP Server"** - Compila TypeScript a JavaScript
- **"Test MCP Tools"** - Ejecuta pruebas de herramientas

#### Desde Terminal

```bash
# En el directorio mcp-server/
npm run start    # Producción
npm run dev      # Desarrollo con watch
npm run build    # Compilar
```

### 🔧 Configuración Manual (Si es necesario)

#### Para Claude Desktop:

1. Abre Claude Desktop
2. Ve a Settings → Developer  
3. Activa "Model Context Protocol"
4. Agrega la configuración del archivo `claude_desktop_config.json`

#### Para VS Code con extensión MCP:

La configuración ya está en `.vscode/settings.json`:

```json
{
  "padelhub.mcp.enable": true,
  "padelhub.mcp.serverPath": "./mcp-server/dist/index.js",
  "padelhub.mcp.autoStart": true
}
```

### 🛠️ Debugging

#### Opción 1: VS Code Debugger
- Presiona `F5` o ve a Run and Debug
- Selecciona "Debug MCP Server" o "Debug MCP Server (TypeScript)"

#### Opción 2: Console logs
El servidor MCP incluye logs informativos:
```
[PadelHub MCP Server] Servidor iniciado correctamente
```

### 🔌 Herramientas MCP Disponibles

1. **`get_project_structure`** - Estructura del proyecto
2. **`read_file_content`** - Leer archivos  
3. **`get_backend_apis`** - APIs del backend
4. **`get_frontend_components`** - Componentes Angular
5. **`search_code`** - Búsqueda en código

### 🚨 Solución de Problemas

#### El servidor no inicia:
```bash
cd mcp-server
npm install
npm run build
npm run start
```

#### Error de permisos:
```bash
# En PowerShell como administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Verificar que funciona:
```bash
# En mcp-server/
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

### 📖 Uso Práctico

#### Ejemplo con Claude Desktop:
1. Instala la configuración
2. Reinicia Claude Desktop  
3. En chat, menciona: "Usa el servidor MCP de PadelHUB para..."

#### Ejemplo en VS Code:
1. Ejecuta tarea "Start MCP Server (Dev)"
2. El servidor queda disponible para otras herramientas
3. Usa Command Palette para interactuar

---

**🎯 ¡La integración MCP está completamente configurada y lista para usar!**

## 📞 Scripts de Ayuda

- `configurar-mcp.bat` - Configuración automática completa
- `lanzar-mcp.bat` - Lanzar servidor en producción  
- `mcp-dev.bat` - Lanzar en modo desarrollo
- `test-1-estructura.bat` a `test-5-buscar.bat` - Pruebas individuales
