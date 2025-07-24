# Wireframe: Sistema de Chat

## 📱 Layout Principal - Vista Lista de Conversaciones

```
┌─────────────────────────────────────────┐
│ ☰ Chat                        🔍 ⚙️   │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🔍 Buscar conversaciones...         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────── Conversaciones ───────────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 👥 Ana Martín & Carlos López    │ │ │
│ │ │    Grupo para partido mañana    │ │ │
│ │ │    Ana: ¿Confirmamos 19h? 🎾    │ │ │
│ │ │    🕐 Hace 5 min        ● 2     │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 👤 María González               │ │ │
│ │ │    ¡Hola Juan! ¿Jugamos el...   │ │ │
│ │ │    🕐 Hace 1 hora               │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🏆 Torneo Grupo B               │ │ │
│ │ │    Luis: Los horarios están... │ │ │
│ │ │    🕐 Hace 3 horas       ● 5    │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 👤 Pedro Ruiz                  │ │ │
│ │ │    ¿Te apuntas al torneo de... │ │ │
│ │ │    🕐 Ayer                      │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🏟️ Club Deportivo Norte         │ │ │
│ │ │    Admin: Nuevos horarios de... │ │ │
│ │ │    🕐 2 días                    │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│                           ┌───────────┐ │
│                           │     💬    │ │
│                           │   NUEVO   │ │
│                           └───────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 💬 Vista de Conversación Individual

```
┌─────────────────────────────────────────┐
│ ← Ana Martín & Carlos López        📞 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─── 👥 Participantes ─────────────────┐ │
│ │ 👤 Juan P. (tú)  👤 Ana M.  👤 Carlos│ │
│ │ 🎾 Partido: Mañana 19:00 - Pista 3  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────── Mensajes ─────────────────┐ │
│ │                                   │ │
│ │           17:30                   │ │
│ │  ┌─ Ana Martín ─────────────────┐  │ │
│ │  │ ¡Hola! ¿Confirmamos el       │  │ │
│ │  │ partido de mañana? 🎾         │  │ │
│ │  └───────────────────── 17:30 ─┘  │ │
│ │                                   │ │
│ │  ┌─ Carlos López ───────────────┐  │ │
│ │  │ ¡Por supuesto! Yo estoy      │  │ │
│ │  │ libre a las 19h 👍           │  │ │
│ │  └───────────────────── 17:35 ─┘  │ │
│ │                                   │ │
│ │          ┌─ Juan (Tú) ────────┐    │ │
│ │          │ Perfecto, nos vemos │    │ │
│ │          │ allí. ¿Llevamos     │    │ │
│ │          │ pelotas? 🎾          │    │ │
│ │          └─────────── 17:40 ─┘    │ │
│ │                                   │ │
│ │  ┌─ Ana Martín ─────────────────┐  │ │
│ │  │ Yo llevo unas nuevas que     │  │ │
│ │  │ compré ayer 😊               │  │ │
│ │  │                              │  │ │
│ │  │ 📍 Club Deportivo Norte      │  │ │
│ │  │    Pista 3                   │  │ │
│ │  │    📅 Mañana 19:00-21:00     │  │ │
│ │  └───────────────────── 17:45 ─┘  │ │
│ │                                   │ │
│ │          ┌─ Juan (Tú) ────────┐    │ │
│ │          │ ¿Confirmamos la    │    │ │
│ │          │ reserva entonces?  │    │ │
│ │          └─────────── 17:50 ─┘    │ │
│ │                                   │ │
│ │                    ✅ Visto 17:51 │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ Carlos está escribiendo...      │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📎  💾  😊 Escribe un mensaje... 📤│ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🏆 Vista de Chat Grupal de Torneo

