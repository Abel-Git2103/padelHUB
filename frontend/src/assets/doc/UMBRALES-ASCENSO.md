# ⬆️ Sistema de Umbrales de Ascenso Automático - PadelHUB

## 🎯 Criterios Técnicos para Ascenso Automático

### 📊 Umbrales de Puntos por Rango

```
┌─────────────┬─────────────────┬─────────────────────┬─────────────────────┐
│    RANGO    │ PUNTOS MÍNIMOS  │ UMBRAL DE ASCENSO   │ ASCENSO ACELERADO   │
├─────────────┼─────────────────┼─────────────────────┼─────────────────────┤
│ 🟫 COBRE    │       0         │   30 pts + 40% wins │   Torneo COBRE      │
│ 🥉 BRONCE   │      20         │   50 pts + 50% wins │   Torneo BRONCE     │
│ 🥈 PLATA    │      35         │   70 pts + 60% wins │   Torneo PLATA      │
│ 🥇 ORO      │      55         │   Solo invitación   │   N/A               │
│ 💎 PLATINO  │   Invitación    │        N/A          │   N/A               │
└─────────────┴─────────────────┴─────────────────────┴─────────────────────┘

* Ascenso inmediato al cumplir criterios (puntos implican partidos jugados)
** Conducta antideportiva gestionada directamente por el club
```

### ⚙️ Criterios para Invitación PLATINO

```javascript
// Solo por invitación - Criterios objetivos para evaluación
const platinumInvitationCriteria = {
  points: 90,  // 35 puntos sobre mínimo ORO
  monthsInOro: 6,
  monthlyMatches: 15,
  winRateInOro: 70,
  tournamentsWon: 2
};

// Ejemplos prácticos de degradación:
// BRONCE (20 pts mín) → Degrada con 14 pts o menos
// PLATA (35 pts mín) → Degrada con 29 pts o menos  
// ORO (55 pts mín) → Degrada con 49 pts o menos
```

* Ascenso inmediato al cumplir criterios (puntos implican partidos jugados)
** Conducta antideportiva gestionada directamente por el club
```

### 🎯 Análisis: Calibración para Temporada (Septiembre-Junio)

**Duración de temporada**: 10 meses (40 semanas aproximadamente)
**Actividad promedio**: 2-3 partidos por semana por jugador activo

Para entender mejor los requisitos y su adecuación a la temporada:

```
┌─────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   PUNTOS    │ VICTORIAS MÍNIMAS │ DERROTAS MÁXIMAS │ PARTIDOS TOTALES │ TIEMPO ESTIMADO │
│ REQUERIDOS  │ (Win Rate Mín.)  │   PERMITIDAS    │   JUGADOS       │   EN TEMPORADA  │
├─────────────┼─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│     30      │    12 (40%)     │      18         │      30         │ 3-4 meses       │
│     50      │    25 (50%)     │      25         │      50         │ 5-6 meses       │
│     70      │    42 (60%)     │      28         │      70         │ 7-8 meses       │
│     90      │    63 (70%)     │      27         │      90         │ 9-10 meses      │
└─────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘

📝 Fórmula de cálculo:
- Victoria = +3 puntos
- Empate = +1 punto  
- Derrota = -1 punto
- Win Rate = (Victorias / Partidos Totales) × 100

💡 Análisis de viabilidad:
• 30 puntos: Alcanzable en 3-4 meses con 2-3 partidos/semana
• 50 puntos: Alcanzable en 5-6 meses con actividad constante
• 70 puntos: Requiere 7-8 meses y buen nivel (60% wins)
• 90 puntos: Solo los mejores al final de temporada (70% wins)
```

---

## 🚨 Sistema de Reportes de Conducta Antideportiva

### Gestión Independiente por el Club
El sistema de reportes es **completamente independiente** del sistema de ascensos:
- **Solo el club** puede gestionar incidentes de conducta
- **Jugadores pueden reportar** comportamientos antideportivos
- **Club investiga** y determina las medidas apropiadas
- **No afecta ascensos**: Los criterios de rango son puramente deportivos
- **Flexibilidad total** para cada situación específica

---

## 🔄 Algoritmo de Ascenso Automático

### Condiciones Obligatorias para Ascenso

#### 🟫 COBRE → 🥉 BRONCE

```javascript
const canAscendToBronce = (user) => {
  return user.points >= 30 &&
         user.winRate >= 40%;
}
```

#### 🥉 BRONCE → 🥈 PLATA

```javascript
const canAscendToPlata = (user) => {
  return user.points >= 50 &&
         user.winRate >= 50%;
}
```

#### 🥈 PLATA → 🥇 ORO

```javascript
const canAscendToOro = (user) => {
  return user.points >= 70 &&
         user.winRate >= 60%;
}
```

---

## 🏆 Sistema de Ascenso Acelerado por Torneos

### Vías Alternativas de Ascenso

Los torneos ofrecen **ascenso acelerado** saltándose algunos requisitos:

#### 🎯 Ascenso por Torneo de Rango

```javascript
const canAscendByTournament = (user, tournamentWin) => {
  const basePointsReached = user.points >= getMinPointsForNextRank(user.currentRank);
  const wonRankTournament = tournamentWin.type === "rank_specific";

  // Ascenso inmediato si gana torneo de su rango
  return basePointsReached && wonRankTournament;
};

// Ejemplos:
// BRONCE con 20+ puntos + gana torneo BRONCE → PLATA inmediata
// PLATA con 30+ puntos + gana torneo PLATA → ORO inmediata
```

#### 🚀 Bonificaciones por Victoria en Torneo

```javascript
const getTournamentBonus = (tournamentType, position) => {
  const bonuses = {
    rank_specific: { 1: 5, 2: 3, 3: 2 }, // Torneo de rango específico
    mixed: { 1: 3, 2: 2, 3: 1 }, // Torneo mixto
    club_internal: { 1: 2, 2: 1, 3: 1 }, // Torneo interno club
  };

  return bonuses[tournamentType][position] || 0;
};

