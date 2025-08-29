# PadelHUB - Sistema de Gestión de Torneos de Padel

PadelHUB es una plataforma completa para la gestión de torneos, partidos y rankings de padel, desarrollada con un stack moderno TypeScript.

## �️ Arquitectura del Proyecto (Monorepo)

```
padelHUB/
├── frontend/          # Angular 20 + TypeScript
├── backend/           # NestJS + TypeScript
├── shared/            # Tipos y utilidades compartidas
└── docs/              # Documentación del proyecto
```

## 🚀 Stack Tecnológico

### Frontend
- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de desarrollo
- **RxJS** - Manejo de streams reactivos

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Lenguaje de desarrollo
- **MongoDB + Mongoose** - Base de datos
- **Socket.io** - Comunicación en tiempo real
- **JWT + Passport** - Autenticación
- **Swagger** - Documentación API

### Compartido
- **TypeScript** - Tipos e interfaces compartidas
- **Validaciones** - Utilidades comunes
- **Constantes** - Configuración del dominio

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 6.0.0 (local o Atlas)

### Instalación
```bash
# Instalar dependencias de todos los proyectos
npm run install:all

# Configurar variables de entorno
cp backend/.env.example backend/.env
```

## 🏃‍♂️ Desarrollo

### Ejecutar todo en modo desarrollo
```bash
npm run dev
```

### Ejecutar proyectos individualmente
```bash
# Solo frontend (Angular)
npm run dev:frontend

# Solo backend (NestJS)
npm run dev:backend
```

### URLs de desarrollo
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000/api
- **Documentación API**: http://localhost:3000/api/docs

## � Documentación de la API

### 🔗 Documentación Interactiva (Swagger)
La API cuenta con documentación interactiva generada automáticamente con Swagger/OpenAPI:

**URL de Producción**: `http://localhost:3000/api/docs`

### 📋 Características de la Documentación
- ✅ **Esquemas completos** de datos
- ✅ **Ejemplos** de requests/responses
- ✅ **Autenticación integrada** (JWT)
- ✅ **Pruebas en vivo** de endpoints
- ✅ **Códigos de estado** documentados

### 📖 Documentación Adicional
Además de la documentación interactiva, se genera documentación adicional:

```bash
# Generar documentación completa
npm run docs:api

# Ver documentación generada
ls docs/api/
```

**Archivos generados:**
- `docs/api/README.md` - Documentación principal
- `docs/api/auth.md` - Endpoints de autenticación
- `docs/api/users.md` - Gestión de usuarios
- `docs/api/clubs.md` - Gestión de clubes
- `docs/api/authentication.md` - Detalles de auth
- `docs/api/errors.md` - Códigos de error

### 🔐 Autenticación en la API

#### Obtener Token JWT
```bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "usuario@email.com",
    "password": "password123"
  }'
```

#### Usar Token en Requests
```bash
curl -X GET http://localhost:3000/api/auth/profile \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 📋 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Iniciar sesión |
| `POST` | `/api/auth/register` | Registrar usuario |
| `GET` | `/api/usuarios` | Listar usuarios |
| `POST` | `/api/usuarios` | Crear usuario |
| `GET` | `/api/clubs` | Listar clubs |
| `POST` | `/api/clubs` | Crear club |

### 🛠️ Generar Documentación

```bash
# Generar documentación una vez
npm run docs:api

