# Wireframe: Pantalla de Registro

## 📱 Layout Principal

```
┌─────────────────────────────────────────┐
│                                         │
│              PADEL HUB                  │
│            [🏓 LOGO]                    │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │        ¡Únete a PadelHub!        │  │
│  │     Crea tu cuenta de jugador     │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 👤 Nombre completo          │  │  │
│  │  │ Juan Pérez García           │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 📧 Correo electrónico       │  │  │
│  │  │ juan@email.com              │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 📱 Teléfono                 │  │  │
│  │  │ +34 666 123 456             │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🔒 Contraseña               │  │  │
│  │  │ ••••••••••••                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🔒 Confirmar contraseña     │  │  │
│  │  │ ••••••••••••                │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 🏟️ Club (obligatorio)       │  │  │
│  │  │ ▼ Seleccionar club...       │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ � Rango de metal           │  │  │
│  │  │ ▼ Selecciona tu rango...    │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  🎯 Selección de Rango:           │  │
│  │  ○ 💎 PLATINO (6.0-7.0) - Élite   │  │
│  │  ○ 🥇 ORO (4.0-5.9) - Avanzado    │  │
│  │  ● 🥈 PLATA (2.0-3.9) - Intermedio│  │
│  │  ○ 🥉 BRONCE (1.0-1.9) - Amateur  │  │
│  │  ○ 🟫 COBRE (0-0.9) - Principiante│  │
│  │                                   │  │
│  │  📋 Grupo sugerido: B           │  │
│  │                                   │  │
│  │  ☑️ Acepto términos y condiciones│  │
│  │  ☑️ Acepto política de privacidad│  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │        CREAR CUENTA         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ────────── o ──────────         │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  🔵 Registrarse con Google  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │    ¿Ya tienes cuenta? Inicia sesión│ │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 🎯 Modal de Auto-valoración

```
┌─────────────────────────────────────────┐
│  ✕                Auto-valoración       │
├─────────────────────────────────────────┤
│                                         │
│  Selecciona tu nivel de pádel:          │
│                                         │
│  🅰️ Nivel A - Profesional              │
│  • Compites a nivel nacional/regional   │
│  • Técnica avanzada y táctica compleja  │
│  • +8 años experiencia competitiva      │
│                                         │
│  🅱️ Nivel B - Avanzado                 │
│  • Participas en torneos locales        │
│  • Dominas la mayoría de golpes         │
│  • 4-8 años jugando regularmente        │
│                                         │
│  🆎 Nivel C - Intermedio                │
│  • Juegas 2-3 veces por semana          │
│  • Conoces táctica básica               │
│  • 2-4 años de experiencia              │
│                                         │
│  🆔 Nivel D - Principiante Avanzado     │
│  • Juegas ocasionalmente                │
│  • Golpes básicos controlados           │
│  • 6 meses - 2 años jugando             │
│                                         │
│  🅴 Nivel E - Principiante              │
│  • Recién empiezas                      │
│  • Aprendiendo golpes básicos           │
│  • Menos de 6 meses de experiencia      │
│                                         │
│  ┌─────────────────────────────────────┐ │
│  │           CONFIRMAR NIVEL           │ │
│  └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `AuthLayoutComponent`
- `RegisterFormComponent`
- `InputFieldComponent` (x5)
- `SelectComponent` (x2)
- `CheckboxComponent` (x2)
- `ButtonComponent`
- `LevelAssessmentComponent`
- `ConfirmDialogComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│   PADEL HUB     │
│   [🏓 LOGO]     │
│                 │
│ ¡Únete!         │
│                 │
│ ┌─────────────┐ │
│ │👤 Nombre    │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │📧 Email     │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │📱 Teléfono  │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │🔒 Password  │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │🔒 Confirmar │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │🏟️ Club      │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │🎾 Nivel     │ │
│ └─────────────┘ │
│                 │
│ Grupo: B        │
│                 │
│ ☑️ Términos     │
│ ☑️ Privacidad   │
│                 │
│ ┌─────────────┐ │
│ │CREAR CUENTA │ │
│ └─────────────┘ │
│                 │
│ ¿Ya registrado? │
│                 │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Validaciones
- **Nombre**: Solo letras y espacios, 2-50 caracteres
- **Email**: Formato válido, único en sistema
- **Teléfono**: Formato español (+34), único
- **Contraseñas**: Coinciden, mínimo 8 caracteres, mayúscula, número
- **Club**: Selección obligatoria de lista activa
- **Nivel**: Auto-valoración obligatoria
- **Términos**: Aceptación obligatoria

### Estados de Error
- "Este email ya está registrado"
- "Las contraseñas no coinciden"
- "Debes seleccionar un club"
- "Debes aceptar los términos"

### Flujo Post-registro
1. **Verificación email** → Envío de código
2. **Confirmación cuenta** → Activación
3. **Bienvenida** → Dashboard del jugador
