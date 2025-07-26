# Implementación de Routing por Roles y Layouts Responsivos

## Resumen de Cambios

Se ha implementado un sistema de routing por roles que proporciona experiencias diferenciadas para usuarios y administradores, manteniendo todos los estilos existentes.

## Estructura Implementada

### 1. Layouts por Rol

#### Layout Móvil (Jugadores)
- **Ubicación**: `src/app/layouts/mobile-layout/`
- **Características**:
  - Diseño optimizado para móviles
  - Navegación inferior fija
  - Header compacto con logo y usuario
  - Contenido scrolleable
  - Responsive para tablets

#### Layout Escritorio (Administradores)
- **Ubicación**: `src/app/layouts/desktop-layout/`
- **Características**:
  - Sidebar lateral con navegación completa
  - Sidebar colapsable para móviles
  - Header móvil cuando el sidebar está colapsado
  - Diseño optimizado para escritorio pero responsive

### 2. Sistema de Rutas

#### Rutas para Jugadores (`/jugador/*`)
```
/jugador/tablero    - Dashboard del jugador
/jugador/perfil     - Perfil del jugador
/jugador/clubes     - Clubes disponibles
/jugador/rankings   - Rankings y clasificaciones
```

#### Rutas para Administradores (`/admin/*`)
```
/admin/dashboard     - Panel de administración
/admin/usuarios      - Gestión de usuarios
/admin/clubes        - Gestión de clubes
/admin/rankings      - Gestión de rankings
/admin/partidos      - Gestión de partidos
/admin/configuracion - Configuración del sistema
```

### 3. Guards de Seguridad

#### Guard de Autenticación
- Verifica si el usuario está autenticado
- Redirige a login si no está autenticado

#### Guard de Roles
- Verifica si el usuario tiene el rol adecuado para la ruta
- Redirige automáticamente según el rol del usuario

### 4. Componente de Redirección

Para mantener compatibilidad con rutas existentes, se creó un componente que:
- Detecta el rol del usuario
- Redirige automáticamente a la ruta correcta
- Muestra un loading durante la redirección

## Funcionalidades Implementadas

### 1. Redirección Automática por Rol
- Al hacer login, los usuarios son redirigidos automáticamente:
  - Administradores → `/admin/dashboard`
  - Jugadores → `/jugador/tablero`

### 2. Protección de Rutas
- Las rutas están protegidas por rol
- Intentar acceder a una ruta incorrecta redirige automáticamente

### 3. Experiencia Diferenciada
- **Jugadores**: Layout móvil con navegación inferior
- **Administradores**: Layout de escritorio con sidebar

### 4. Responsividad
- Ambos layouts son completamente responsivos
- El layout de admin se adapta a móviles con sidebar colapsable
- El layout móvil se centra en tablets

## Archivos Modificados

### Nuevos Archivos
- `src/app/guards/role.guard.ts`
- `src/app/layouts/mobile-layout/mobile-layout.component.*`
- `src/app/layouts/desktop-layout/desktop-layout.component.*`
- `src/app/components/redirect/redirect.component.ts`
- `src/app/components/admin/admin-dashboard/admin-dashboard.component.*`
- `src/app/components/admin/admin-*/admin-*.component.ts` (componentes básicos)

### Archivos Modificados
- `src/app/app.routes.ts` - Nuevo sistema de rutas por roles
- `src/app/services/auth.service.ts` - Redirección automática y métodos de rol
- `src/app/models/user.model.ts` - Tipos de rol más específicos
- `src/app/components/dashboard/dashboard.component.html` - Rutas actualizadas

## Estilos Preservados

Todos los estilos existentes se han mantenido:
- Paleta de colores verde (#2E7D32, #4CAF50)
- Componentes de tarjetas y navegación
- Iconografía SVG
- Animaciones y transiciones
- Responsive design

## Cómo Usar

### Para Desarrolladores

1. **Crear usuario admin**: Asegurar que en el backend hay usuarios con `rol: 'admin'`
2. **Crear usuario jugador**: Los usuarios normales tienen `rol: 'user'`

### Para Usuarios

1. **Login como Jugador**:
   - Automáticamente redirigido a layout móvil
   - Navegación inferior para fácil acceso en móvil

2. **Login como Admin**:
   - Automáticamente redirigido a panel de administración
   - Sidebar lateral con todas las funciones administrativas

## Próximos Pasos

1. Implementar funcionalidades reales en los componentes de admin
2. Conectar con APIs del backend
3. Agregar más roles si es necesario (moderador, etc.)
4. Implementar permisos granulares dentro de cada rol

## Notas Técnicas

- Todos los componentes utilizan Angular Standalone Components
- Se mantiene la arquitectura de signals para el estado
- Compatible con Angular 17+
- Lazy loading para optimización de carga
- Guard combinados para seguridad robusta
