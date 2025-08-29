# 📚 PadelHUB API Documentation

## 📋 Información General

- **Versión**: 1.0.0
- **Base URL**: http://localhost:3000/api
- **Documentación Swagger**: http://localhost:3000/api/docs
- **Formato**: JSON
- **Autenticación**: JWT Bearer Token

## 🔐 Autenticación

### JWT Bearer Token
```http
Authorization: Bearer <your_jwt_token>
```

### Obtener Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "password123"
  }'
```

## 📚 Endpoints Principales

### 🔑 Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/refresh` - Renovar token
- `GET /auth/profile` - Obtener perfil

### 👥 Usuarios
- `GET /usuarios` - Listar usuarios
- `GET /usuarios/:id` - Obtener usuario
- `PATCH /usuarios/:id` - Actualizar usuario
- `DELETE /usuarios/:id` - Eliminar usuario

### 🏓 Clubes
- `GET /clubs` - Listar clubs
- `POST /clubs` - Crear club
- `GET /clubs/:id` - Obtener club
- `PUT /clubs/:id` - Actualizar club
- `DELETE /clubs/:id` - Eliminar club

## 📋 Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso ya existe |
| 500 | Internal Server Error - Error del servidor |

## 🛠️ Ejemplos de Uso

### Crear un Usuario
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "email": "nuevo@email.com",
    "password": "password123",
    "nombre": "Nuevo Usuario",
    "fechaNacimiento": "1990-01-01"
  }'
```

### Listar Clubes
```bash
curl -X GET http://localhost:3000/api/clubs \
  -H "Authorization: Bearer <token>"
```

## 📖 Documentación Interactiva

Para una documentación completa e interactiva, visita:
**http://localhost:3000/api/docs**

Esta documentación incluye:
- ✅ Esquemas de datos detallados
- ✅ Ejemplos de requests/responses
- ✅ Posibilidad de probar los endpoints
- ✅ Autenticación integrada

---
*Generado automáticamente - 2025-08-29T11:11:39.094Z*
