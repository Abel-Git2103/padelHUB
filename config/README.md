# 📁 Configuración del Proyecto PadelHUB

Este directorio centraliza toda la configuración del proyecto para mantener una estructura organizada y fácil de mantener.

## 📋 Archivos de Configuración

### `project.json`
Configuración principal del proyecto que incluye:
- Información básica del proyecto
- Tecnologías utilizadas
- Workspaces del monorepo
- Scripts principales
- Características habilitadas

### `paths.json`
Configuración de rutas y referencias del monorepo:
- Paths de TypeScript para imports
- Referencias a workspaces
- Directorios del proyecto
- Ubicaciones de archivos importantes

### `environment.json`
Configuración de entornos:
- Puertos de desarrollo y producción
- Configuración de base de datos
- JWT y CORS
- Variables de entorno

### `tools.json`
Configuración de herramientas y automatización:
- Scripts organizados por categorías
- Herramientas de análisis
- Configuración MCP
- Configuración Docker

## 🚀 Uso

### Importar configuración en código
```typescript
import projectConfig from '../config/project.json';
import pathsConfig from '../config/paths.json';
import envConfig from '../config/environment.json';
```

### Referencias en package.json
Los scripts principales pueden hacer referencia a estos archivos:
```json
{
  "scripts": {
    "config:check": "node -e \"console.log(JSON.stringify(require('./config/project.json'), null, 2))\""
  }
}
```

## 📝 Beneficios

- ✅ **Centralización**: Toda la configuración en un solo lugar
- ✅ **Mantenibilidad**: Fácil de actualizar y mantener
- ✅ **Consistencia**: Configuración consistente en todo el proyecto
- ✅ **Documentación**: Auto-documentado con archivos JSON estructurados
- ✅ **Reutilización**: Configuración reutilizable en diferentes partes del proyecto

## 🔧 Actualizaciones

Cuando se agregue nueva configuración:
1. Determinar el archivo apropiado (`project.json`, `paths.json`, `environment.json`, o `tools.json`)
2. Agregar la configuración siguiendo el patrón existente
3. Actualizar este README si es necesario
4. Verificar que no haya conflictos con configuraciones existentes
