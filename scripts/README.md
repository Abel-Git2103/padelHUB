# Scripts de Utilidades - PadelHUB

Esta carpeta contiene scripts de utilidad esenciales para la gestión de la base de datos y mantenimiento del proyecto PadelHUB.

## 📋 Scripts Activos

### 👤 Gestión de Usuarios
- **`actualizar-usuario.js`** - Actualiza información específica de un usuario
- **`crear-usuario-prueba.js`** - Crea usuarios de prueba para testing
- **`crear-usuarios-roles.js`** - Gestiona la creación de usuarios con roles específicos

### 🔍 Verificación del Sistema
- **`verificar-credenciales.js`** - Verifica que las credenciales de los usuarios sean correctas
- **`verificar-usuario.js`** - Verifica información específica de un usuario
- **`verificar-usuarios.js`** - Lista y verifica información de todos los usuarios
- **`verificar-clubes.js`** - Verifica el estado y configuración de los clubes
- **`verificar-horarios-club.js`** - Verifica los horarios de funcionamiento de los clubes

### 🧪 Testing Funcional
- **`test-crear-club.js`** - Test para la funcionalidad de creación de clubes
- **`test-frontend-error.js`** - Test para errores del frontend

## 🚀 Uso de Scripts

Ejecutar desde el directorio `scripts`:

```bash
cd scripts
node <nombre-script>.js
```

## 📁 Estructura

- **Scripts JS** - Scripts de Node.js para gestión del sistema
- **`batch/`** - Scripts batch (.bat) y shell (.sh) para automatización

## 📖 Documentación

Para más información sobre el proyecto, consultar la [documentación principal](../docs/README.md).

## ⚠️ Notas Importantes

- Todos los scripts se conectan a la base de datos MongoDB local (`mongodb://localhost:27017/padelhub`)
- Asegúrate de que MongoDB esté ejecutándose antes de usar los scripts
- Los scripts de corrección modifican datos en la base de datos, úsalos con precaución
- Siempre haz backup de tu base de datos antes de ejecutar scripts de corrección

## 🔗 Dependencias

Los scripts requieren las siguientes dependencias de Node.js:
- `mongoose` - Para conexión a MongoDB
- `bcryptjs` - Para manejo de contraseñas hasheadas

Estas dependencias ya están instaladas en el proyecto backend.
