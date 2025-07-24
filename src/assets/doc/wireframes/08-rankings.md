# Wireframe: Rankings y Clasificaciones

## 📱 Layout Principal - Vista Rankings

```
┌─────────────────────────────────────────┐
│ ← PADEL HUB                        🔍 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📊 RANKINGS Y CLASIFICACIONES       │ │
│ │                                     │ │
│ │ ┌─────┬─────┬─────┬─────┬─────────┐ │ │
│ │ │🏟️CLUB│🌎GLOBAL│A│B│C│D│E│        │ │ │
│ │ └─────┴─────┴─────┴─────┴─────────┘ │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─── Filtros y Búsqueda ─────────────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ 🔍 Buscar jugador...            │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ 🏟️ Club: ▼ Mi Club (Norte)        │ │
│ │ 🎾 Grupo: ▼ Grupo B               │ │
│ │ 📅 Temporada: ▼ 2024-25 (Actual)  │ │
│ │ 📊 Ordenar: ▼ Por Puntos          │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─ Ranking Club Deportivo Norte - B ─┐ │
│ │                                   │ │
│ │ #  👤 Jugador          Pts V E D  │ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ 1  🥇 Ana Martín      145 24 3 1  │ │
│ │    🔥 Racha: +8        ⬆️ ↗️       │ │
│ │                                   │ │
│ │ 2  🥈 Carlos López    142 22 4 2  │ │
│ │    📈 Subió 1 puesto   ↗️         │ │
│ │                                   │ │
│ │ 3  🥉 Luis Pérez      138 21 4 3  │ │
│ │    📊 Sin cambios      ➡️         │ │
│ │                                   │ │
│ │ 4  4️⃣ María González  135 20 5 3  │ │
│ │    📉 Bajó 1 puesto    ↘️         │ │
│ │                                   │ │
│ │ 5  5️⃣ Pedro Sánchez  132 19 6 3  │ │
│ │    📊 Sin cambios      ➡️         │ │
│ │                                   │ │
│ │ 6  6️⃣ Rosa Jiménez   128 18 5 5  │ │
│ │    📈 Subió 2 puestos  ⬆️         │ │
│ │                                   │ │
│ │ 7  7️⃣ Diego Morales  125 17 6 5  │ │
│ │    📉 Bajó 1 puesto    ↘️         │ │
│ │                                   │ │
│ │ 8  🎯 Juan Pérez      122 15 8 5  │ │
│ │    TÚ  📊 Sin cambios  ➡️         │ │
│ │                                   │ │
│ │ 9  9️⃣ Sofia Ruiz     119 16 4 8  │ │
│ │    📈 Subió 1 puesto   ↗️         │ │
│ │                                   │ │
│ │ 10 🔟 Álvaro Castro  115 14 7 7  │ │
│ │    📉 Bajó 2 puestos   ↘️         │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ ...ver más (127 jugadores)      │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Mi Progreso ───────────────────┐ │
│ │                                   │ │
│ │ 🎯 Tu posición actual: #8 de 127  │ │
│ │ 📊 Puntos: 122 (+3 esta semana)   │ │
│ │ 📈 Racha: Sin cambios             │ │
│ │                                   │ │
│ │ 🎪 Próximo objetivo:              │ │
│ │ 📍 Posición #5 (10 puntos más)    │ │
│ │ 🏆 Calificar para torneo (2 vict.)│ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       VER MI EVOLUCIÓN          │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🌎 Vista Ranking Global de Clubes

```
┌─────────────────────────────────────────┐
│ ← Rankings                         🔍 ⚙️│
├─────────────────────────────────────────┤
│ 🏟️CLUB │🌎GLOBAL│ A │ B │ C │ D │ E │  │
│        ▔▔▔▔▔▔▔▔▔                         │
├─────────────────────────────────────────┤
│                                         │
│ ┌─── Ranking Nacional de Clubes ─────┐ │
│ │                                   │ │
│ │ #  🏟️ Club                 Pts Pos│ │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │ │
│ │ 1  🥇 Pádel Elite Madrid    2,847 ↗️│ │
│ │    📊 Miembros: 245  🏆 T: 12     │ │
│ │                                   │ │
│ │ 2  🥈 Club Champions BCN    2,834 ↘️│ │
│ │    📊 Miembros: 198  🏆 T: 15     │ │
│ │                                   │ │
│ │ 3  🥉 Valencia Racquet      2,801 ➡️│ │
│ │    📊 Miembros: 234  🏆 T: 9      │ │
│ │                                   │ │
│ │ 4  4️⃣ Sevilla Gold Club     2,756 ⬆️│ │
│ │    📊 Miembros: 167  🏆 T: 11     │ │
│ │                                   │ │
│ │ 5  5️⃣ Bilbao Sports         2,723 ↘️│ │
│ │    📊 Miembros: 189  🏆 T: 8      │ │
│ │                                   │ │
│ │ ...                               │ │
│ │                                   │ │
│ │ 12 🎯 Club Deportivo Norte   2,234 ↗️│ │
│ │    TU CLUB 📊 Miembros: 127  🏆 6 │ │
│ │                                   │ │
│ │ 13 🔸 Málaga Beach Club     2,198 ↘️│ │
│ │    📊 Miembros: 156  🏆 T: 7      │ │
│ │                                   │ │
│ │ 14 🔸 Murcia Center         2,167 ➡️│ │
│ │    📊 Miembros: 143  🏆 T: 5      │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │ ...ver todos (85 clubes)        │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Estadísticas de mi Club ──────┐ │
│ │                                   │ │
│ │ 🏟️ Club Deportivo Norte           │ │
│ │ 📊 Posición: #12 de 85 clubes     │ │
│ │ 📈 Puntos: 2,234 (+45 esta semana)│ │
│ │ 👥 Miembros activos: 127           │ │
│ │ 🏆 Torneos ganados: 6              │ │
│ │                                   │ │
│ │ 🎯 Para Top 10: 89 puntos más     │ │
│ │ 📅 Mejor mes: Marzo 2025          │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │     VER DETALLES DEL CLUB       │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Vista Detalle del Jugador