// Ejemplo: Ganar torneo PLATA = +5 puntos extra + ascenso si ya tienes 30+
```

### Wireframe: Opciones de Ascenso

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Caminos hacia 🥈 PLATA                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🥉 BRONCE (Actual: 42 puntos)                          │
│                                                         │
│ 🎯 VÍA NORMAL - Ascenso Automático:                     │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ✅ Puntos: 42/50 (Faltan 8)                        │ │
│ │ ✅ Win Rate: 58%/50%                               │ │
│ │                                                     │ │
│ │ 🚀 ¡Solo te faltan 8 puntos!                       │ │
│ │ Próximo partido: Necesitas ~3 victorias más        │ │
│ │ (Los puntos ya demuestran experiencia suficiente)  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 🏆 VÍA ACELERADA - Torneo de Ascenso:                   │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🎯 Torneo BRONCE - Este fin de semana              │ │
│ │ Premio: Ascenso inmediato + 5 puntos bonus         │ │
│ │ Requisito: Tener 50+ puntos (✅ Cumples)           │ │
│ │                                                     │ │
│ │ Si ganas: 🥈 PLATA inmediata + 62 puntos           │ │
│ │ Si quedas 2º: +3 puntos bonus (65 pts total)      │ │
│ │ Si quedas 3º: +2 puntos bonus (64 pts total)      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 💡 ¿Qué prefieres?                                      │
│ • Ganar 3 partidos más (ascenso normal)                │
│ • Competir este fin de semana (ascenso + bonus)        │
│                                                         │
│ [VER TORNEO]  [SEGUIR PROGRESO NORMAL]  [DECIDIR LUEGO] │
└─────────────────────────────────────────────────────────┘
```

### Wireframe: Notificación de Torneo de Ascenso

```
┌─────────────────────────────────────────────────────────┐
│ 🎯 ¡OPORTUNIDAD DE ASCENSO RÁPIDO!                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🏆 Torneo PLATA - Ascenso Directo Disponible           │
│                                                         │
│ 📊 Tu situación actual:                                 │
│ • Rango: 🥈 PLATA (62 puntos)                          │
│ • Progreso normal a ORO: Faltan 3-4 semanas           │
│ • Elegible para torneo: ✅ SÍ (tienes 55+ puntos)      │
│                                                         │
│ 🚀 Si participas y ganas:                               │
│ • Ascenso inmediato a 🥇 ORO                           │
│ • +5 puntos bonus (67 puntos totales)                  │
│ • Saltarte 3-4 semanas de espera                       │
│                                                         │
│ 📅 Torneo: Sábado 27 Julio - 16:00h                    │
│ 💰 Inscripción: 35€ - Premio adicional: 150€           │
│ 👥 Inscritos: 12/16 jugadores PLATA                    │
│                                                         │
│ ⚠️ Recuerda: Si no ganas, sigues tu progreso normal     │
│ No hay penalizaciones por participar                   │
│                                                         │
│ [INSCRIBIRME]  [VER DETALLES]  [NO, GRACIAS]           │
└─────────────────────────────────────────────────────────┘
```

#### 🥇 ORO → 💎 PLATINO

```javascript
// Solo por invitación - Ver wireframes/00-sistema-niveles.md
const platinumInvitationCriteria = {
  points: 35, // 7 puntos sobre mínimo ORO
  monthsInOro: 6,
  monthlyMatches: 15,
  winRateInOro: 70,
  tournamentsWon: 1,
};
```

---

## ⚙️ Sistema de Validación Automática

### Frecuencia de Revisión

- **Cada victoria**: Verificación inmediata de umbral
- **Semanal**: Revisión masiva de elegibilidad
- **Mensual**: Validación de criterios temporales

### Wireframe: Notificación de Ascenso

```
┌─────────────────────────────────────────────────────────┐
│ 🎉 ¡ASCENSO AUTOMÁTICO!                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ¡Felicidades Juan! Has ascendido a:                    │
│                                                         │
│           🥉 BRONCE → 🥈 PLATA                          │
│                                                         │
│ 📊 Tus Méritos:                                         │
│ • Puntos conseguidos: 50 (demuestran experiencia)      │
│ • Ratio de victorias: 58% (nivel confirmado)           │
│                                                         │
│ 💡 ¿Por qué asciendes?                                  │
│ Los 50 puntos solo se consiguen jugando ~50 partidos   │
│ y ganando más del 50%. ¡Has demostrado nivel PLATA!    │
│                                                         │
│ 🎯 Nuevos Beneficios:                                   │
│ • Acceso a torneos intermedios (35+ puntos)            │
│ • Rival matching más competitivo                       │
│ • Badge 🥈 PLATA en tu perfil                          │
│ • Oportunidad de torneos de ascenso a ORO              │
│                                                         │
│ 💪 Próximo Objetivo: 🥇 ORO                             │
│ Solo necesitas: 70 puntos + 60% wins                   │
│                                                         │
│ [VER PROGRESO]    [COMPARTIR]    [CONTINUAR]           │
└─────────────────────────────────────────────────────────┘
```

---

## 🛡️ Sistema de Degradación por Mérito

### Criterios de Degradación Justos

- **Sin periodo de gracia**: Si pierdes, demuestras no estar en el nivel
- **Umbral de degradación**: -6 puntos bajo el mínimo del rango
- **Degradación inmediata**: Al alcanzar el umbral tras cualquier derrota
- **Recuperación posible**: Puedes volver a ascender inmediatamente si cumples criterios

### 🏆 Pertenencia al Ranking

**REGLA FUNDAMENTAL: Perteneces al rango mientras tengas los puntos mínimos**

```
┌─────────────┬─────────────────┬─────────────────────┬─────────────────────┐
│    RANGO    │ PUNTOS MÍNIMOS  │ PERTENENCIA RANKING │ UMBRAL DEGRADACIÓN  │
├─────────────┼─────────────────┼─────────────────────┼─────────────────────┤
│ 🥉 BRONCE   │      30         │   30+ puntos = ✅   │    ≤24 puntos = ❌   │
│ 🥈 PLATA    │      50         │   50+ puntos = ✅   │    ≤44 puntos = ❌   │
│ 🥇 ORO      │      70         │   70+ puntos = ✅   │    ≤64 puntos = ❌   │
│ 💎 PLATINO  │   Invitación    │   Invitado = ✅     │    ≤64 puntos = ❌   │
└─────────────┴─────────────────┴─────────────────────┴─────────────────────┘
```

