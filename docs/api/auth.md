# Autenticación

## 📋 Descripción
Endpoints para autenticación y gestión de usuarios

## 🛠️ Endpoints


### POST /auth/login
**Iniciar sesión**


**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "password123"
}
```





**Response:**
```json
{
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "user": {
    "id": "user_id",
    "email": "usuario@email.com",
    "nombre": "Nombre Usuario"
  }
}
```


---

### POST /auth/register
**Registrar nuevo usuario**


**Body:**
```json
{
  "email": "nuevo@email.com",
  "password": "password123",
  "nombre": "Nuevo Usuario",
  "fechaNacimiento": "1990-01-01"
}
```







---
*Generado automáticamente - 2025-08-29T11:11:39.095Z*
