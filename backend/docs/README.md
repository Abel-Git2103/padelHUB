# 🏗️ Backend PadelHUB - Documentación

## 📋 Índice
- [Arquitectura](#arquitectura)
- [Modelos de Datos](#modelos-de-datos)
- [APIs Implementadas](#apis-implementadas)
- [Autenticación](#autenticación)
- [Base de Datos](#base-de-datos)
- [Instalación y Configuración](#instalación-y-configuración)

## 🏛️ Arquitectura

### Stack Tecnológico
- **Framework**: NestJS con TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator + class-transformer
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest

### Estructura de Carpetas
```
src/
├── auth/           # Módulo de autenticación
├── users/          # Gestión de usuarios
├── clubs/          # Gestión de clubes
├── matches/        # Gestión de partidos (próximo)
├── tournaments/    # Gestión de torneos (próximo)
├── rankings/       # Sistema de rankings (próximo)
├── wallet/         # Monedero virtual (próximo)
├── common/         # Utilidades compartidas
└── database/       # Configuración BD y seeds (próximo)
```

## 🗃️ Modelos de Datos

### Sistema de Rangos (💎🥇🥈🥉🟫)
```typescript
enum UserRank {
  COBRE = 'COBRE',     // 0-0.9 pts  - Principiante
  BRONCE = 'BRONCE',   // 1.0-1.9 pts - Amateur  
  PLATA = 'PLATA',     // 2.0-3.9 pts - Intermedio
  ORO = 'ORO',         // 4.0-5.9 pts - Avanzado
  PLATINO = 'PLATINO'  // 6.0+ pts   - Élite
}
```

### Modelos Implementados ✅
- **User**: Usuario base con perfil y estadísticas ✅
- **Club**: Entidad organizadora con gestión de miembros ✅

### Modelos Pendientes 📋
- **Match**: Partidos (Igualado/No Igualado/Amistoso)
- **Tournament**: Torneos con sistema de puntos
- **Ranking**: Rankings individuales y por club
- **Wallet**: Monedero virtual

## 🔐 Autenticación

### JWT Strategy ✅
- **Login**: POST `/auth/login` ✅
- **Register**: POST `/auth/register` ✅
- **Profile**: GET `/auth/profile` (protegido) ✅
- **Refresh**: POST `/auth/refresh` ✅
- **Change Password**: POST `/auth/change-password` ✅
- **Forgot Password**: POST `/auth/forgot-password` ✅
- **Reset Password**: POST `/auth/reset-password` ✅

### Roles del Sistema ✅
- **JUGADOR**: Usuario estándar
- **ADMIN_CLUB**: Administrador de club
- **ADMIN_SISTEMA**: Administrador de plataforma

## 📊 APIs Implementadas

### 👤 Users API ✅
- `POST /users` - Crear usuario
- `GET /users` - Listar usuarios (con filtros)
- `GET /users/:id` - Obtener usuario por ID
- `PATCH /users/:id` - Actualizar usuario
- `PATCH /users/:id/privacy` - Configuración de privacidad
- `PATCH /users/:id/rank` - Cambiar rango (admin)
- `POST /users/:id/join-club/:clubId` - Unirse a club
- `DELETE /users/:id/leave-club` - Salir de club
- `DELETE /users/:id` - Desactivar usuario

### 🏢 Clubs API ✅
- `POST /clubs` - Crear club (admin)
- `GET /clubs` - Listar clubes (con filtros)
- `GET /clubs/operational` - Clubes operacionales
- `GET /clubs/by-location` - Buscar por ubicación
- `GET /clubs/:id` - Obtener club por ID
- `PATCH /clubs/:id` - Actualizar club
- `PATCH /clubs/:id/status` - Cambiar estado (admin sistema)
- `POST /clubs/:id/administrators/:userId` - Agregar admin
- `DELETE /clubs/:id/administrators/:userId` - Remover admin

## 🗄️ Base de Datos

### Configuración MongoDB
- **URI**: `mongodb://localhost:27017/padelhub`
- **ODM**: Mongoose con esquemas TypeScript
- **Validaciones**: Integradas en los schemas

## ⚙️ Instalación y Configuración

### Variables de Entorno (.env)
```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/padelhub

# JWT
JWT_SECRET=tu_super_secreto_jwt_aqui_cambiar_en_produccion
JWT_REFRESH_SECRET=tu_super_secreto_refresh_aqui_cambiar_en_produccion
JWT_EXPIRE_TIME=1d

# Servidor
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:4200
```

### Comandos Disponibles
```bash
npm run start:dev    # Desarrollo con hot-reload
npm run build        # Build de producción
npm run test         # Tests unitarios
npm run seed         # Cargar datos de prueba (próximo)
```

---

## 📝 Log de Desarrollo

### 24/07/2025 - Inicio Backend ✅
- ✅ Estructura base de carpetas creada
- ✅ Documentación inicial establecida
- ✅ **COMPLETADO**: Modelos User y Club implementados
- ✅ **COMPLETADO**: Sistema de autenticación JWT completo
- ✅ **COMPLETADO**: APIs RESTful para Users y Clubs
- ✅ **COMPLETADO**: Guards de seguridad y roles
- ✅ **COMPLETADO**: Validaciones con DTOs
- ✅ **COMPLETADO**: Documentación Swagger integrada
- 📋 **SIGUIENTE**: Pruebas de las APIs y corrección de errores

---

## 🚀 Próximos Pasos

### Inmediatos (Esta semana)
1. **Probar APIs**: Verificar funcionamiento con Postman/Thunder Client
2. **Seeds de datos**: Crear datos de prueba para desarrollo
3. **Corrección de errores**: Resolver bugs encontrados en testing
4. **Optimizaciones**: Mejoras de rendimiento en consultas

### Mediano plazo (Próxima semana)  
1. **Matches API**: Sistema de partidos con tipos (Igualado/No Igualado/Amistoso)
2. **Tournament API**: Gestión de torneos con puntos mínimos
3. **Ranking System**: Algoritmos de clasificación
4. **Wallet API**: Monedero virtual

---

*Documentación actualizada automáticamente durante el desarrollo*