### Ejemplos de Pertenencia al Ranking:

#### Caso 1: Jugador con 28 puntos

- **Situación**: Tiene 28 puntos (menos de 35 mínimos para PLATA)
- **Ranking**: Aparece en **🥉 BRONCE** (20 ≤ 28 < 35)
- **Estado**: En BRONCE, NO en zona de peligro (28 > 14)

#### Caso 2: Jugador con 42 puntos

- **Situación**: Tiene 42 puntos (más de 35 mínimos para PLATA)
- **Ranking**: Aparece en **🥈 PLATA** (35 ≤ 42 < 55)
- **Estado**: En PLATA estable

#### Caso 3: Jugador con 32 puntos

- **Situación**: Tiene 32 puntos (menos de 35 mínimos para PLATA)
- **Ranking**: Aparece en **🥉 BRONCE** (20 ≤ 32 < 35)
- **Estado**: En BRONCE, cerca del ascenso pero seguro (32 > 14)

### Wireframe: Ranking por Rangos

```
┌─────────────────────────────────────────────────────────┐
│ 🏆 Ranking General - Club Los Campeones                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🥇 ORO (70+ puntos):                                    │
│ 1. Carlos Ruiz      92 pts  ⬆️ (En ascenso)            │
│ 2. Ana García       78 pts  ➡️                         │
│ 3. Luis Martín      70 pts  ⚠️ (Límite mínimo)         │
│                                                         │
│ 🥈 PLATA (50-69 puntos):                                │
│ 4. María López      67 pts  ⬆️ (Cerca de ORO)          │
│ 5. Pedro Santos     61 pts  ➡️                         │
│ 6. Juan Pérez       56 pts  ➡️                         │
│ 7. Sofia Ruiz       50 pts  ⚠️ (Límite mínimo)         │
│ 8. Miguel Ángel     46 pts  ⬇️ (Descendió de PLATA)    │
│                                                         │
│ 🥉 BRONCE (30-49 puntos):                               │
│ 9. Laura Gómez      48 pts  ⬆️ (Cerca de PLATA)        │
│ 10. Diego Silva     42 pts  ➡️                         │
│ 11. Carmen Vega     36 pts  ➡️                         │
│ 12. Roberto Díaz    30 pts  ⚠️ (Límite mínimo)         │
│                                                         │
│ 🟫 COBRE (0-29 puntos):                                 │
│ 13. Elena Torres    26 pts  ⬆️ (Cerca de BRONCE)       │
│ 14. Pablo Moreno    18 pts  ➡️                         │
│ 15. Isabel Ruiz     12 pts  ➡️                          │
│                                                         │
│ [VER MÁS]  [FILTRAR RANGO]  [MI POSICIÓN]              │
└─────────────────────────────────────────────────────────┘
```

### 📊 Lógica de Clasificación en Código:

```javascript
function getUserRank(points) {
  if (points >= 55) return "oro";
  if (points >= 35) return "plata";
  if (points >= 20) return "bronce";
  return "cobre";
}

function getRankingDisplay(user) {
  const currentRank = getUserRank(user.points);
  const isAtMinimum = user.points === getRankMinPoints(currentRank);
  const wasPromoted = user.lastRankChange === "promotion";
  const wasDemoted = user.lastRankChange === "demotion";

  return {
    rank: currentRank,
    badge: getRankBadge(currentRank),
    status: isAtMinimum ? "⚠️ (Límite mínimo)" : wasPromoted ? "⬆️ (Ascendió)" : wasDemoted ? "⬇️ (Descendió)" : "➡️",
  };
}
```

### Umbrales de Degradación por Rango

```
┌─────────────┬─────────────────┬─────────────────────┬─────────────────────┐
│    RANGO    │ PUNTOS MÍNIMOS  │ UMBRAL DEGRADACIÓN  │ DIFERENCIA          │
├─────────────┼─────────────────┼─────────────────────┼─────────────────────┤
│ 🥉 BRONCE   │      30         │      24 puntos      │     -6 puntos       │
│ 🥈 PLATA    │      50         │      44 puntos      │     -6 puntos       │
│ 🥇 ORO      │      70         │      64 puntos      │     -6 puntos       │
│ 💎 PLATINO  │   Invitación    │      64 puntos      │ -6 desde ORO mín.   │
└─────────────┴─────────────────┴─────────────────────┴─────────────────────┘
```

### Criterios de Degradación Revisados

```javascript
const shouldDemote = (user) => {
  const rankMinPoints = getRankMinPoints(user.currentRank);
  const degradationThreshold = rankMinPoints - 6;
  const belowThreshold = user.points <= degradationThreshold;
  const inactive = user.matchesLastMonth < 2; // Solo por inactividad extrema

  return belowThreshold || inactive;
};

// Ejemplos prácticos:
// BRONCE (30 pts mín) → Degrada con 24 pts o menos
// PLATA (50 pts mín) → Degrada con 44 pts o menos
// ORO (70 pts mín) → Degrada con 64 pts o menos
```

