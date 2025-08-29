# Autenticación

## 📋 Descripción
Cómo autenticar las peticiones a la API

## 🔐 JWT Bearer Token
Usar JWT Bearer token en el header Authorization

### Ejemplo
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔄 Refresh Token
Renovar token de acceso usando refresh token

### Endpoint
`POST /auth/refresh`

### Ejemplo
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token_here"
  }'
```

---
*Generado automáticamente - 2025-08-29T11:11:39.097Z*