# Generar automáticamente al cambiar archivos
npm run docs:api:watch
```

## �📋 Funcionalidades Principales

### ✅ Gestión de Usuarios
- Registro y autenticación
- Perfiles de jugador
- Sistema de grupos (A, B, C, D, E)
- Vinculación a clubes

### 🚧 Sistema de Partidos
- Partidos simples
- Partidos interclubes
- Registro de resultados

### 🚧 Gestión de Torneos
- Torneos internos del club
- Torneos interclubes
- Sistema de inscripciones
- Premios y ascensos

### 🚧 Rankings
- Ranking interno por club
- Ranking global de clubes
- Estadísticas por temporada

### 🚧 Monedero Virtual
- Saldo virtual para inscripciones
- Premios en torneos
- Recarga con tarjeta

### 🚧 Tiempo Real
- Chat entre jugadores
- Notificaciones instantáneas
- Actualizaciones de rankings

## 📁 Estructura del Monorepo

### Frontend (`/frontend`)
```
src/
├── app/
│   ├── auth/           # Autenticación
│   ├── dashboard/      # Panel principal
│   ├── usuarios/       # Gestión usuarios
│   ├── partidos/       # Sistema partidos
│   ├── torneos/        # Sistema torneos
│   └── shared/         # Componentes compartidos
└── assets/             # Recursos y documentación
```

### Backend (`/backend`)
```
src/
├── auth/               # Autenticación JWT
├── usuarios/           # Gestión usuarios
├── clubes/             # Gestión clubes
├── partidos/           # API partidos
├── torneos/            # API torneos
├── rankings/           # Cálculo rankings
├── monedero/           # Sistema pagos
└── common/             # Middleware y utils
```

### Shared (`/shared`)
```
src/
├── types.ts            # Interfaces TypeScript
├── constants.ts        # Constantes del dominio
├── utils.ts            # Utilidades compartidas
└── index.ts            # Punto de entrada
```

## 🎯 Roadmap de Desarrollo

### Fase 1 - MVP ✅
- [x] Configuración inicial del proyecto
- [x] Estructura monorepo
- [x] Tipos compartidos básicos
- [ ] Autenticación básica
- [ ] CRUD usuarios y clubes

### Fase 2 - Core Features
- [ ] Sistema de partidos
- [ ] Gestión de torneos
- [ ] Rankings básicos
- [ ] API REST completa

### Fase 3 - Advanced Features
- [ ] Monedero virtual
- [ ] Sistema de chat
- [ ] Notificaciones tiempo real

## 👤 Autor

**Abel-Git2103**
- GitHub: [@Abel-Git2103](https://github.com/Abel-Git2103)

---

**Estado del Proyecto**: 🚧 En Desarrollo Activo

Para más información consulta `/frontend/src/assets/doc/`
npm install

# Ejecutar en desarrollo
ng serve

# Ejecutar tests
ng test
```

## 📚 Documentación Completa

Toda la documentación del proyecto se encuentra en:
**[📁 /src/assets/doc/](./src/assets/doc/README.md)**

### 📋 Documentos Principales:
- **[Índice de Documentación](./src/assets/doc/README.md)** - Punto de entrada principal
- **[Wireframes Completos](./src/assets/doc/wireframes/README.md)** - Diseño de interfaces
- **[Sistema de Niveles](./src/assets/doc/wireframes/00-sistema-niveles.md)** - Competición A-E
- **[Análisis Técnico](./src/assets/doc/WIREFRAMES_ANALYSIS.md)** - Arquitectura y componentes
- **[Actualizaciones](./src/assets/doc/ACTUALIZACIONES.md)** - Roadmap de desarrollo

## 🎯 Características Principales

### 🏷️ Sistema de Grupos
- **A (6.0-7.0)**: Élite - Solo invitación
- **B (4.0-5.9)**: Avanzado - 28 pts mínimos
- **C (2.0-3.9)**: Intermedio - 18 pts mínimos  
- **D (1.0-1.9)**: Amateur - 10 pts mínimos
- **E (0-0.9)**: Principiante - 5 pts mínimos

### 💰 Monetización Sin Comisiones
- **Club**: 200€/mes (gestión completa)
- **Jugador**: 8€/mes opcional (premium)
- **0% comisión** en torneos y eventos

### ⚔️ Tipos de Partido
- **🎯 Igualado**: Mismo grupo - siempre puntúa
- **🔀 No Igualado**: Mixto - puntúa según validación
- **🤝 Amistoso**: Sin puntuación

## 🛠️ Stack Técnico

- **Frontend**: Angular 20 + SCSS
- **Responsive**: Mobile-first design
- **Estado**: Listo para desarrollo

## 📊 Estado del Proyecto

- ✅ **Documentación**: Completa (16 archivos)
- ✅ **Wireframes**: 11 pantallas diseñadas
- ✅ **Arquitectura**: 45+ componentes identificados  
- ⏳ **Desarrollo**: Pendiente de implementación

## 🤝 Contribuir

1. Revisa la [documentación completa](./src/assets/doc/README.md)
2. Consulta los [wireframes](./src/assets/doc/wireframes/)
3. Sigue el [roadmap de desarrollo](./src/assets/doc/ACTUALIZACIONES.md)

---

## 🔧 Angular CLI Reference

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
