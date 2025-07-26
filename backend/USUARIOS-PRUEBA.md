# Usuarios de Prueba - PadelHUB

## 👤 Credenciales de Acceso

### 🔑 Usuario Administrador
- **Email:** `admin@test.com`
- **Password:** `password123`
- **Rol:** `admin`
- **Rango:** `COBRE`

### 🎮 Usuario Jugador
- **Email:** `jugador@test.com`
- **Password:** `password123`
- **Rol:** `user`
- **Rango:** `BRONCE`

## 🛠️ Scripts de Base de Datos

### Verificar usuarios existentes:
```bash
cd backend
node verificar-usuarios.js
```

### Corregir rol de admin (si es necesario):
```bash
cd backend
node corregir-rol-admin.js
```

### Crear usuario inicial:
```bash
cd backend
node crear-usuario-prueba.js
```

## ✅ Estado Actual de la BBDD

Después de ejecutar `corregir-rol-admin.js`:

| Email | Rol | Rango | Estado |
|-------|-----|-------|--------|
| admin@test.com | admin | COBRE | ✅ Correcto |
| jugador@test.com | user | BRONCE | ✅ Correcto |

## 🐛 Problema Resuelto

**Problema inicial:** El usuario admin tenía el rol "JUGADOR" en la base de datos.

**Causa:** El script `crear-usuario-prueba.js` no establecía el campo `rol`.

**Solución:** Script `corregir-rol-admin.js` actualiza el rol correctamente.

---

*Última actualización: Enero 2025*