### Wireframe: Advertencia de Degradación

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ ZONA DE PELIGRO - Riesgo de Degradación              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🥈 PLATA (Actual: 31 puntos)                           │
│                                                         │
│ ⚠️ ¡ATENCIÓN! Estás cerca de perder tu rango            │
│                                                         │
│ Límite de degradación: ████████████░░░░ 31/29 (107%)   │
│                                                         │
│ 📊 Situación Actual:                                    │
│ • Puntos actuales: 31                                  │
│ • Mínimo PLATA: 35 puntos                              │
│ • Umbral degradación: 29 puntos                        │
│ • Margen actual: 2 puntos                              │
│                                                         │
│ 💡 ¿Qué significa esto?                                 │
│ • Si pierdes 1 partido más (-3 pts) → 28 puntos        │
│ • Esto te llevaría por debajo de 29 puntos             │
│ • Descenderías automáticamente a 🥉 BRONCE             │
│                                                         │
│ 🎯 Para mantenerte en PLATA:                            │
│ • Gana tu próximo partido (+3 pts) → 34 puntos         │
│ • O al menos empata (+1 pt) → 32 puntos                │
│                                                         │
│ [BUSCAR PARTIDO]    [VER RIVALES]    [ENTENDIDO]       │
└─────────────────────────────────────────────────────────┘
```

### Wireframe: Notificación de Degradación

```
┌─────────────────────────────────────────────────────────┐
│ 📉 DEGRADACIÓN DE RANGO                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Lo sentimos Juan, has descendido de rango:             │
│                                                         │
│           🥈 PLATA → 🥉 BRONCE                          │
│                                                         │
│ 📊 Motivo de la Degradación:                            │
│ • Puntos actuales: 28                                  │
│ • Umbral mínimo PLATA: 29 puntos                       │
│ • Resultado del último partido: Derrota (-3 pts)       │
│                                                         │
│ 💪 ¡No te desanimes!                                    │
│ • Tu nivel de juego puede fluctuar                     │
│ • Puedes recuperar PLATA inmediatamente                │
│ • Solo necesitas ganar ~7 partidos seguidos            │
│                                                         │
│ 🎯 Para recuperar 🥈 PLATA necesitas:                   │
│ • Alcanzar 50 puntos (faltan 22 puntos)                │
│ • Mantenir 50%+ win rate                               │
│ • Participar en torneos para bonus                     │
│                                                         │
│ [VER PLAN RECUPERACIÓN]  [BUSCAR PARTIDOS]  [ACEPTAR]  │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Progreso Visualizado - Sistema Illustrativo de Rankings

### 🎯 Barra de Progreso Multi-Nivel con Umbrales Reales

#### Ejemplo 1: Jugador en PLATA progresando hacia ORO

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Progreso en el Sistema de Rankings - Juan Pérez      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🎯 RANGO ACTUAL: 🥈 PLATA (Actual: 62 puntos)          │
│                                                         │
│ 📊 LÍNEA DE PROGRESO COMPLETA:                          │
│                                                         │
│ 🟫 COBRE     🥉 BRONCE     🥈 PLATA     🥇 ORO     💎 PLATINO │
│  0 ──────── 30 ──────── 50 ──────── 70 ──────── 90+     │
│  │    ✅      │    ✅      │    ⬤ 62   │           │      │
│  └─ Mín: 0   └─ Mín: 20   └─ Mín: 35  └─ Mín: 55 └─ Inv │
│                                                         │
│ 🎯 PROGRESO HACIA 🥇 ORO:                               │
│ Puntos: ████████████████████████░░░░ 62/70 (89%)       │
│ WinRate: ██████████████████████████ 68%/60% ✅          │
│                                                         │
│ 📋 STATUS ACTUAL:                                       │
│ ✅ Cumples requisito WinRate (68% > 60% requerido)     │
│ ⏳ Te faltan 8 puntos para ascender (62/70)            │
│ 🎯 Necesitas ~3 victorias más para ORO                 │
│                                                         │
│ 🚨 ZONA SEGURA EN PLATA:                                │
│ • Mínimo PLATA: 35 pts (✅ Tienes 62 - Muy seguro)     │
│ • Degradación: Solo si bajas de 29 pts                 │
│ • Margen actual: 33 puntos de seguridad                │
│                                                         │
│ [VER TORNEOS DE ASCENSO]  [HISTORIAL]  [BUSCAR RIVAL]  │
└─────────────────────────────────────────────────────────┘
```

#### Ejemplo 2: Jugador en BRONCE cerca del ascenso a PLATA

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Progreso en el Sistema de Rankings - María López     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🎯 RANGO ACTUAL: 🥉 BRONCE (Actual: 47 puntos)         │
│                                                         │
│ 📊 LÍNEA DE PROGRESO COMPLETA:                          │
│                                                         │
│ 🟫 COBRE     🥉 BRONCE     🥈 PLATA     🥇 ORO     💎 PLATINO │
│  0 ──────── 30 ──────── 50 ──────── 70 ──────── 90+     │
│  │    ✅      │    ⬤ 47   │           │           │      │
│  └─ Mín: 0   └─ Mín: 20   └─ Mín: 35  └─ Mín: 55 └─ Inv │
│                                                         │
│ 🎯 PROGRESO HACIA 🥈 PLATA:                             │
│ Puntos: ███████████████████████████░░░ 47/50 (94%)     │
│ WinRate: ████████████████████████░░░░ 48%/50% ⚠️        │
│                                                         │
│ 📋 STATUS ACTUAL:                                       │
│ ⚠️ WinRate insuficiente (48% < 50% requerido)          │
│ ⏳ Te faltan 3 puntos para el umbral (47/50)           │
│ 🎯 Necesitas ganar más partidos para mejorar WinRate   │
│                                                         │
│ 💡 ESTRATEGIA RECOMENDADA:                               │
│ • Gana 2 partidos seguidos → 53 pts + mejor WinRate    │
│ • Con 53 pts + 52% WinRate → ¡Ascenso automático!      │
│ • Alternative: Torneo BRONCE este fin de semana        │
│                                                         │
│ 🚨 ZONA SEGURA EN BRONCE:                               │
│ • Mínimo BRONCE: 20 pts (✅ Tienes 47 - Muy seguro)    │
│ • Degradación: Solo si bajas de 14 pts                 │
│ • Margen actual: 33 puntos de seguridad                │
│                                                         │
│ [INSCRIBIRSE TORNEO]  [BUSCAR PARTIDOS]  [TIPS MEJORA] │
└─────────────────────────────────────────────────────────┘
```

