#!/usr/bin/env node

/**
 * Generador de documentación API para PadelHUB
 * Crea documentación adicional y ejemplos de uso
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const apiDocsDir = path.join(docsDir, 'api');

// Crear directorio si no existe
if (!fs.existsSync(apiDocsDir)) {
  fs.mkdirSync(apiDocsDir, { recursive: true });
}

// Documentación de endpoints principales
const apiDocumentation = {
  title: 'PadelHUB API Documentation',
  version: '1.0.0',
  description: 'Documentación completa de la API de PadelHUB',
  baseUrl: 'http://localhost:3000/api',
  endpoints: {
    auth: {
      title: 'Autenticación',
      description: 'Endpoints para autenticación y gestión de usuarios',
      endpoints: [
        {
          method: 'POST',
          path: '/auth/login',
          description: 'Iniciar sesión',
          body: {
            email: 'usuario@email.com',
            password: 'password123'
          },
          response: {
            access_token: 'jwt_token_here',
            refresh_token: 'refresh_token_here',
            user: {
              id: 'user_id',
              email: 'usuario@email.com',
              nombre: 'Nombre Usuario'
            }
          }
        },
        {
          method: 'POST',
          path: '/auth/register',
          description: 'Registrar nuevo usuario',
          body: {
            email: 'nuevo@email.com',
            password: 'password123',
            nombre: 'Nuevo Usuario',
            fechaNacimiento: '1990-01-01'
          }
        }
      ]
    },
    users: {
      title: 'Usuarios',
      description: 'Gestión de usuarios del sistema',
      endpoints: [
        {
          method: 'GET',
          path: '/usuarios',
          description: 'Listar usuarios con filtros',
          query: {
            pagina: 1,
            limite: 10,
            rango: 'ORO'
          }
        },
        {
          method: 'GET',
          path: '/usuarios/:id',
          description: 'Obtener usuario por ID'
        },
        {
          method: 'PATCH',
          path: '/usuarios/:id',
          description: 'Actualizar datos del usuario'
        }
      ]
    },
    clubs: {
      title: 'Clubes',
      description: 'Gestión de clubes de pádel',
      endpoints: [
        {
          method: 'POST',
          path: '/clubs',
          description: 'Crear nuevo club',
          body: {
            nombre: 'Club de Pádel XYZ',
            descripcion: 'Club de pádel en el centro',
            ubicacion: {
              direccion: 'Calle Principal 123',
              ciudad: 'Madrid',
              coordenadas: {
                lat: 40.4168,
                lng: -3.7038
              }
            }
          }
        },
        {
          method: 'GET',
          path: '/clubs',
          description: 'Listar todos los clubs'
        },
        {
          method: 'GET',
          path: '/clubs/:id',
          description: 'Obtener club por ID'
        }
      ]
    }
  },
  authentication: {
    title: 'Autenticación',
    description: 'Cómo autenticar las peticiones a la API',
    jwt: {
      description: 'Usar JWT Bearer token en el header Authorization',
      example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    refresh: {
      description: 'Renovar token de acceso usando refresh token',
      endpoint: 'POST /auth/refresh'
    }
  },
  errors: {
    title: 'Códigos de Error',
    description: 'Códigos de error comunes de la API',
    codes: {
      400: 'Bad Request - Datos de entrada inválidos',
      401: 'Unauthorized - Token inválido o expirado',
      403: 'Forbidden - No tienes permisos para esta acción',
      404: 'Not Found - Recurso no encontrado',
      409: 'Conflict - El recurso ya existe',
      500: 'Internal Server Error - Error del servidor'
    }
  }
};

// Generar archivo de documentación principal
const mainApiDoc = `# 📚 PadelHUB API Documentation

## 📋 Información General

- **Versión**: ${apiDocumentation.version}
- **Base URL**: ${apiDocumentation.baseUrl}
- **Documentación Swagger**: ${apiDocumentation.baseUrl}/docs
- **Formato**: JSON
- **Autenticación**: JWT Bearer Token

## 🔐 Autenticación

### JWT Bearer Token
\`\`\`http
Authorization: Bearer <your_jwt_token>
\`\`\`

### Obtener Token
\`\`\`bash
curl -X POST ${apiDocumentation.baseUrl}/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "usuario@email.com",
    "password": "password123"
  }'
\`\`\`

## 📚 Endpoints Principales

### 🔑 Autenticación
- \`POST /auth/login\` - Iniciar sesión
- \`POST /auth/register\` - Registrar usuario
- \`POST /auth/refresh\` - Renovar token
- \`GET /auth/profile\` - Obtener perfil

### 👥 Usuarios
- \`GET /usuarios\` - Listar usuarios
- \`GET /usuarios/:id\` - Obtener usuario
- \`PATCH /usuarios/:id\` - Actualizar usuario
- \`DELETE /usuarios/:id\` - Eliminar usuario

### 🏓 Clubes
- \`GET /clubs\` - Listar clubs
- \`POST /clubs\` - Crear club
- \`GET /clubs/:id\` - Obtener club
- \`PUT /clubs/:id\` - Actualizar club
- \`DELETE /clubs/:id\` - Eliminar club

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
\`\`\`bash
curl -X POST ${apiDocumentation.baseUrl}/usuarios \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <token>" \\
  -d '{
    "email": "nuevo@email.com",
    "password": "password123",
    "nombre": "Nuevo Usuario",
    "fechaNacimiento": "1990-01-01"
  }'
\`\`\`

### Listar Clubes
\`\`\`bash
curl -X GET ${apiDocumentation.baseUrl}/clubs \\
  -H "Authorization: Bearer <token>"
\`\`\`

## 📖 Documentación Interactiva

Para una documentación completa e interactiva, visita:
**${apiDocumentation.baseUrl}/docs**

Esta documentación incluye:
- ✅ Esquemas de datos detallados
- ✅ Ejemplos de requests/responses
- ✅ Posibilidad de probar los endpoints
- ✅ Autenticación integrada

---
*Generado automáticamente - ${new Date().toISOString()}*
`;

// Generar documentación detallada por módulo
Object.entries(apiDocumentation.endpoints).forEach(([module, data]) => {
  const moduleDoc = `# ${data.title}

## 📋 Descripción
${data.description}

## 🛠️ Endpoints

${data.endpoints.map(endpoint => `
### ${endpoint.method} ${endpoint.path}
**${endpoint.description}**

${endpoint.body ? `
**Body:**
\`\`\`json
${JSON.stringify(endpoint.body, null, 2)}
\`\`\`
` : ''}

${endpoint.query ? `
**Query Parameters:**
\`\`\`json
${JSON.stringify(endpoint.query, null, 2)}
\`\`\`
` : ''}

${endpoint.response ? `
**Response:**
\`\`\`json
${JSON.stringify(endpoint.response, null, 2)}
\`\`\`
` : ''}
`).join('\n---\n')}

---
*Generado automáticamente - ${new Date().toISOString()}*
`;

  fs.writeFileSync(path.join(apiDocsDir, `${module}.md`), moduleDoc);
});

// Generar documentación de autenticación
const authDoc = `# ${apiDocumentation.authentication.title}

## 📋 Descripción
${apiDocumentation.authentication.description}

## 🔐 JWT Bearer Token
${apiDocumentation.authentication.jwt.description}

### Ejemplo
\`\`\`http
${apiDocumentation.authentication.jwt.example}
\`\`\`

## 🔄 Refresh Token
${apiDocumentation.authentication.refresh.description}

### Endpoint
\`${apiDocumentation.authentication.refresh.endpoint}\`

### Ejemplo
\`\`\`bash
curl -X POST ${apiDocumentation.baseUrl}/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refreshToken": "your_refresh_token_here"
  }'
\`\`\`

---
*Generado automáticamente - ${new Date().toISOString()}*
`;

fs.writeFileSync(path.join(apiDocsDir, 'authentication.md'), authDoc);

// Generar documentación de errores
const errorsDoc = `# ${apiDocumentation.errors.title}

## 📋 Descripción
${apiDocumentation.errors.description}

## 🚨 Códigos de Error

| Código | Descripción |
|--------|-------------|
${Object.entries(apiDocumentation.errors.codes).map(([code, desc]) => `| ${code} | ${desc} |`).join('\n')}

## 📝 Ejemplos de Respuestas de Error

### Error 400 - Bad Request
\`\`\`json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
\`\`\`

### Error 401 - Unauthorized
\`\`\`json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
\`\`\`

### Error 404 - Not Found
\`\`\`json
{
  "statusCode": 404,
  "message": "Usuario no encontrado",
  "error": "Not Found"
}
\`\`\`

---
*Generado automáticamente - ${new Date().toISOString()}*
`;

fs.writeFileSync(path.join(apiDocsDir, 'errors.md'), errorsDoc);

// Generar archivo principal
fs.writeFileSync(path.join(apiDocsDir, 'README.md'), mainApiDoc);

console.log('✅ Documentación de API generada exitosamente!');
console.log(`📁 Archivos creados en: ${apiDocsDir}`);
console.log('\n📋 Archivos generados:');
console.log('- README.md (documentación principal)');
console.log('- auth.md (autenticación)');
console.log('- users.md (usuarios)');
console.log('- clubs.md (clubes)');
console.log('- authentication.md (detalles de auth)');
console.log('- errors.md (códigos de error)');
