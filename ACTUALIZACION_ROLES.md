# Actualización del Sistema de Roles - PadelHUB

## 📋 Resumen de Cambios

Se ha actualizado el sistema de roles para usar **roles específicos en mayúsculas** definidos correctamente en el backend.

## 🔄 Roles del Sistema

### Roles Únicos (En Mayúsculas)
- **`JUGADOR`** - Usuarios que juegan pádel
- **`ADMIN_CLUB`** - Administradores de un club específico
- **`ADMIN_SISTEMA`** - Administradores con acceso completo al sistema

## 🛠️ Archivos Modificados

### 1. `role.guard.ts`
- ✅ Simplificado para trabajar directamente con los roles del backend
- ✅ Eliminada toda la lógica de normalización y compatibilidad legacy
- ✅ Verificación directa: `rol === rolRequerido`

### 2. `app.routes.ts`
- ✅ Rutas de jugadores: `data: { roles: ['JUGADOR'] }`
- ✅ Rutas admin generales: `data: { roles: ['ADMIN_SISTEMA', 'ADMIN_CLUB'] }`
- ✅ Rutas específicas sistema: `data: { roles: ['ADMIN_SISTEMA'] }`
- ✅ Rutas específicas club: `data: { roles: ['ADMIN_CLUB'] }`

### 3. `user.model.ts`
- ✅ Interfaz `Usuario` solo acepta roles válidos: `'JUGADOR' | 'ADMIN_CLUB' | 'ADMIN_SISTEMA'`

### 4. `admin-permissions.service.ts`
- ✅ Métodos simplificados que verifican roles directamente
- ✅ Eliminada lógica de `idClub` para determinar tipo de admin

### 5. `admin-redirect.component.ts`
- ✅ Redirección basada directamente en `usuario.rol`
- ✅ Eliminada dependencia de `AdminPermissionsService`

### 6. `roles.constants.ts`
- ✅ Solo define constantes para roles válidos
- ✅ Eliminadas funciones de normalización legacy

## 🔍 Lógica Simplificada

### Verificación de Roles
```typescript
// Directo y simple
const tieneRol = rolesRequeridos.some(rol => rol === usuario.rol);
```

### Redirección de Admins
```typescript
if (usuario.rol === 'ADMIN_SISTEMA') {
  // Ir a admin/system/dashboard
} else if (usuario.rol === 'ADMIN_CLUB') {
  // Ir a admin/club/dashboard
}
```

## 📚 Configuración de Rutas

```typescript
// Solo jugadores
data: { roles: ['JUGADOR'] }

// Cualquier admin
data: { roles: ['ADMIN_SISTEMA', 'ADMIN_CLUB'] }

// Solo admin sistema
data: { roles: ['ADMIN_SISTEMA'] }

// Solo admin club
data: { roles: ['ADMIN_CLUB'] }
```

## 🧪 Testing

Script actualizado `scripts/crear-usuarios-roles.js`:

```bash
cd scripts
node crear-usuarios-roles.js
```

### Usuarios de Prueba:
- **admin.sistema@test.com** - `ADMIN_SISTEMA`
- **admin.club@test.com** - `ADMIN_CLUB`
- **jugador@test.com** - `JUGADOR`

**Password:** `password123`

## ✅ Beneficios

1. **Simplicidad**: Sin lógica de normalización ni compatibilidad legacy
2. **Claridad**: Verificación directa de roles 
3. **Mantenibilidad**: Menos código, menos complejidad
4. **Rendimiento**: Sin procesamiento adicional de roles
5. **Confiabilidad**: El backend define los roles correctamente

## ⚠️ Requisitos

- **Backend debe enviar roles correctos**: `JUGADOR`, `ADMIN_CLUB`, `ADMIN_SISTEMA`
- **No se acepta rol genérico `admin`**: Debe ser específico
- **Sin compatibilidad legacy**: Solo roles definidos válidos
