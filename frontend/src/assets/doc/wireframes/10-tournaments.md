# Wireframe: Sistema de Torneos

## 📱 Vista Lista de Torneos

```
┌─────────────────────────────────────────┐
│ ← Torneos                        🔍 ⚙️ │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏆 TORNEOS Y COMPETICIONES          │ │
│ │                                     │ │
│ │ ┌─────┬─────┬─────┬─────┬─────────┐ │ │
│ │ │TODOS│ACTIVOS│PRÓX│FINALIZ│MÍOS │ │ │
│ │ └─────┴─────┴─────┴─────┴─────────┘ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─── Filtros de Búsqueda ────────────┐ │
│ │                                   │ │
│ │ 🏟️ Organizador: ▼ Todos           │ │
│ │ 🎾 Grupo: ▼ Grupo B               │ │
│ │ 📅 Estado: ▼ Inscripciones abiertas│ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Torneos Destacados ─────────────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🌟 TORNEO PLATAFORMA            │ │ │
│ │ │                                 │ │ │
│ │ │ 🏆 Copa Nacional Interclubes B  │ │ │
│ │ │ 👥 Organiza: PadelHub           │ │ │
│ │ │ 📅 28-30 Julio 2025             │ │ │
│ │ │ 🏟️ Múltiples sedes              │ │ │
│ │ │                                 │ │ │
│ │ │ 💰 Premios: 1000€ + Ascenso A   │ │ │
│ │ │ 🎯 32 mejores clubes nacional   │ │ │
│ │ │ 📊 Requisito: Top 20 del club   │ │ │
│ │ │                                 │ │ │
│ │ │ 🟡 Inscripciones: 5 días        │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────────────────┐ │ │ │
│ │ │ │📋DETALLES│     ✅ INSCRIBIR    │ │ │ │
│ │ │ └─────────┴─────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🏟️ TORNEO DE CLUB               │ │ │
│ │ │                                 │ │ │
│ │ │ 🏆 Torneo Interno Grupo B       │ │ │
│ │ │ 👥 Organiza: Club Norte         │ │ │
│ │ │ 📅 25-27 Julio 2025             │ │ │
│ │ │ 🏟️ Club Deportivo Norte         │ │ │
│ │ │                                 │ │ │
│ │ │ 💰 Premios: 200€ + Ascenso      │ │ │
│ │ │ 🎯 Solo miembros del club       │ │ │
│ │ │ 📊 Mín. 10 victorias temporada  │ │ │
│ │ │                                 │ │ │
│ │ │ ✅ YA INSCRITO                  │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────────────────┐ │ │ │
│ │ │ │📋DETALLES│     🏆 VER BRACKET  │ │ │ │
│ │ │ └─────────┴─────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🌐 TORNEO INTERCLUBES           │ │ │
│ │ │                                 │ │ │
│ │ │ 🏆 Liga Regional Centro Grupo B │ │ │
│ │ │ 👥 Organiza: Club Centro        │ │ │
│ │ │ 📅 1-3 Agosto 2025              │ │ │
│ │ │ 🏟️ Club Deportivo Centro        │ │ │
│ │ │                                 │ │ │
│ │ │ 💰 Premios: 500€ + Ascenso      │ │ │
│ │ │ 🎯 16 equipos interclubes       │ │ │
│ │ │ 📊 Requisito: 8 victorias mín.  │ │ │
│ │ │                                 │ │ │
│ │ │ 🟢 Inscripciones abiertas       │ │ │
│ │ │                                 │ │ │
│ │ │ ┌─────────┬─────────────────────┐ │ │ │
│ │ │ │📋DETALLES│     ✅ INSCRIBIR    │ │ │ │
│ │ │ └─────────┴─────────────────────┘ │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Mis Inscripciones Activas ────┐ │
│ │                                   │ │
│ │ 🏆 Torneo Interno Grupo B         │ │
│ │ 📊 Posición actual: Cuartos final │ │
│ │ 🎾 Próximo partido: 26/07 10:00   │ │
│ │ vs María & Pedro                  │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │        VER CALENDARIO           │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 📋 Vista Detalle de Torneo

```
┌─────────────────────────────────────────┐
│ ← Copa Nacional Interclubes B      💬 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🌟 TORNEO OFICIAL DE PLATAFORMA     │ │
│ │                                     │ │
│ │ 🏆 Copa Nacional Interclubes B      │ │
│ │ 👥 Organizador: PadelHub Platform   │ │
│ │ 📅 28-30 Julio 2025                 │ │
│ │ 🏟️ Múltiples sedes (Madrid, BCN)    │ │
│ │ 🎾 Categoría: Grupo B               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Información General ──────────┐ │
│ │                                   │ │
│ │ 📊 Formato: Eliminación directa   │ │
│ │ 🎯 Participantes: 32 clubes       │ │
│ │ ⏱️ Duración: 3 días (Vie-Dom)      │ │
│ │ 🕐 Estado: Inscripciones abiertas │ │
│ │                                   │ │
│ │ 📝 Descripción:                   │ │
│ │ El torneo más importante del año  │ │
│ │ para Grupo B. Los 32 mejores      │ │
│ │ clubes del ranking nacional       │ │
│ │ compiten por el título.           │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Requisitos de Inscripción ───┐ │
│ │                                   │ │
│ │ ✅ Club en Top 32 nacional        │ │
│ │    (Club Norte: Posición #12)     │ │
│ │                                   │ │
│ │ ✅ 2 jugadores Top 20 club Grupo B│ │
│ │    Juan Pérez: #8 ✅             │ │
│ │    Seleccionar compañero: ▼       │ │
│ │                                   │ │
│ │ ✅ Mínimo 15 victorias temporada  │ │
│ │    Juan Pérez: 15 victorias ✅    │ │
│ │                                   │ │
│ │ ✅ Sin sanciones activas          │ │
│ │    ✅ Cuenta en buen estado       │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Premios y Reconocimientos ───┐ │
│ │                                   │ │
│ │ 🥇 Campeón:                       │ │
│ │ • 1000€ para el monedero          │ │
│ │ • Ascenso automático Grupo A      │ │
│ │ • Trofeo y medallas               │ │
│ │                                   │ │
│ │ 🥈 Subcampeón:                    │ │
│ │ • 500€ para el monedero           │ │
│ │ • Posibilidad ascenso*            │ │
│ │                                   │ │
│ │ 🥉 Semifinalistas:                │ │
│ │ • 250€ para el monedero           │ │
│ │                                   │ │
│ │ 🏆 Todos los participantes:       │ │
│ │ • +50 pts ranking club            │ │
│ │ • Diploma de participación        │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Fechas Importantes ──────────┐ │
│ │                                   │ │
│ │ 📅 Inscripciones:                 │ │
│ │    Hasta 25 Julio 23:59          │ │
│ │    ⏰ Faltan 5 días               │ │
│ │                                   │ │
│ │ 📅 Sorteo:                        │ │
│ │    26 Julio 12:00 (streaming)    │ │
│ │                                   │ │
│ │ 📅 Competición:                   │ │
│ │    28-30 Julio (Vie-Dom)          │ │
│ │                                   │ │
│ │ 🎥 Transmisión: Cuartos, semis y  │ │
│ │    final en vivo                  │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │                                     │ │
│ │ ┌─────────┬─────────────────────────┐│ │
│ │ │📋REGLAS │     ✅ INSCRIBIR EQUIPO ││ │
│ │ └─────────┴─────────────────────────┘│ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🏆 Modal de Inscripción en Torneo

```
┌─────────────────────────────────────────┐
│  ✕         Inscribir Equipo al Torneo   │
├─────────────────────────────────────────┤
│                                         │
│  🏆 Copa Nacional Interclubes B         │
│  💰 Costo inscripción: 25€ (del monedero)│
│                                         │
│  👥 Selección de Equipo:                │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🎯 Jugador 1 (Principal)            ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 👤 Juan Pérez (TÚ)              │ ││
│  │ │ 🎾 Grupo B - Ranking #8         │ ││
│  │ │ 📊 15V-8E-5D (15 victorias ✅)  │ ││
│  │ │ ✅ Cumple requisitos            │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 🎯 Jugador 2 (Compañero)            ││
│  │ ▼ Seleccionar del Top 20 del club...││
│  │                                     ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 👤 Ana Martín                   │ ││
│  │ │ 🎾 Grupo B - Ranking #1         │ ││
│  │ │ 📊 24V-3E-1D (24 victorias ✅)  │ ││
│  │ │ ✅ Disponible para el torneo    │ ││
│  │ └─────────────────────────────────┘ ││
│  │                                     ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ 👤 Carlos López                 │ ││
│  │ │ 🎾 Grupo B - Ranking #2         │ ││
│  │ │ 📊 22V-4E-2D (22 victorias ✅)  │ ││
│  │ │ ❌ Ya inscrito en otro torneo   │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ✅ Equipo seleccionado: Juan & Ana     │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Información adicional:           ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ Equipo experimentado, llevamos  │ ││
│  │ │ jugando juntos 2 temporadas.    │ ││
│  │ │ Objetivo: llegar a semifinales  │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ☑️ Acepto las reglas del torneo        │
│  ☑️ Confirmo disponibilidad 28-30 Jul   │
│  ☑️ Autorizo descuento de 25€ del monedero│
│                                         │
│  💰 Saldo actual: 125.50€               │
│  💰 Tras inscripción: 100.50€           │
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │   🏆 CONFIRMAR INSCR.   ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 🗳️ Vista Bracket/Llaves del Torneo

```
┌─────────────────────────────────────────┐
│ ← Torneo Interno Grupo B          📊 💬│
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🏆 BRACKET - TORNEO INTERNO B       │ │
│ │ 📅 25-27 Julio • 🏟️ Club Norte      │ │
│ │ 👥 16 participantes, 8 equipos      │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── CUARTOS DE FINAL ─────────────┐ │
│ │                                   │ │
│ │ QF1 │ Juan & Ana       6-2, 6-1   │ │
│ │     │ María & Pedro    ❌         │ │
│ │                                   │ │
│ │ QF2 │ Carlos & Luis    6-4, 7-5   │ │
│ │     │ Rosa & Diego     ❌         │ │
│ │                                   │ │
│ │ QF3 │ Ana M. & Sofia   6-3, 6-4   │ │
│ │     │ Pedro & Álvaro   ❌         │ │
│ │                                   │ │
│ │ QF4 │ Miguel & Carmen  2-6, 6-3,7-6│ │
│ │     │ Laura & Javier   ❌         │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── SEMIFINALES ──────────────────┐ │
│ │                                   │ │
│ │ SF1 │ Juan & Ana       🟡 PRÓXIMO │ │
│ │     │ Carlos & Luis    📅 26/07   │ │
│ │     │                 🕐 10:00    │ │
│ │                                   │ │
│ │ SF2 │ Ana M. & Sofia   🟡 PRÓXIMO │ │
│ │     │ Miguel & Carmen  📅 26/07   │ │
│ │     │                 🕐 11:30    │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── FINAL ────────────────────────┐ │
│ │                                   │ │
│ │     │ Ganador SF1     🔵 PENDIENTE│ │
│ │     │ Ganador SF2     📅 27/07    │ │
│ │     │                 🕐 17:00    │ │
│ │     │                 🎥 STREAM   │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Tu Progreso ──────────────────┐ │
│ │                                   │ │
│ │ 🎯 Juan & Ana                     │ │
│ │ ✅ Cuartos: Victoria 6-2, 6-1     │ │
│ │ 🟡 Semis: vs Carlos & Luis        │ │
│ │    📅 26/07 10:00 - Pista 1       │ │
│ │                                   │ │
│ │ 🎖️ Posición actual: Semifinales   │ │
│ │ 💰 Premios asegurados: 100€       │ │
│ │ 🏆 Si ganas: Final + 250€         │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       💬 CHAT DEL TORNEO        │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `TournamentListComponent`
- `TournamentDetailsComponent`
- `TournamentBracketComponent`
- `TournamentCreationComponent`
- `ParticipationRequirementsComponent`
- `PrizeManagementComponent`
- `RegistrationFormComponent`
- `PaymentComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ← Torneos    🔍 │
├─────────────────┤
│ 🏆 TORNEOS      │
│ TODO│ACT│PRÓ│FIN│
├─────────────────┤
│🏟️▼ 🎾▼ 📅▼     │
├─────────────────┤
│ 🌟 PLATAFORMA   │
│ 🏆 Copa Nac B   │
│ 👥 PadelHub     │
│ 📅 28-30 Jul    │
│ 💰 1000€+Ascenso│
│ 🟡 5 días       │
│ 📋│✅INSCRIBIR   │
├─────────────────┤
│ 🏟️ CLUB         │
│ 🏆 Interno B    │
│ 👥 Club Norte   │
│ 📅 25-27 Jul    │
│ ✅ INSCRITO     │
│ 📋│🏆BRACKET     │
├─────────────────┤
│ 🎯 MIS ACTIVOS  │
│ Interno B       │
│ 📊 Cuartos      │
│ 🎾 26/07 10:00  │
│ vs María&Pedro  │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Tipos de Torneos
- **Plataforma**: Organizados por PadelHub, premios grandes
- **Club Interno**: Solo miembros del club
- **Interclubes**: Entre diferentes clubes
- **Regional**: Múltiples clubes de una región

### Sistema de Requisitos
- **Victorias mínimas**: Configurables por torneo
- **Ranking**: Posición mínima requerida
- **Grupo**: Solo jugadores del grupo específico
- **Club**: Restricciones por membresía

### Gestión Automática
- **Brackets**: Generación automática de llaves
- **Sorteo**: Algoritmo de emparejamiento justo
- **Calendarios**: Asignación automática de fechas
- **Premios**: Distribución automática al monedero
