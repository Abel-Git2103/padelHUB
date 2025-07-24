# Wireframe: Editar Perfil

## 📱 Layout Principal

```
┌─────────────────────────────────────────┐
│ ← Perfil                    💾 Guardar  │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │               📸                    │ │
│ │          [  AVATAR  ]               │ │
│ │              ┌─────┐                │ │
│ │              │CAMBIAR│               │ │
│ │              └─────┘                │ │
│ │                                     │ │
│ │  📁 Seleccionar archivo             │ │
│ │  📷 Hacer foto con cámara           │ │
│ │  🗑️ Eliminar foto actual            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Información Personal ───────┐  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 👤 Nombre completo          │  │  │
│ │  │ Juan Pérez García           │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 📧 Correo electrónico       │  │  │
│ │  │ juan.perez@email.com        │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 📱 Teléfono                 │  │  │
│ │  │ +34 666 123 456             │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🎂 Fecha de nacimiento      │  │  │
│ │  │ 📅 15/03/1985               │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ ⚥ Género                    │  │  │
│ │  │ ▼ Masculino                 │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──────── Información Deportiva ────┐  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🏟️ Club actual              │  │  │
│ │  │ Club Deportivo Norte        │  │  │
│ │  │ 🔒 (Contacta soporte para   │  │  │
│ │  │     cambiar de club)        │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🎾 Grupo de nivel           │  │  │
│ │  │ Grupo B                     │  │  │
│ │  │ 🔒 (Solo por ascenso)       │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ ✋ Posición preferida        │  │  │
│ │  │ ▼ Derecha                   │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🕒 Disponibilidad habitual  │  │  │
│ │  │ ☑️ Lunes      ☑️ Martes     │  │  │
│ │  │ ☐ Miércoles   ☑️ Jueves     │  │  │
│ │  │ ☑️ Viernes    ☑️ Sábado     │  │  │
│ │  │ ☐ Domingo                   │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🕐 Horarios preferidos      │  │  │
│ │  │ ☑️ 09:00-12:00 (Mañana)     │  │  │
│ │  │ ☐ 12:00-15:00 (Mediodía)    │  │  │
│ │  │ ☑️ 15:00-18:00 (Tarde)      │  │  │
│ │  │ ☑️ 18:00-21:00 (Noche)      │  │  │
│ │  │ ☐ 21:00-24:00 (Nocturno)    │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Información Adicional ──────┐  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 📝 Biografía/Presentación   │  │  │
│ │  │ ┌─────────────────────────┐ │  │  │
│ │  │ │Jugador de pádel desde   │ │  │  │
│ │  │ │2022. Me gusta jugar en  │ │  │  │
│ │  │ │equipo y siempre con     │ │  │  │
│ │  │ │buena actitud. Busco     │ │  │  │
│ │  │ │mejorar y disfrutar del  │ │  │  │
│ │  │ │deporte.                 │ │  │  │
│ │  │ └─────────────────────────┘ │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ │  ┌─────────────────────────────┐  │  │
│ │  │ 🎯 Objetivos deportivos     │  │  │
│ │  │ ☑️ Ascender al Grupo A      │  │  │
│ │  │ ☑️ Ganar un torneo          │  │  │
│ │  │ ☐ Competir a nivel regional │  │  │
│ │  │ ☑️ Mejorar saque            │  │  │
│ │  │ ☑️ Jugar más regularmente   │  │  │
│ │  └─────────────────────────────┘  │  │
│ │                                   │  │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ┌─────────┐  ┌─────────────────────┐│ │
│ │ │ CANCELAR│  │   💾 GUARDAR CAMBIOS││ │
│ │ └─────────┘  └─────────────────────┘│ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🔄 Modal de Cambio de Avatar

```
┌─────────────────────────────────────────┐
│  ✕               Cambiar Foto           │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐│
│  │                                     ││
│  │         [  PREVIEW  ]               ││
│  │       Foto actual/nueva             ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  📁 Seleccionar desde galería       ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  📷 Tomar foto con cámara           ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │  🗑️ Usar avatar por defecto         ││
│  └─────────────────────────────────────┘│
│                                         │
│  Formatos: JPG, PNG (máx 5MB)           │
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │      ✅ CONFIRMAR       ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 🏟️ Modal de Solicitud de Cambio de Club

