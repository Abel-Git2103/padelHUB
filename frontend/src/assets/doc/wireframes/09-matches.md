# Wireframe: Gestión de Partidos

## 📱 Vista Lista de Partidos

```
┌─────────────────────────────────────────┐
│ ← Partidos                    ➕ 🔍 ⚙️ │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🎾 MIS PARTIDOS                     │ │
│ │                                     │ │
│ │ ┌─────┬─────┬─────┬─────┬─────────┐ │ │
│ │ │TODOS│ACTIVOS│PASADOS│INVIT│      │ │ │
│ │ └─────┴─────┴─────┴─────┴─────────┘ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─── Filtros Rápidos ────────────────┐ │
│ │                                   │ │
│ │ 🏟️ Club: ▼ Todos los clubes       │ │
│ │ 🎾 Tipo: ▼ Simple/Interclubes      │ │
│ │ 📅 Fecha: ▼ Esta semana           │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Partidos Próximos ─────────────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🟢 HOY 19:00                    │ │ │
│ │ │ 🎾 Partido Simple - Grupo B     │ │ │
│ │ │ 👥 Juan & Ana vs Carlos & Luis  │ │ │
│ │ │ 📍 Club Norte - Pista 3         │ │ │
│ │ │                                 │ │ │
│ │ │ ⏰ Faltan 2 horas               │ │ │
│ │ │ 💬 3 mensajes nuevos            │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────┬─────────┐ │ │ │
│ │ │ │  💬 CHAT│📍DETALLES│⚙️CONFIG│ │ │ │
│ │ │ └─────────┴─────────┴─────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🟡 MAÑANA 17:30                 │ │ │
│ │ │ 🏆 Partido Interclubes - Grupo B│ │ │
│ │ │ 👥 Juan & María vs Pedro & Sara │ │ │
│ │ │ 📍 Club Centro - Pista 1        │ │ │
│ │ │                                 │ │ │
│ │ │ 🎯 +15 pts ranking club         │ │ │
│ │ │ 💰 Sin apuesta                  │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────┬─────────┐ │ │ │
│ │ │ │  💬 CHAT│📍DETALLES│⚙️CONFIG│ │ │ │
│ │ │ └─────────┴─────────┴─────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🔵 SÁBADO 10:00                 │ │ │
│ │ │ 🎾 Partido Simple - Grupo B     │ │ │
│ │ │ 👥 Juan & Carlos vs ? & ?       │ │ │
│ │ │ 📍 Club Norte - Pista por asig. │ │ │
│ │ │                                 │ │ │
│ │ │ ⏳ Esperando rivales (1/2)      │ │ │
│ │ │ 🕐 Faltan 3 días               │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────┬─────────┐ │ │ │
│ │ │ │  💬 CHAT│📍DETALLES│❌CANCEL│ │ │ │
│ │ │ └─────────┴─────────┴─────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Invitaciones Pendientes ──────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ ✉️ INVITACIÓN RECIBIDA          │ │ │
│ │ │                                 │ │ │
│ │ │ 👤 María González te invitó     │ │ │
│ │ │ 🎾 Partido Simple - Grupo B     │ │ │
│ │ │ 📅 Lunes 22/07 - 18:00          │ │ │
│ │ │ 📍 Club Sur - Pista 2           │ │ │
│ │ │                                 │ │ │
│ │ │ "¿Te apuntas? Necesitamos un    │ │ │
│ │ │ cuarto para completar el equipo"│ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────────────────┐ │ │ │
│ │ │ │❌RECHAZAR│     ✅ ACEPTAR      │ │ │ │
│ │ │ └─────────┴─────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## ➕ Modal de Crear Partido

```
┌─────────────────────────────────────────┐
│  ✕              Crear Partido           │
├─────────────────────────────────────────┤
│                                         │
│  🎾 Tipo de Partido:                    │
│  ⚫ Partido Simple                      │
│  ○ Partido Interclubes                 │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📅 Fecha y hora                     ││
│  │ ┌──────────────┬──────────────────┐ ││
│  │ │ 📅 20/07/2025│ 🕐 19:00        │ ││
│  │ └──────────────┴──────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🏟️ Club y ubicación                 ││
│  │ ▼ Club Deportivo Norte              ││
│  │ ▼ Pista 3                           ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 👥 Compañero/a de equipo            ││
│  │ ▼ Seleccionar jugador...            ││
│  │   Ana Martín (Grupo B)              ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🎯 Configuración adicional          ││
│  │                                     ││
│  │ ☑️ Abierto a cualquier rival        ││
│  │ ☐ Solo jugadores de mi club         ││
│  │ ☐ Partido con apuesta (monedero)    ││
│  │                                     ││
│  │ 💰 Apuesta: _____ € (opcional)      ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Mensaje para los rivales         ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │¡Hola! Buscamos rivales para    │ ││
│  │ │un buen partido. Nivel medio-   │ ││
│  │ │alto, ambiente divertido 😊     │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │      🎾 CREAR PARTIDO   ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Vista Detalle de Partido