```
┌─────────────────────────────────────────┐
│ ← Torneo Grupo B                   👥 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─── 🏆 Info del Torneo ──────────────┐ │
│ │ Torneo Interno Grupo B               │ │
│ │ 📅 25-27 Julio 2025                  │ │
│ │ 👥 16 participantes, 8 equipos       │ │
│ │ 💰 Premio: 200€ + Ascenso Grupo A    │ │
│ │ ┌─────────────────────────────────┐  │ │
│ │ │        VER BRACKET              │  │ │
│ │ └─────────────────────────────────┘  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────── Chat General ─────────────┐ │
│ │                                   │ │
│ │           Hoy                     │ │
│ │                                   │ │
│ │  ┌─ Admin Luis ────────────────┐   │ │
│ │  │ 📋 Los horarios definitivos: │   │ │
│ │  │                             │   │ │
│ │  │ 🕘 Sábado 25/07:            │   │ │
│ │  │ 09:00 - Partido 1           │   │ │
│ │  │ 10:30 - Partido 2           │   │ │
│ │  │ 12:00 - Partido 3           │   │ │
│ │  │ 13:30 - Partido 4           │   │ │
│ │  │                             │   │ │
│ │  │ 📌 IMPORTANTE: Llegar 15    │   │ │
│ │  │ min antes                    │   │ │
│ │  └──────────────────── 10:15 ─┘   │ │
│ │                                   │ │
│ │  ┌─ María González ─────────────┐  │ │
│ │  │ ¡Perfecto! Muy emocionada   │  │ │
│ │  │ por comenzar 🎾💪           │  │ │
│ │  └───────────────────── 10:20 ─┘  │ │
│ │                                   │ │
│ │  ┌─ Carlos López ──────────────┐   │ │
│ │  │ ¿Dónde podemos ver el       │   │ │
│ │  │ bracket completo?           │   │ │
│ │  └───────────────────── 10:25 ─┘  │ │
│ │                                   │ │
│ │          ┌─ Juan (Tú) ────────┐    │ │
│ │          │ En la app, sección │    │ │
│ │          │ torneos 👆           │    │ │
│ │          └─────────── 10:30 ─┘    │ │
│ │                                   │ │
│ │  ┌─ Ana Martín ─────────────────┐  │ │
│ │  │ ¿Alguien sabe si habrá      │  │ │
│ │  │ streaming de la final? 📺    │  │ │
│ │  └───────────────────── 10:35 ─┘  │ │
│ │                                   │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📎 📷 😊 Responder al grupo...   📤│ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 💬 Modal de Nuevo Chat

```
┌─────────────────────────────────────────┐
│  ✕              Nuevo Chat              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🔍 Buscar jugadores...              ││
│  └─────────────────────────────────────┘│
│                                         │
│  📝 Tipo de conversación:               │
│  ⚫ Chat individual                     │
│  ○ Grupo para partido                  │
│  ○ Grupo de torneo                     │
│                                         │
│  ┌─── Contactos Recientes ────────────┐ │
│  │                                   │ │
│  │ ☑️ Ana Martín                     │ │
│  │    🏟️ Club Norte • 🎾 Grupo B     │ │
│  │                                   │ │
│  │ ☐ Carlos López                    │ │
│  │    🏟️ Club Centro • 🎾 Grupo B    │ │
│  │                                   │ │
│  │ ☐ María González                  │ │
│  │    🏟️ Club Norte • 🎾 Grupo C     │ │
│  │                                   │ │
│  │ ☐ Pedro Ruiz                     │ │
│  │    🏟️ Club Sur • 🎾 Grupo B       │ │
│  │                                   │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  Seleccionados: Ana Martín              │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Mensaje inicial (opcional):      ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ ¡Hola! ¿Te interesa jugar un  │ ││
│  │ │ partido esta semana?           │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │     💬 CREAR CHAT       ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `ChatLayoutComponent`
- `ConversationListComponent`
- `MessageListComponent`
- `MessageItemComponent`
- `ChatInputComponent`
- `OnlineStatusComponent`
- `ParticipantsComponent`
- `FileUploadComponent`
- `EmojiPickerComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ☰ Chat    🔍 ⚙️ │
├─────────────────┤
│ 🔍 Buscar...    │
├─────────────────┤
│ 👥 Ana & Carlos │
│ Grupo partido   │
│ Ana: ¿Confirma..│
│ 🕐 5min    ● 2  │
├─────────────────┤
│ 👤 María G.     │
│ ¡Hola! ¿Jugamos│
│ 🕐 1h           │
├─────────────────┤
│ 🏆 Torneo B     │
│ Luis: Horarios..│
│ 🕐 3h      ● 5  │
├─────────────────┤
│ 👤 Pedro R.     │
│ ¿Te apuntas al..│
│ 🕐 Ayer         │
├─────────────────┤
│          💬     │
│         NUEVO   │
└─────────────────┘
```

### Vista Chat Mobile
```
┌─────────────────┐
│ ← Ana & Carlos 📞│
├─────────────────┤
│ 👥 Juan•Ana•Carlos│
│ 🎾 Mañana 19h   │
├─────────────────┤
│      17:30      │
│                 │
│ Ana Martín      │
│ ¡Hola! ¿Confir..│
│           17:30 │
│                 │
│      Carlos     │
│ ¡Por supuesto!  │
│ Libre a 19h 👍  │
│           17:35 │
│                 │
│     Juan (Tú)   │
│     Perfecto    │
│ ¿Llevamos pelotas│
│           17:40 │
│                 │
│ Ana está escrib..│
├─────────────────┤
│📎 😊 Mensaje...📤│
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Mensajería en Tiempo Real
- **WebSocket**: Conexión persistente para mensajes instantáneos
- **Indicadores de estado**: Online, escribiendo, visto
- **Sincronización**: Mensajes sincronizados entre dispositivos
- **Offline support**: Queue de mensajes cuando no hay conexión

### Tipos de Chat
- **Individual**: 1:1 entre jugadores
- **Grupo de partido**: Para organizar partidos específicos
- **Grupo de torneo**: Chat oficial de torneos
- **Club general**: Comunicación a nivel club

### Funcionalidades Avanzadas
- **Archivos compartidos**: Imágenes, PDFs hasta 10MB
- **Enlaces de partido**: Integración con sistema de reservas
- **Notificaciones push**: Configurables por tipo de chat
- **Búsqueda**: En mensajes, contactos y conversaciones
- **Moderación**: Reportes y bloqueos para administradores
