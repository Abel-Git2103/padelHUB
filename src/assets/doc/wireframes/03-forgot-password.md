# Wireframe: Recuperación de Contraseña

## 📱 Layout Principal

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │      ¿Olvidaste tu contraseña?   │  │
│  │                                   │  │
│  │  No te preocupes, te enviaremos   │  │
│  │  un enlace para recuperarla.      │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 📧 Correo electrónico       │  │  │
│  │  │ ejemplo@correo.com          │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │     ENVIAR ENLACE           │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │      ← Volver al inicio de sesión│  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 📧 Estado: Email Enviado

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │           ✅ ¡Enviado!           │  │
│  │                                   │  │
│  │  Te hemos enviado un enlace a:    │  │
│  │       ejemplo@correo.com          │  │
│  │                                   │  │
│  │  Revisa tu bandeja de entrada     │  │
│  │  y sigue las instrucciones.       │  │
│  │                                   │  │
│  │  ⏱️ El enlace expira en 15 min.   │  │
│  │                                   │  │
│  │  ¿No recibiste el email?          │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      REENVIAR EMAIL         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │      ← Volver al inicio de sesión│  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🔐 Pantalla: Nueva Contraseña

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │       Crear nueva contraseña     │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🔒 Nueva contraseña         │  │  │
│  │  │ ••••••••••••                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🔒 Confirmar contraseña     │  │  │
│  │  │ ••••••••••••                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  📋 Requisitos:                  │  │
│  │  ✅ Mínimo 8 caracteres          │  │
│  │  ✅ Una mayúscula                │  │
│  │  ✅ Un número                    │  │
│  │  ✅ Un símbolo                   │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │    CAMBIAR CONTRASEÑA       │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## ✅ Estado: Contraseña Cambiada

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │        🎉 ¡Perfecto!             │  │
│  │                                   │  │
│  │  Tu contraseña ha sido cambiada   │  │
│  │  correctamente.                   │  │
│  │                                   │  │
│  │  Ya puedes iniciar sesión con     │  │
│  │  tu nueva contraseña.             │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      INICIAR SESIÓN         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `AuthLayoutComponent`
- `ForgotPasswordComponent`
- `InputFieldComponent`
- `ButtonComponent`
- `ToastComponent`
- `PasswordStrengthComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│   PADEL HUB     │
│   [🏓 LOGO]     │
│                 │
│ ¿Olvidaste      │
│ contraseña?     │
│                 │
│ Te enviaremos   │
│ un enlace.      │
│                 │
│ ┌─────────────┐ │
│ │📧 Email     │ │
│ └─────────────┘ │
│                 │
│ ┌─────────────┐ │
│ │ENVIAR ENLACE│ │
│ └─────────────┘ │
│                 │
│ ← Volver        │
│                 │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Flujo de Recuperación
1. **Usuario ingresa email** → Validación formato
2. **Verificación existencia** → Email existe en BD
3. **Generación token** → Token único con expiración
4. **Envío email** → Plantilla con enlace seguro
5. **Validación token** → Verificar validez y expiración
6. **Nueva contraseña** → Validación fortaleza
7. **Actualización BD** → Hash y guardado seguro
8. **Confirmación** → Mensaje de éxito

### Validaciones de Seguridad
- **Email**: Verificar que existe en sistema
- **Token**: Validez 15 minutos, un solo uso
- **Contraseña**: Mismos requisitos que registro
- **Rate limiting**: 3 intentos por hora por email

### Estados de Error
- "Email no encontrado en el sistema"
- "El enlace ha expirado, solicita uno nuevo"
- "El enlace ya fue utilizado"
- "Las contraseñas no coinciden"

### Notificaciones de Seguridad
- Email de confirmación de cambio de contraseña
- Log de actividad sospechosa
- Bloqueo temporal por intentos excesivos