#### Ejemplo 3: Jugador nuevo en COBRE progresando

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Progreso en el Sistema de Rankings - Carlos Nuevo    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ � RANGO ACTUAL: 🟫 COBRE (Actual: 18 puntos)          │
│                                                         │
│ 📊 LÍNEA DE PROGRESO COMPLETA:                          │
│                                                         │
│ 🟫 COBRE     🥉 BRONCE     🥈 PLATA     🥇 ORO     💎 PLATINO │
│  0 ──────── 30 ──────── 50 ──────── 70 ──────── 90+     │
│  │    ⬤ 18   │           │           │           │      │
│  └─ Mín: 0   └─ Mín: 20   └─ Mín: 35  └─ Mín: 55 └─ Inv │
│                                                         │
│ 🎯 PROGRESO HACIA 🥉 BRONCE:                            │
│ Puntos: ████████████████████░░░░░░░░ 18/30 (60%)       │
│ WinRate: ███████████████████████░░░░ 46%/40% ✅         │
│                                                         │
│ 📋 STATUS ACTUAL:                                       │
│ ✅ Cumples requisito WinRate (46% > 40% requerido)     │
│ ⏳ Te faltan 12 puntos para BRONCE (18/30)             │
│ 🎯 Necesitas ~4-5 victorias más para ascender          │
│                                                         │
│ 💪 ¡EXCELENTE PROGRESO!                                 │
│ • Has jugado ~39 partidos (18 pts = experiencia)       │
│ • Tu WinRate de 46% está por encima del mínimo         │
│ • Con tu ritmo actual: BRONCE en 2-3 semanas           │
│                                                         │
│ 🎊 PRIMER ASCENSO A LA VISTA:                           │
│ • Alternative rápida: Torneo COBRE disponible          │
│ • Si ganas torneo: Ascenso inmediato + bonus           │
│ • Sin presión: No hay degradación desde COBRE          │
│                                                         │
│ [VER TORNEO COBRE]  [BUSCAR RIVALES]  [GUÍA PRINCIPIANTE] │
└─────────────────────────────────────────────────────────┘
```

#### Ejemplo 4: Jugador ORO elegible para invitación PLATINO

```
┌─────────────────────────────────────────────────────────┐
│ 📈 Progreso en el Sistema de Rankings - Elena Pro       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🎯 RANGO ACTUAL: 🥇 ORO (Actual: 87 puntos)            │
│                                                         │
│ 📊 LÍNEA DE PROGRESO COMPLETA:                          │
│                                                         │
│ 🟫 COBRE     🥉 BRONCE     🥈 PLATA     🥇 ORO     💎 PLATINO │
│  0 ──────── 30 ──────── 50 ──────── 70 ──────── 90+     │
│  │    ✅      │    ✅      │    ✅      │    ⬤ 87  │      │
│  └─ Mín: 0   └─ Mín: 20   └─ Mín: 35  └─ Mín: 55 └─ Inv │
│                                                         │
│ 🎯 PROGRESO HACIA 💎 PLATINO:                           │
│ Puntos: ███████████████████████████░░░ 87/90 (97%)     │
│ WinRate ORO: ████████████████████████ 73%/70% ✅        │
│ Meses en ORO: ████████████░░░░░░░░░░░░ 8/6 meses ✅     │
│ Torneos ganados: ██████░░░░░░░░░░░░░░░░ 1/2 ⚠️          │
│                                                         │
│ 📋 CRITERIOS PARA INVITACIÓN:                           │
│ ✅ Puntos suficientes (87/90 - Solo faltan 3)          │
│ ✅ WinRate en ORO excelente (73% > 70%)                │
│ ✅ Tiempo en ORO cumplido (8 > 6 meses)                │
│ ⚠️ Torneos ganados (1/2 - Falta 1 torneo)              │
│ ✅ Partidos mensuales (18 > 15 partidos/mes)           │
│                                                         │
│ 🏆 CAMINO A PLATINO:                                    │
│ • ¡Estás a solo 1 torneo ganado de ser elegible!       │
│ • Próximo torneo mixto: Sábado 15 Agosto               │
│ • Si ganas: +3 pts (90) + criterio cumplido            │
│ • El club evaluará tu invitación automáticamente       │
│                                                         │
│ 🚨 MANTÉN TU NIVEL ORO:                                 │
│ • Mínimo ORO: 55 pts (✅ Tienes 87 - Súper seguro)     │
│ • Degradación: Solo si bajas de 49 pts (imposible)     │
│                                                         │
│ [VER TORNEOS ELITE]  [ESTADÍSTICAS]  [PERFIL PLATINO]  │
└─────────────────────────────────────────────────────────┘
```

### 🎨 Código de Implementación para Barras Dinámicas

```javascript
// Función para generar la barra de progreso ilustrativa
function generateRankProgressBar(userStats) {
  const { currentRank, points, winRate, monthsInRank, tournamentsWon } = userStats;
  
  // Umbrales del sistema actual
  const thresholds = {
    cobre: { min: 0, next: 30, winRateReq: 40, nextRank: 'bronce' },
    bronce: { min: 20, next: 50, winRateReq: 50, nextRank: 'plata' },
    plata: { min: 35, next: 70, winRateReq: 60, nextRank: 'oro' },
    oro: { min: 55, next: 90, winRateReq: 70, nextRank: 'platino', special: true }
  };
  
  const current = thresholds[currentRank];
  const progressPoints = Math.round((points / current.next) * 100);
  const progressWinRate = Math.round((winRate / current.winRateReq) * 100);
  
  // Calcular barras visuales
  const pointsBar = '█'.repeat(Math.floor(progressPoints/4)) + '░'.repeat(25 - Math.floor(progressPoints/4));
  const winRateBar = '█'.repeat(Math.floor(progressWinRate/4)) + '░'.repeat(25 - Math.floor(progressWinRate/4));
  
  // Calcular estado y consejos
  const pointsNeeded = current.next - points;
  const winRateStatus = winRate >= current.winRateReq ? '✅' : '⚠️';
  const winsNeeded = Math.ceil(pointsNeeded / 3);
  
  return {
    progressPoints,
    progressWinRate,
    pointsBar,
    winRateBar,
    pointsNeeded,
    winsNeeded,
    winRateStatus,
    advice: generateAdvice(userStats, current)
  };
}