```
┌─────────────────────────────────────────┐
│ ← Ana Martín                      ➕ 💬 │
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │     [AVATAR]    🥇 #1               │ │
│ │   Ana Martín    🎾 Grupo B          │ │
│ │   🏟️ Club Norte  📊 145 pts         │ │
│ │   ⭐ Nivel: 9.2/10                  │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌────── Estadísticas Detalladas ────┐ │
│ │                                   │ │
│ │ ┌─── Temporada Actual ──────────┐  │ │
│ │ │ 🏆 Victorias: 24              │  │ │
│ │ │ 🤝 Empates: 3                 │  │ │
│ │ │ ❌ Derrotas: 1                │  │ │
│ │ │ 📊 % Efectividad: 85.7%       │  │ │
│ │ │ 🔥 Mejor racha: 8 victorias   │  │ │
│ │ │ 🔥 Racha actual: +8           │  │ │
│ │ └─────────────────────────────────┘  │ │
│ │                                   │ │
│ │ ┌─── Histórico Global ──────────┐  │ │
│ │ │ 📅 Temporadas: 4              │  │ │
│ │ │ 🏆 Total victorias: 89        │  │ │
│ │ │ 📊 Total partidos: 115        │  │ │
│ │ │ 🎖️ Ascensos: 2                │  │ │
│ │ │ 🏆 Torneos ganados: 5         │  │ │
│ │ └─────────────────────────────────┘  │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───── Evolución de Posición ───────┐ │
│ │                                   │ │
│ │    📈 Gráfico de Posición        │ │
│ │                                   │ │
│ │ #1  ●●●●●●●●●●●●●●● (Actual)     │ │
│ │ #2                               │ │
│ │ #3      ●                        │ │
│ │ #4        ●●●                    │ │
│ │ #5              ●●●              │ │
│ │     │   │   │   │   │   │        │ │
│ │    Ene Feb Mar Abr May Jun       │ │
│ │                                   │ │
│ │ 📊 Tendencia: ⬆️ Ascendente       │ │
│ │ 🎯 Pico máximo: #1 (actual)       │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Últimos Partidos ──────────┐ │
│ │                                   │ │
│ │ ✅ 18/07 Victoria vs Carlos & Luis │ │
│ │    Ana & María  6-2, 6-1          │ │
│ │                                   │ │
│ │ ✅ 15/07 Victoria vs Pedro & Juan  │ │
│ │    Ana & Sofia  6-4, 7-5          │ │
│ │                                   │ │
│ │ ✅ 12/07 Victoria vs Rosa & Diego  │ │
│ │    Ana & Carmen 6-3, 6-4          │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │        VER HISTORIAL            │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────── Logros y Trofeos ──────────┐ │
│ │                                   │ │
│ │ 🏆 Campeona Torneo Interno (x3)   │ │
│ │ 🥇 #1 Ranking Club (6 meses)      │ │
│ │ 🔥 Racha de 10 victorias          │ │
│ │ ⭐ Jugadora del mes (Abril)       │ │
│ │ 📈 Ascenso Grupo C → B            │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │          VER TODOS              │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `MainLayoutComponent`
- `RankingTableComponent`
- `FilterComponent`
- `SearchBarComponent`
- `PlayerCardComponent`
- `StatsChartComponent`
- `PaginationComponent`
- `TabsComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ← Rankings  🔍  │
├─────────────────┤
│ 🏟️│🌎│A│B│C│D│E│
│   ▔              │
├─────────────────┤
│ 🔍 Buscar...    │
│ 🏟️ ▼ Mi Club    │
│ 🎾 ▼ Grupo B    │
│ 📅 ▼ 2024-25    │
├─────────────────┤
│# Jugador   Pts  │
│━━━━━━━━━━━━━━━━━ │
│🥇 Ana M.   145  │
│  🔥+8      ↗️   │
│                 │
│🥈 Carlos   142  │
│  📈↑1      ↗️   │
│                 │
│🥉 Luis     138  │
│  📊=       ➡️   │
│                 │
│🎯 Juan(TÚ) 122  │
│  📊=       ➡️   │
├─────────────────┤
│ 🎯 Tu pos: #8   │
│ 📊 122 pts (+3)│
│ 🎪 Objetivo: #5 │
│ VER EVOLUCIÓN   │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Cálculo de Rankings
- **Algoritmo de puntos**: Basado en victorias, empates, derrotas
- **Bonus por torneos**: Puntos extra por participación/victoria
- **Decay temporal**: Pérdida gradual de puntos por inactividad
- **Actualización**: Tiempo real después de cada partido

### Tipos de Rankings
- **Club Individual**: Por grupo de nivel dentro del club
- **Club Global**: Todos los grupos del club combinados
- **Nacional**: Clubes a nivel país
- **Por Grupos**: A, B, C, D, E separados

### Métricas Avanzadas
- **ELO Rating**: Sistema de clasificación deportiva
- **Forma reciente**: Últimos 10 partidos
- **Head-to-head**: Comparativas directas
- **Tendencias**: Análisis de progreso temporal
