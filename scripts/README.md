# Scripts de Utilidades - PadelHUB

Esta carpeta contiene scripts de utilidad para la gestión de la base de datos y debugging del proyecto PadelHUB.

## 📋 Lista de Scripts

### 🔧 Scripts de Corrección y Mantenimiento

- **`corregir-rol-admin.js`** - Corrige el rol del usuario admin de "JUGADOR" a "admin"

### 👤 Scripts de Gestión de Usuarios

- **`actualizar-usuario.js`** - Actualiza información específica de un usuario
- **`crear-usuario-prueba.js`** - Crea usuarios de prueba para testing
- **`create-test-user.js`** - Script alternativo para crear usuarios de prueba

### 🔍 Scripts de Verificación

- **`verificar-credenciales.js`** - Verifica que las credenciales de los usuarios sean correctas
- **`verificar-usuario.js`** - Verifica información específica de un usuario
- **`verificar-usuarios.js`** - Lista y verifica información de todos los usuarios

### 🐛 Scripts de Debug

- **`debug-login.js`** - Script para debuggear el proceso de login y autenticación

## 🚀 Cómo usar los scripts

Todos los scripts deben ejecutarse desde el directorio `scripts` con Node.js:

```bash
# Cambiar al directorio scripts
cd scripts

# Ejecutar un script
node nombre-del-script.js
```

### Ejemplos:

```bash
# Verificar credenciales de usuarios
node verificar-credenciales.js

# Ver todos los usuarios
node verificar-usuarios.js

# Debug del proceso de login
node debug-login.js
```

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