```
┌─────────────────────────────────────────┐
│ ← Partido HOY 19:00              💬 ⚙️ │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🎾 PARTIDO SIMPLE - GRUPO B         │ │
│ │ 📅 Hoy, 20 Julio 2025 - 19:00      │ │
│ │ 📍 Club Deportivo Norte, Pista 3   │ │
│ │ 🕐 Estado: Confirmado ✅            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Equipos ─────────────────────┐ │
│ │                                   │ │
│ │    🅰️ EQUIPO A        VS    🅱️ EQUIPO B │ │
│ │                                   │ │
│ │  👤 Juan Pérez (tú)         👤 Carlos│ │
│ │     🎾 Grupo B                López │ │
│ │     🏟️ Club Norte            🎾 Grupo B│ │
│ │     📊 Ranking #8            🏟️ Club Centro│ │
│ │                             📊 Ranking #15│ │
│ │  👤 Ana Martín              👤 Luis │ │
│ │     🎾 Grupo B              Pérez   │ │
│ │     🏟️ Club Norte            🎾 Grupo B│ │
│ │     📊 Ranking #1            🏟️ Club Centro│ │
│ │                             📊 Ranking #23│ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Información Adicional ──────┐ │
│ │                                   │ │
│ │ 🎯 Puntos en juego:               │ │
│ │ • Victoria: +8 pts ranking club   │ │
│ │ • Empate: +3 pts ranking club     │ │
│ │ • Derrota: +1 pt ranking club     │ │
│ │                                   │ │
│ │ 💰 Apuesta: Sin apuesta           │ │
│ │ 🏆 Torneo: No aplica              │ │
│ │ 📈 Impacto ranking: Medio          │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Historial H2H ──────────────┐ │
│ │                                   │ │
│ │ 📊 Enfrentamientos previos: 2     │ │
│ │                                   │ │
│ │ ✅ 15/05/2025 - Victoria          │ │
│ │    Juan & Ana vs Carlos & Luis    │ │
│ │    6-3, 7-5                       │ │
│ │                                   │ │
│ │ ❌ 12/03/2025 - Derrota           │ │
│ │    Juan & Ana vs Carlos & Luis    │ │
│ │    4-6, 5-7                       │ │
│ │                                   │ │
│ │ 🎯 Balance: 1-1 (50% victorias)   │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Acciones Disponibles ──────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │          💬 ABRIR CHAT          │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │      📍 COMO LLEGAR AL CLUB     │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       📊 REGISTRAR RESULTADO    │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │      ⚙️ MODIFICAR PARTIDO      │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │      ❌ CANCELAR PARTIDO        │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Modal de Registro de Resultado

```
┌─────────────────────────────────────────┐
│  ✕           Registrar Resultado        │
├─────────────────────────────────────────┤
│                                         │
│  🎾 Partido: Juan & Ana vs Carlos & Luis│
│  📅 20/07/2025 19:00                    │
│                                         │
│  🏆 Resultado del Partido:              │
│                                         │
│  🅰️ EQUIPO A       SET 1       🅱️ EQUIPO B│
│                                         │
│  Juan & Ana    ┌─────┐ ┌─────┐ Carlos & Luis│
│                │  6  │ │  4  │              │
│                └─────┘ └─────┘              │
│                                         │
│               SET 2                     │
│                                         │
│  Juan & Ana    ┌─────┐ ┌─────┐ Carlos & Luis│
│                │  7  │ │  5  │              │
│                └─────┘ └─────┘              │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📊 Resultado: VICTORIA EQUIPO A     ││
│  │ 🎯 Sets ganados: 2-0                ││
│  │ 📈 Puntos ganados: +8 pts           ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Comentarios adicionales:         ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │Buen partido, nivel muy         │ ││
│  │ │parejo. Gran ambiente 😊        │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ⚠️ Este resultado afectará los rankings│
│  y no podrá modificarse después.        │
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │   📊 CONFIRMAR RESULTADO││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `MatchListComponent`
- `MatchCreateComponent`
- `MatchDetailsComponent`
- `TeamFormationComponent`
- `ScoreboardComponent`
- `ResultRecorderComponent`
- `PlayerSelectionComponent`
- `InvitationComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ← Partidos  ➕🔍│
├─────────────────┤
│ 🎾 MIS PARTIDOS │
│ TODO│ACT│PAS│INV│
├─────────────────┤
│🏟️▼ 🎾▼ 📅▼     │
├─────────────────┤
│ 🟢 HOY 19:00    │
│ 🎾 Simple - B   │
│ Juan&Ana vs     │
│ Carlos&Luis     │
│ 📍Norte-Pista3  │
│ ⏰-2h 💬3       │
│ 💬│📍│⚙️        │
├─────────────────┤
│ ✉️ INVITACIÓN   │
│ María te invitó │
│ 📅 Lun 18:00    │
│ 📍 Sur-Pista2   │
│ "¿Te apuntas?.."│
│ ❌ RECHAZAR│✅SI │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Gestión de Estados
- **Creado**: Partido creado, buscando jugadores
- **Confirmado**: Todos los jugadores confirmados
- **En curso**: Partido actualmente jugándose
- **Finalizado**: Resultado registrado
- **Cancelado**: Partido cancelado

### Tipos de Partido
- **Simple**: Ranking individual de club
- **Interclubes**: Ranking individual + club global
- **Torneo**: Parte de competencia oficial
- **Amistoso**: Sin afectación de rankings

### Notificaciones Inteligentes
- **Recordatorios**: 1 día, 2 horas, 30 min antes
- **Invitaciones**: Notificación push + email
- **Cambios**: Modificaciones de hora/lugar
- **Resultados**: Confirmación de resultado por todos