// Generar consejos contextuales
function generateAdvice(stats, thresholds) {
  if (stats.points >= thresholds.next && stats.winRate >= thresholds.winRateReq) {
    return "¡Ascenso automático disponible! El sistema te promoverá en la próxima actualización.";
  }
  
  if (stats.points >= thresholds.next) {
    return `Tienes suficientes puntos, pero necesitas mejorar tu WinRate al ${thresholds.winRateReq}%`;
  }
  
  if (stats.winRate >= thresholds.winRateReq) {
    return `Excelente WinRate! Solo necesitas ${thresholds.next - stats.points} puntos más.`;
  }
  
  return `Necesitas tanto más puntos como mejor WinRate. ¡Sigue jugando y ganando!`;
}
```

---

## � Sistema de Reportes de Conducta Antideportiva

### Gestión Directa por el Club

El **fairplay automático** ha sido eliminado. En su lugar:

- **Solo el club** puede gestionar incidentes de conducta
- **Jugadores pueden reportar** comportamientos antideportivos
- **Club investiga** y determina las medidas apropiadas
- **Flexibilidad total** para cada situación específica

### Wireframe: Sistema de Reportes

```
┌─────────────────────────────────────────────────────────┐
│ 🚨 Reportar Conducta Antideportiva                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📍 Partido: Sábado 20 Julio - 18:00h                   │
│ 👥 Jugadores: Juan Pérez vs Miguel Ángel               │
│                                                         │
│ 🎯 Tipo de Incidente:                                   │
│ [ ] Insultos o faltas de respeto                       │
│ [ ] Trampas o juego desleal                            │
│ [ ] Agresividad física o verbal                        │
│ [ ] Disputa de puntuación maliciosa                    │
│ [ ] Abandono injustificado del partido                 │
│ [ ] Otro (especificar)                                 │
│                                                         │
│ 📝 Descripción del incidente:                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Describe qué ocurrió específicamente...             │ │
│ │                                                     │ │
│ │                                                     │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 👁️ ¿Hubo testigos?                                      │
│ [ ] Sí, otros jugadores  [ ] Sí, personal del club     │
│ [ ] No hubo testigos                                   │
│                                                         │
│ ⚠️ Nota: Este reporte será enviado directamente al      │
│ club para su investigación. Se contactará con ambas    │
│ partes para esclarecer los hechos.                     │
│                                                         │
│ [ENVIAR REPORTE]        [CANCELAR]                     │
└─────────────────────────────────────────────────────────┘
```

### Wireframe: Panel de Gestión del Club

```
┌─────────────────────────────────────────────────────────┐
│ 🛡️ Gestión de Incidentes - Club Los Campeones          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📋 Reportes Pendientes (3):                             │
│                                                         │
│ 🚨 REPORTE #247 - URGENTE                               │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Reportado: Miguel Ángel (🥈 PLATA)                  │ │
│ │ Por: Juan Pérez                                     │ │
│ │ Fecha: 20 Jul 2025 - 18:00h                        │ │
│ │ Tipo: Insultos y faltas de respeto                 │ │
│ │                                                     │ │
│ │ Descripción: "Durante el partido Miguel comenzó    │ │
│ │ a insultar y descalificar mi juego..."             │ │
│ │                                                     │ │
│ │ 🎾 Resultado afectado: Juan 6-4, 6-2 Miguel        │ │
│ │ 📊 Puntos en disputa: Miguel perdió 3 pts          │ │
│ │                                                     │ │
│ │ [INVESTIGAR] [CONTACTAR MIGUEL] [VER HISTORIAL]    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 📊 Historial Miguel Ángel:                              │
│ • Reportes previos: 1 (advertencia verbal - Mar 2025)  │
│ • Tiempo en club: 8 meses                              │
│ • Actividad: Regular (15 partidos/mes)                 │
│                                                         │
│ 🔧 Acciones Disponibles:                                │
│ [ ] Advertencia verbal                                 │
│ [ ] Advertencia escrita                                │
│ [ ] Suspensión temporal (1-7 días)                     │
│ [ ] Anular resultado del partido                       │
│ [ ] Descalificar del próximo torneo                    │
│ [ ] Reunión presencial obligatoria                     │
│ [ ] Sanción personalizada                              │
│                                                         │
│ [APLICAR SANCIÓN]  [ARCHIVAR]  [PEDIR MÁS INFO]        │
└─────────────────────────────────────────────────────────┘
```

### Medidas que Puede Tomar el Club

#### 🟡 Sanciones Leves

- **Advertencia verbal**: Conversación con el jugador
- **Advertencia escrita**: Registro formal en el historial
- **Reunión educativa**: Sesión sobre fair play

#### 🟠 Sanciones Moderadas

- **Suspensión temporal**: 1-7 días sin poder jugar
- **Exclusión de torneo**: No puede participar en el próximo torneo
- **Servicio comunitario**: Ayudar en organización de eventos

#### 🔴 Sanciones Graves

- **Anulación de resultado**: El partido se da por perdido
- **Suspensión prolongada**: 1-4 semanas sin actividad
- **Expulsión del club**: En casos extremos de reincidencia

### Impacto en el Sistema de Rangos

#### Para Ascensos Normales (COBRE → BRONCE → PLATA → ORO)

- **Criterio único**: Solo puntos + win rate
- **Sin impacto**: Los reportes no afectan automáticamente los ascensos

#### Para Invitación PLATINO (ORO → PLATINO)

- **Criterios objetivos**: Cumplir estadísticas de rendimiento
- **Evaluación club**: Solo para verificar elegibilidad estadística

### Wireframe: Notificación de Sanción

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ NOTIFICACIÓN OFICIAL DEL CLUB                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Estimado Miguel Ángel,                                  │
│                                                         │
│ Tras investigar el reporte #247 del 20 de Julio,       │
│ hemos determinado aplicar la siguiente medida:          │
│                                                         │
│ 📋 SANCIÓN APLICADA:                                    │
│ • Tipo: Advertencia escrita                            │
│ • Motivo: Conducta irrespetuosa durante partido        │
│ • Vigencia: Registro permanente en historial           │
│                                                         │
│ 🎾 DECISIÓN SOBRE EL RESULTADO:                         │
│ • El resultado del partido se mantiene válido          │
│ • No hay cambios en la puntuación                      │
│ • Juan Pérez mantiene su victoria 6-4, 6-2             │
│                                                         │
│ 💡 IMPORTANTE:                                          │
│ • Esta sanción NO afecta tu rango actual               │
│ • Puedes seguir ascendiendo normalmente                │
│ • Los criterios de ascenso son solo deportivos         │
│ • Solo se requiere respetar a otros jugadores          │
│                                                         │
│ ⚠️ ADVERTENCIA:                                          │
│ Un segundo incidente similar resultará en suspensión   │
│ temporal. Valoramos el ambiente deportivo del club.    │
│                                                         │
│ Atentamente,                                           │
│ Comité Disciplinario - Club Los Campeones             │
│                                                         │
│ [ACEPTAR]        [SOLICITAR REUNIÓN]                   │
└─────────────────────────────────────────────────────────┘
```

