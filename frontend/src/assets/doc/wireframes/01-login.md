# Wireframe: Pantalla de Login

## 📱 Layout Principal

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │        ¡Bienvenido de vuelta!     │  │
│  │      Inicia sesión en tu cuenta   │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 📧 Email o Usuario          │  │  │
│  │  │ ejemplo@correo.com          │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🔒 Contraseña               │  │  │
│  │  │ ••••••••••••                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  □ Recordar mis datos             │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      INICIAR SESIÓN         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │      ¿Olvidaste tu contraseña?   │  │
│  │                                   │  │
│  │  ────────── o ──────────         │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🔵 Continuar con Google    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  📘 Continuar con Facebook  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │    ¿No tienes cuenta? Regístrate │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Colores
- **Fondo**: `#F5F5F5` (background-light)
- **Tarjeta**: `#FFFFFF` con sombra sutil
- **Botón principal**: `#2E7D32` (primary-green)
- **Links**: `#1976D2` (primary-blue)
- **Texto**: `#212121` (text-primary)

### Componentes Utilizados
- `AuthLayoutComponent`
- `LoginFormComponent`
- `InputFieldComponent` (x2)
- `ButtonComponent` (x3)
- `SocialLoginComponent`

### Estados de Interacción
- **Focus**: Campos con borde azul `#1976D2`
- **Error**: Borde rojo `#F44336` y mensaje de error
- **Loading**: Spinner en botón de login
- **Success**: Redirección automática

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│   PADEL HUB     │
│   [🏓 LOGO]     │
│                 │
│ ¡Bienvenido!    │
│                 │
│ ┌─────────────┐ │
│ │📧 Email     │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │🔒 Password  │ │
│ └─────────────┘ │
│                 │
│ □ Recordar      │
│                 │
│ ┌─────────────┐ │
│ │INICIAR SESIÓN│ │
│ └─────────────┘ │
│                 │
│ ¿Olvidaste...?  │
│                 │
│ ┌─────────────┐ │
│ │🔵 Google    │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │📘 Facebook  │ │
│ └─────────────┘ │
│                 │
│ ¿Sin cuenta?    │
│                 │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Validaciones
- **Email**: Formato válido obligatorio
- **Contraseña**: Mínimo 6 caracteres
- **Rate limiting**: 5 intentos por minuto
- **Captcha**: Después de 3 intentos fallidos

### Estados de Error
- "Email o contraseña incorrectos"
- "Cuenta bloqueada temporalmente"
- "Error de conexión, intenta de nuevo"

### Navegación
- **Éxito**: → Dashboard del usuario
- **Registro**: → Pantalla de registro
- **Olvidó contraseña**: → Pantalla de recuperación
- **Social login**: → Autorización externa