```
┌─────────────────────────────────────────┐
│  ✕           Cambiar de Club            │
├─────────────────────────────────────────┤
│                                         │
│  ⚠️ Restricción Temporal                │
│                                         │
│  Durante la temporada (Sept-Mayo) solo  │
│  puedes cambiar de club con autorización│
│  especial del soporte.                  │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🏟️ Club actual:                     ││
│  │ Club Deportivo Norte                ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🎯 Nuevo club deseado:              ││
│  │ ▼ Seleccionar club...               ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Motivo del cambio:               ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ Mudanza de domicilio            │ ││
│  │ │ Problemas con horarios          │ ││
│  │ │ Mejor ubicación                 │ ││
│  │ │                                 │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  📄 Documentos requeridos:              │
│  ☑️ Justificante del motivo             │
│  ☑️ Autorización del club actual        │
│                                         │
│  ⏱️ Tiempo de procesamiento: 3-5 días   │
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │   📤 ENVIAR SOLICITUD   ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `MainLayoutComponent`
- `EditProfileFormComponent`
- `InputFieldComponent` (múltiples)
- `SelectComponent`
- `CheckboxComponent`
- `TextareaComponent`
- `AvatarUploadComponent`
- `ConfirmDialogComponent`
- `FileUploadComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ← Editar   💾   │
├─────────────────┤
│   [AVATAR]      │
│   Cambiar       │
├─────────────────┤
│ 👤 Nombre       │
│ ┌─────────────┐ │
│ │Juan Pérez G.│ │
│ └─────────────┘ │
├─────────────────┤
│ 📧 Email        │
│ ┌─────────────┐ │
│ │juan@email..│ │
│ └─────────────┘ │
├─────────────────┤
│ 📱 Teléfono     │
│ ┌─────────────┐ │
│ │+34 666 123..│ │
│ └─────────────┘ │
├─────────────────┤
│ 🎂 Fecha nac.   │
│ ┌─────────────┐ │
│ │📅 15/03/1985│ │
│ └─────────────┘ │
├─────────────────┤
│ ⚥ Género        │
│ ┌─────────────┐ │
│ │▼ Masculino  │ │
│ └─────────────┘ │
├─────────────────┤
│ 🏟️ Club (🔒)    │
│ Norte - Contacta│
│ soporte cambiar │
├─────────────────┤
│ 🎾 Nivel (🔒)   │
│ Grupo B         │
├─────────────────┤
│ CANCELAR|GUARDAR│
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Validaciones de Formulario
- **Nombre**: 2-50 caracteres, solo letras y espacios
- **Email**: Formato válido, verificación de unicidad
- **Teléfono**: Formato nacional, verificación SMS
- **Foto**: Max 5MB, formatos JPG/PNG, redimensionado automático
- **Biografía**: Max 500 caracteres

### Restricciones del Sistema
- **Club**: Solo cambio con autorización durante temporada
- **Grupo**: Solo modificable por ascenso en torneos
- **Email**: Requiere verificación del nuevo email
- **Teléfono**: Verificación por SMS/llamada

### Estados de Guardado
- **Draft**: Cambios sin guardar (indicador visual)
- **Saving**: Spinner durante guardado
- **Success**: Confirmación de éxito
- **Error**: Mensajes específicos por campo

### Funcionalidades Avanzadas
- **Auto-save**: Guardado automático cada 30 segundos
- **Validación en tiempo real**: Feedback inmediato
- **Historia de cambios**: Registro de modificaciones
- **Rollback**: Deshacer cambios no deseados