---

## �🔧 Implementación Técnica

### Base de Datos: Tabla rank_progression

```sql
CREATE TABLE rank_progression (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    current_rank ENUM('cobre', 'bronce', 'plata', 'oro', 'platino'),
    points INT NOT NULL,
    matches_played INT DEFAULT 0,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    months_in_rank INT DEFAULT 0,
    tournaments_participated INT DEFAULT 0,
    tournaments_won INT DEFAULT 0,
    last_promotion_date TIMESTAMP,
    auto_promotion_eligible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

### Base de Datos: Sistema de Reportes

```sql
-- Tabla de reportes de conducta
CREATE TABLE conduct_reports (
    id SERIAL PRIMARY KEY,
    reported_user_id INT REFERENCES users(id),
    reporter_user_id INT REFERENCES users(id),
    match_id INT REFERENCES matches(id),
    incident_type ENUM('insults', 'cheating', 'aggression', 'score_dispute', 'abandonment', 'other'),
    description TEXT NOT NULL,
    has_witnesses BOOLEAN DEFAULT FALSE,
    witness_details TEXT,
    status ENUM('pending', 'investigating', 'resolved', 'dismissed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de sanciones aplicadas por el club
CREATE TABLE club_sanctions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    report_id INT REFERENCES conduct_reports(id),
    sanction_type ENUM('verbal_warning', 'written_warning', 'temporary_suspension', 'tournament_exclusion', 'match_annulment', 'meeting_required', 'expulsion'),
    severity ENUM('light', 'moderate', 'severe'),
    description TEXT,
    duration_days INT DEFAULT 0,  -- Para suspensiones temporales
    applied_by INT REFERENCES club_admins(id),
    active BOOLEAN DEFAULT TRUE,
    applied_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Tabla de historial disciplinario
CREATE TABLE disciplinary_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    incident_date DATE,
    incident_type VARCHAR(100),
    sanction_applied VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Componente Angular: RankProgressionService

```typescript
@Injectable()
export class RankProgressionService {
  checkAutoPromotion(userId: number): Promise<PromotionResult> {
    // Implementar lógica de verificación (solo puntos + win rate)
  }

  calculateProgressToNext(userId: number): Promise<ProgressData> {
    // Calcular progreso hacia siguiente rango
  }

  getPromotionRequirements(currentRank: string): Requirements {
    // Retornar requisitos para siguiente rango (solo puntos + win rate)
  }
}

@Injectable()
export class ConductReportService {
  submitReport(reportData: ConductReport): Promise<void> {
    // Enviar reporte al club para investigación
  }

  getClubReports(clubId: number): Promise<ConductReport[]> {
    // Para panel de administración del club
  }

  applySanction(reportId: number, sanction: Sanction): Promise<void> {
    // Aplicar sanción determinada por el club
  }

  getUserDisciplinaryHistory(userId: number): Promise<DisciplinaryRecord[]> {
    // Historial de incidentes para evaluación PLATINO
  }

  checkClubEligibility(userId: number): Promise<boolean> {
    // Verificar elegibilidad estadística para PLATINO
  }
}
```

---

## 🎮 Casos de Uso Actualizados

### Ejemplo 1: Lógica Perfecta de Puntos = Experiencia

- **Situación**: Jugador con 50 puntos y 58% win rate
- **Análisis**: 50 puntos = al menos 45-50 partidos jugados + victorias suficientes
- **Sistema**: Reconoce automáticamente que ya demostró el nivel PLATA
- **Ventaja**: Sin redundancias, máxima simplicidad

### Ejemplo 2: Jugador Eficiente vs Jugador Voluminoso

- **Jugador A**: 50 puntos en 35 partidos (muy eficiente, 71% wins)
- **Jugador B**: 50 puntos en 55 partidos (más volumen, 55% wins)
- **Sistema**: Ambos ascienden (ambos demostraron nivel PLATA)
- **Filosofía**: Los puntos ya capturan toda la información necesaria

### Ejemplo 3: Eliminación de Barreras Artificiales

- **Antes**: "Tienes 65 puntos pero solo 45 partidos, necesitas 10 más"
- **Ahora**: "Tienes 65 puntos, claramente tienes nivel ORO+"
- **Resultado**: Sistema intuitivo y lógico basado en rendimiento real
- **Impacto**: Cero frustraciones por requisitos redundantes

### Ejemplo 4: Win Rate como Único Filtro de Calidad

- **Función**: El win rate asegura que los puntos se obtuvieron con calidad
- **Ejemplo**: 50 puntos con 30% wins = muchas derrotas, no asciende a PLATA
- **Ejemplo**: 50 puntos con 60% wins = dominó su nivel, asciende a PLATA
- **Beneficio**: Criterio matemático objetivo que valida la consistencia

### Ejemplo 5: Sistema Ultra-Simplificado

- **Ascenso**: Solo puntos + win rate (máxima simplicidad)
- **Conducta**: Sistema independiente de reportes cuando sea necesario
- **Resultado**: Separación total entre rendimiento y disciplina
- **Adopción**: Eliminación de cualquier interferencia subjetiva

---

## 📊 Métricas del Sistema

### KPIs de Ascenso (Temporada Septiembre-Junio)

- **Tiempo promedio por rango**: COBRE(3-4 meses) → BRONCE(5-6 meses) → PLATA(7-8 meses) → ORO(9-10 meses)
- **Progresión realista**: Máximo 2-3 ascensos por temporada para jugadores muy activos
- **Distribución esperada**: 40% COBRE, 30% BRONCE, 20% PLATA, 8% ORO, 2% PLATINO
- **Retención post-ascenso**: >95% permanencia en nuevo rango tras 1 mes

### 🎯 Justificación de los Nuevos Umbrales

#### Umbrales Anteriores vs Actuales
```
┌─────────────┬─────────────────┬─────────────────┬─────────────────────┐
│   ASCENSO   │ UMBRAL ANTERIOR │ UMBRAL ACTUAL   │ MEJORA IMPLEMENTADA │
├─────────────┼─────────────────┼─────────────────┼─────────────────────┤
│ COBRE→BRONCE│   15 pts + 40%  │  30 pts + 40%   │ +100% experiencia   │
│ BRONCE→PLATA│   25 pts + 50%  │  50 pts + 50%   │ +100% experiencia   │
│ PLATA→ORO   │   35 pts + 60%  │  70 pts + 60%   │ +100% experiencia   │
│ ORO→PLATINO │   35 pts + 70%  │  90 pts + 70%   │ +157% experiencia   │
└─────────────┴─────────────────┴─────────────────┴─────────────────────┘
```

#### Beneficios de los Nuevos Umbrales
- **Mayor prestigio**: Cada rango requiere demostrar nivel real
- **Mejor matching**: Jugadores en cada rango tienen nivel más homogéneo  
- **Reducción sandbagging**: Más difícil quedarse en rangos bajos intencionalmente
- **Torneos competitivos**: Acceso restringido asegura calidad de competición
- **Progresión realista**: Tiempos de ascenso acordes a curva de aprendizaje real

### Alertas Automáticas

- Usuario cerca de ascenso (90% requisitos)
- Usuario en riesgo de degradación
- Anomalías en progresión (ascenso muy rápido)

---

## ⚖️ Separación Total: Rendimiento vs Disciplina

### 🎯 Principio Fundamental

**Los sistemas de ascenso y disciplina son completamente independientes:**

#### Sistema de Ascenso (Automático)

- **Criterios**: Solo puntos + win rate
- **Objetivo**: Medir nivel deportivo puro
- **Gestión**: Algoritmo automático sin intervención humana
- **Imparcialidad**: Sin factores subjetivos

#### Sistema Disciplinario (Manual)

- **Criterios**: Solo cuando hay reportes específicos
- **Objetivo**: Mantener ambiente deportivo saludable
- **Gestión**: Club evalúa caso por caso
- **Flexibilidad**: Medidas apropiadas para cada situación

### 🔗 Interacción Entre Sistemas

- **Regla general**: Los reportes NO afectan rangos
- **Excepción única**: Suspensiones que impiden jugar partidos
- **Recuperación**: Al volver, se aplican criterios normales de ascenso

### 💡 Beneficios de la Separación

- **Claridad**: Cada sistema tiene propósito específico
- **Justicia**: El rendimiento no se penaliza por incidentes menores
- **Simplicidad**: Criterios de ascenso ultra-claros
- **Flexibilidad**: El club maneja disciplina según contexto

---

## 📅 Calibración para Temporada de Competición

### 🗓️ Cronograma de Temporada (Septiembre - Junio)

**Duración total**: 10 meses (40 semanas de competición)
**Calendario sugerido**:
- **Septiembre**: Inicio de temporada, calibración inicial
- **Octubre-Diciembre**: Primer trimestre competitivo
- **Enero-Marzo**: Segundo trimestre competitivo  
- **Abril-Junio**: Trimestre final y playoffs
- **Julio-Agosto**: Descanso y preparación nueva temporada

### 📊 Distribución Esperada de Jugadores por Mes

```
┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│    MES    │  COBRE  │ BRONCE  │  PLATA  │   ORO   │ PLATINO │
├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Sept (M1) │   70%   │   25%   │    4%   │    1%   │    0%   │
│ Nov (M3)  │   55%   │   35%   │    8%   │    2%   │    0%   │
│ Ene (M5)  │   45%   │   35%   │   15%   │    4%   │    1%   │
│ Mar (M7)  │   40%   │   32%   │   20%   │    7%   │    1%   │
│ Jun (M10) │   40%   │   30%   │   20%   │    8%   │    2%   │
└───────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
```

### 🎯 Objetivos de Progresión Realistas

#### Para Jugadores Nuevos (Inician en COBRE)
- **Meta conservadora**: Alcanzar BRONCE (30 pts) en 3-4 meses
- **Meta ambiciosa**: Alcanzar PLATA (50 pts) en 6-7 meses
- **Meta excepcional**: Alcanzar ORO (70 pts) en 8-9 meses

#### Para Jugadores Experimentados (Inician en BRONCE/PLATA)
- **Jugadores BRONCE**: Objetivo PLATA en 3-4 meses adicionales
- **Jugadores PLATA**: Objetivo ORO requiere toda la temporada
- **Ascenso a PLATINO**: Solo 2% de élite al final de temporada

### ⚖️ Validación de Umbrales

Los umbrales actualizados están calibrados para:

1. **Evitar inflación**: No todos pueden llegar a ORO fácilmente
2. **Mantener competitividad**: Cada rango mantiene su prestigio
3. **Progresión natural**: Tiempo suficiente para mejorar realmente
4. **Motivación sostenida**: Metas alcanzables pero desafiantes

### 📈 Actividad Mínima Recomendada

Para mantener progresión saludable:
- **Jugadores casuales**: 1-2 partidos/semana (40-80 partidos/temporada)
- **Jugadores regulares**: 2-3 partidos/semana (80-120 partidos/temporada)  
- **Jugadores competitivos**: 3-4 partidos/semana (120-160 partidos/temporada)

**Los umbrales actuales requieren un compromiso real pero alcanzable para cualquier jugador dedicado.**

---

_Documento técnico para implementación del sistema de ascenso automático_  
_Versión: 2.0 - 24 Julio 2025_
