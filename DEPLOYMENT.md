# 🚀 Guía de Deployment - PadelHUB

## ✅ **Solución al problema de múltiples package.json**

### 📁 **Package.json necesarios:**
1. **`/package.json`** - Controlador principal del monorepo
2. **`/backend/package.json`** - Dependencias del servidor NestJS  
3. **`/frontend/package.json`** - Configuración Angular
4. **`/shared/package.json`** - Tipos compartidos

---

## 🎯 **Comandos simplificados - DESDE LA RAÍZ DEL PROYECTO**

### 🚀 **Opción 1: Script npm (RECOMENDADO)**
```bash
npm run servidor
```
**¿Qué hace?** Instala dependencias → Compila shared → Compila backend → Inicia servidor

### 🚀 **Opción 2: Script batch (Windows)**
```bash
./servidor.bat
```

### 🚀 **Opción 3: Script shell (Linux/Mac)**
```bash
./servidor.sh
```

### 🏭 **Producción:**
```bash
npm run servidor:prod
```

### 🔧 **Solo setup (sin iniciar servidor):**
```bash
npm run servidor:setup
```

---

## 📍 **URLs importantes:**
- **API Backend**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs
- **Endpoints principales**: 
  - `/api/usuarios` - Gestión de usuarios
  - `/api/auth/login` - Autenticación
  - `/api/clubes` - Gestión de clubes

---

## 🛠️ **Si tienes problemas:**

1. **Limpiar todo:**
   ```bash
   npm run clean
   npm run servidor
   ```

2. **Solo instalar dependencias:**
   ```bash
   npm run install:all
   ```

3. **Verificar compilación:**
   ```bash
   npm run build:backend
   ```

---

## 📋 **Resumen:**
- ✅ **4 package.json necesarios** (no eliminar ninguno)
- ✅ **Ejecutar SIEMPRE desde la raíz** (`e:\Repositorios\FRONTEND\Angular 20\padelHUB`)
- ✅ **Un solo comando**: `npm run servidor`
- ✅ **Sin navegación entre directorios**
