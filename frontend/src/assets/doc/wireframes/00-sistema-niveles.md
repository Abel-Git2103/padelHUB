# 🏆 Sistema de Niveles y Competición - PadelHUB

## 📋 Resumen del Sistema

PadelHUB implementa un sistema de competición por méritos basado en **rangos de metales (Platino, Oro, Plata, Bronce, Cobre)** como alternativa a Playtomic, enfocado en el progreso individual y por clubes sin comisiones.

---

## 🏷️ Estructura de Rangos

### Tabla de Correspondencia
```
┌─────────────┬──────────────────┬─────────────────────┬─────────────────────┐
│    RANGO    │ NIVEL EQUIVALENTE│ PERFIL JUGADOR      │ PUNTOS MIN. TORNEO  │
├─────────────┼──────────────────┼─────────────────────┼─────────────────────┤
│ 💎 PLATINO  │    6.0 - 7.0     │ Jugador élite       │ Solo invitación     │
│ 🥇 ORO      │    4.0 - 5.9     │ Jugador avanzado    │      70 pts         │
│ 🥈 PLATA    │    2.0 - 3.9     │ Jugador intermedio  │      50 pts         │
│ 🥉 BRONCE   │    1.0 - 1.9     │ Jugador amateur     │      30 pts         │
│ 🟫 COBRE    │    0 - 0.9       │ Principiante        │      15 pts         │
└─────────────┴──────────────────┴─────────────────────┴─────────────────────┘
```

### Wireframe: Selector de Rango
```
┌─────────────────────────────────────────────┐
│ 🏆 Selecciona tu Rango de Nivel             │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐ │
│ │ 💎      │ │ 🥇      │ │ 🥈      │ │ 🥉  │ │
│ │PLATINO  │ │  ORO    │ │ PLATA   │ │BRONCE│ │
│ │6.0-7.0  │ │4.0-5.9  │ │ 2.0-3.9 │ │1.0-1.9│ │
│ └─────────┘ └─────────┘ └─────────┘ └─────┘ │
│                                             │
│ ┌─────────┐                                 │
│ │ 🟫      │ "Tu nivel será validado por     │
│ │ COBRE   │ otros jugadores del club"       │
│ │ 0-0.9   │                                 │
│ └─────────┘                                 │
│                                             │
│ [CONFIRMAR SELECCIÓN]                       │
└─────────────────────────────────────────────┘
```

---

## ⚔️ Tipos de Partido

### 1. 🎯 Partido Igualado
- **Restricción**: Solo jugadores del **mismo rango**
- **Elegibilidad**: Puede ser entre clubes diferentes
- **Puntuación**: ✅ **SÍ PUNTÚA** (individual + club)
- **Objetivo**: Competición equilibrada y justa

### 2. 🔀 Partido No Igualado (Mixto)
- **Creación**: El organizador define rango objetivo
- **Solicitud**: Jugadores de otros rangos solicitan acceso
- **Validación**: Si **todos** son del rango objetivo o superior → **PUNTÚA**
- **Excepción**: Si **algún** jugador es de rango inferior → **AMISTOSO** (no puntúa)

### 3. 🤝 Partido Amistoso
- **Activación**: Automática cuando hay jugadores de rango inferior
- **Puntuación**: ❌ **NO PUNTÚA**
- **Propósito**: Diversión y aprendizaje sin afectar rankings

### Wireframe: Creador de Partido
```
┌─────────────────────────────────────────────────────────┐
│ ⚔️ Crear Nuevo Partido                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Tipo de Partido:                                        │
│ ○ Igualado (Solo rango 🥈 PLATA)  ○ No Igualado         │
│                                                         │
│ ┌─ Configuración Partido No Igualado ─────────────────┐ │
│ │ Rango Objetivo: [🥈 PLATA ▼]                        │ │
│ │                                                     │ │
│ │ Jugadores Permitidos:                               │ │
│ │ ✅ 🥈 PLATA (mismo nivel)                           │ │
│ │ ✅ 🥇 ORO (nivel superior)                          │ │
│ │ ✅ 💎 PLATINO (nivel superior)                      │ │
│ │ ⚠️  🥉 BRONCE/🟫 COBRE → Convertirá en AMISTOSO    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 📅 Fecha: [DD/MM/YYYY] ⏰ Hora: [HH:MM]                │
│ 🏟️ Club: [Mi Club ▼]          🎾 Pista: [Pista 1 ▼]    │
│ 💰 Coste: €15/persona                                   │
│                                                         │
│ 📝 Comentarios:                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Buscamos jugadores rango PLATA para partido comp.   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [CREAR PARTIDO]              [CANCELAR]                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Sistema de Puntuación

### Fórmula de Puntos
```
Victoria Individual → +3 puntos personales + puntos al club
Empate Individual   → +1 punto personal + puntos al club  
Derrota Individual  → -3 puntos personales (club no pierde)
```

### Puntos de Inicio
- **Fórmula**: Mínimo del rango + 6 puntos de margen
- **Ejemplo Rango 🥈 PLATA**: 50 puntos mínimos + 6 = **56 puntos iniciales**

### Wireframe: Calculadora de Puntos
```
┌─────────────────────────────────────────────────────┐
│ 📊 Resultado del Partido                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Pareja 1: Juan (🥈) + María (🥈)  vs               │
│ Pareja 2: Pedro (🥈) + Ana (🥈)                     │
│                                                     │
│ Resultado Final: 6-4, 3-6, 6-2                     │
│                                                     │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🏆 GANADORES - Pareja 1                        │ │
│ │ Juan:  47 pts → 50 pts (+3) ⬆️ 🥈 PLATA        │ │
│ │ María: 67 pts → 70 pts (+3) ⬆️ 🥇 ORO!          │ │
│ │                                                 │ │
│ │ 😞 PERDEDORES - Pareja 2                       │ │
│ │ Pedro: 53 pts → 50 pts (-3) ⬇️ 🥈 PLATA        │ │
│ │ Ana:   52 pts → 49 pts (-3) ⬇️ 🥈 PLATA        │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│ 🏟️ Club "Los Campeones": +4 puntos                 │
│                                                     │
│ [CONFIRMAR RESULTADO]      [DISPUTAR]               │
└─────────────────────────────────────────────────────┘
```

---

## 🏆 Sistema de Torneos

### Acceso por Puntos Mínimos
```
🟫 COBRE: 15 puntos    → Torneos básicos
🥉 BRONCE: 30 puntos   → Torneos amateur  
🥈 PLATA: 50 puntos    → Torneos intermedios
🥇 ORO: 70 puntos      → Torneos avanzados
💎 PLATINO: Invitación → Torneos élite (sistema especial)
```

### 💎 Sistema de Invitación PLATINO

#### **Criterios de Elegibilidad Automática:**
- **Rango**: 🥇 ORO con **35+ puntos** (7 puntos sobre mínimo)
- **Consistencia**: Mínimo **6 meses** en rango ORO
- **Actividad**: **15+ partidos/mes** últimos 3 meses
- **Performance**: **70%+ victorias** en partidos igualados ORO
- **Torneos**: **1+ torneo interclubes** ganado
- **Fairplay**: **4.5+/5** valoración promedio
- **Contribución**: Participación activa en eventos del club

#### **Tipos de Invitación:**
1. **🤖 Automática**: Cumple todos los criterios → Revisión semanal
2. **🏛️ Comité**: Casos especiales → Evaluación mensual por 5 PLATINO
3. **🎯 Recomendación**: 3+ jugadores PLATINO avalan → Validación 80% criterios

#### **Sistema Anti-Abuso:**
- **Cooldown**: Rechazar invitación = 6 meses sin nueva oportunidad
- **Límite global**: Máximo 5% de jugadores ORO en PLATINO
- **Retención**: Revisión trimestral, degradación por bajo rendimiento
- **Validación continua**: Mantener 25+ puntos y 60%+ victorias

### Tipos de Competición

#### 🏠 Torneos Internos
- **Participantes**: Solo miembros del club
- **Organización**: Administrador del club
- **Premios**: Saldo monedero + puntos

#### 🌐 Torneos Interclubes  
- **Participantes**: Jugadores de múltiples clubes
- **Validación**: Mismo sistema de grupos
- **Ranking**: Impacta ranking nacional

#### ⚡ Torneos Mixtos
- **Equipos**: Jugadores de diferentes clubes
- **Puntuación**: Individual + representación de club
- **Innovación**: Fomenta integración entre clubes

### Wireframe: Progreso hacia PLATINO
```
┌─────────────────────────────────────────────────────────────┐
│ 💎 Tu Progreso hacia PLATINO                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🎯 Estado Actual: 🥇 ORO (38 puntos)                       │
│                                                             │
│ 📊 Requisitos para Invitación Automática:                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Puntos: ████████████████████ 38/35 (108%) ✅           │ │
│ │ Tiempo: ████████████████████ 8/6 meses (133%) ✅       │ │
│ │ Actividad: ██████████████████ 18/15 partidos (120%) ✅ │ │
│ │ Victorias: █████████████████ 75%/70% (107%) ✅         │ │
│ │ Torneos: ████████████████████ 2/1 ganados (200%) ✅    │ │
│ │ Fairplay: ██████████████████ 4.7/4.5 (104%) ✅        │ │
│ │ Club: ███████████████████████ Activo ✅                │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 🎉 ¡ELEGIBLE PARA INVITACIÓN AUTOMÁTICA!                   │
│ Próxima revisión: Domingo 28 Julio                         │
│                                                             │
│ 🏆 Vías Alternativas:                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🎖️ Recomendaciones: 1/3 recibidas                      │ │
│ │ - Carlos Ruiz (💎): "Excelente técnica"                │ │
│ │ - Necesitas: 2 recomendaciones más                     │ │
│ │                                                         │ │
│ │ 🏛️ Comité Especial: No aplica                          │ │
│ │ (Solo casos excepcionales)                             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [SOLICITAR RECOMENDACIÓN]    [VER PLATINO ACTUALES]        │
└─────────────────────────────────────────────────────────────┘
```

### Wireframe: Invitación Recibida
```
┌─────────────────────────────────────────────────────────────┐
│ 🎉 ¡INVITACIÓN A PLATINO RECIBIDA!                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 💎 ¡Felicidades Juan!                                       │
│                                                             │
│ Has sido invitado al rango más prestigioso de PadelHUB     │
│ por tu excepcional rendimiento en el nivel ORO.            │
│                                                             │
│ 📊 Tus Méritos Destacados:                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ • 38 puntos en ORO (top 5% de la plataforma)           │ │
│ │ • 8 meses de consistencia excepcional                  │ │
│ │ • 75% ratio de victorias en partidos igualados         │ │
│ │ • 2 torneos interclubes ganados este año               │ │
│ │ • Valoración 4.7/5 de la comunidad                     │ │
│ │ • Participación activa en eventos del club             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 🏆 Beneficios Exclusivos PLATINO:                          │
│ • Torneos élite con premios 1000€+                         │
│ • Prioridad en reservas de pistas premium                  │
│ • Badge distintivo 💎 en tu perfil                         │
│ • 20% descuento en servicios premium                       │
│ • Acceso a eventos VIP y networking                        │
│ • Capacidad de recomendar nuevos PLATINO                   │
│                                                             │
│ ⚠️ CONDICIONES IMPORTANTES:                                 │
│ • Esta invitación expira en 7 días                         │
│ • Solo se envía una vez (no rechazar sin pensarlo)         │
│ • Debes mantener requisitos para permanecer en PLATINO     │
│ • Revisión trimestral de rendimiento                       │
│                                                             │
│ [🎯 ACEPTAR INVITACIÓN] [📋 VER DETALLES] [❌ RECHAZAR]    │
└─────────────────────────────────────────────────────────────┘
```
```
┌─────────────────────────────────────────────────────────────┐
│ 🏆 Torneos Disponibles - Rango 🥈 PLATA                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Filtros: [Todos ▼] [Este mes ▼] [Mi rango ▼]               │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🏠 Torneo Interno - Club Los Campeones               │   │
│ │ 📅 15-20 Agosto  👥 8/16 inscritos  💰 Premio: 200€  │   │
│ │ 🎯 🥈 PLATA   ⭐ Puntos: 18 (✅ Tienes 24)           │   │
│ │ [INSCRIBIRSE - 25€]                                   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🌐 Interclubes Regional - Rangos 🥇🥈                 │   │
│ │ 📅 22-25 Agosto  👥 24/32 inscritos  💰 1er: 500€    │   │
│ │ 🎯 🥇🥈 ORO-PLATA  ⭐ Puntos: 18+ (✅ Elegible)       │   │
│ │ [INSCRIBIRSE - 40€]                                   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ ⚡ Torneo Mixto - Región Madrid                       │   │
│ │ 📅 30 Ago-1 Sep  👥 12/20 equipos  💰 1er: 800€      │   │
│ │ 🎯 Equipos mixtos  ⭐ Puntos: 15+ (✅ Puedes formar)  │   │
│ │ [FORMAR EQUIPO]                                       │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🚫 Torneo Élite - Solo 💎 PLATINO                    │   │
│ │ 📅 5-8 Septiembre  👥 Solo invitación               │   │
│ │ 🎯 💎 PLATINO  ⚠️  Requiere invitación especial      │   │
│ │ [NO DISPONIBLE]                                       │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏟️ Gestión de Clubes

### Características del Sistema
- **Afiliación Temporal**: Septiembre a Mayo
- **Cambio Limitado**: Solo 1 cambio por temporada con justificación
- **Tarifas Libres**: Cada club define sus membresías
- **Sin Comisiones**: 0% en torneos y eventos

### Wireframe: Cambio de Club
```
┌─────────────────────────────────────────────────────────┐
│ 🏟️ Solicitar Cambio de Club                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⚠️ IMPORTANTE: Solo puedes cambiar 1 vez por temporada  │
│                                                         │
│ 📊 Estado Actual:                                       │
│ Club Actual: Los Campeones                              │
│ Rango Actual: 🥈 PLATA (24 puntos)                      │
│ Temporada: 2024-2025 (Sep 2024 - May 2025)             │
│ Cambios usados: 0/1 ✅                                  │
│                                                         │
│ 🎯 Nuevo Club:                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Buscar club: [Real Padel Club          ] 🔍        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Club seleccionado: Real Padel Club                      │
│ 💰 Membresía: 45€/mes                                   │
│ 📍 Ubicación: Madrid Centro                             │
│ ⭐ Rating: 4.7/5 (234 miembros)                         │
│ 🏆 Rango promedio: 🥈 PLATA                             │
│                                                         │
│ 📝 Justificación (requerida):                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Cambio de domicilio por trabajo. El nuevo club está │ │
│ │ más cerca de mi nueva residencia.                   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ⚠️ El cambio será efectivo el próximo mes               │
│ ⚠️ Mantienes tu rango 🥈 PLATA y puntos actuales       │
│                                                         │
│ [SOLICITAR CAMBIO]              [CANCELAR]              │
└─────────────────────────────────────────────────────────┘
```

---

## 🏛️ Comité PLATINO

### Composición y Responsabilidades
- **5 jugadores 💎 PLATINO** más antiguos y activos
- **1 representante** de administración PadelHUB
- **Rotación trimestral** para mantener diversidad
- **Reuniones mensuales** para evaluar casos especiales

### Funciones del Comité
1. **Evaluar invitaciones especiales** (jugadores profesionales, campeones)
2. **Revisar apelaciones** de degradación de PLATINO
3. **Proponer mejoras** al sistema de invitaciones
4. **Mantener estándares** de calidad del rango
5. **Gestionar casos de fairplay** en nivel élite

### Wireframe: Panel del Comité
```
┌─────────────────────────────────────────────────────────────┐
│ 🏛️ Panel de Comité PLATINO - Julio 2025                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 👥 Miembros Activos:                                        │
│ • Carlos Ruiz (💎) - Presidente - 18 meses PLATINO         │
│ • Ana García (💎) - Secretaria - 14 meses PLATINO          │
│ • Luis Martín (💎) - Vocal - 12 meses PLATINO              │
│ • María López (💎) - Vocal - 10 meses PLATINO              │
│ • Pedro Santos (💎) - Vocal - 8 meses PLATINO              │
│ • Admin PadelHUB - Supervisor técnico                      │
│                                                             │
│ 📋 Casos Pendientes (3):                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🎾 Juan Pérez - Campeón Nacional Sub-23                │ │
│ │ Estado: ORO (72 pts) - No cumple tiempo mínimo         │ │
│ │ Mérito especial: 1er puesto Nacional Júnior            │ │
│ │ Votos: ⬜ ⬜ ⬜ ⬜ ⬜ (Pendiente)                         │ │
│ │ [EVALUAR CASO]                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🏆 Sofia Ruiz - Ex-profesional WPT                     │ │
│ │ Estado: PLATA (55 pts) - Recién llegada a plataforma   │ │
│ │ Mérito especial: 3 años en circuito profesional        │ │
│ │ Votos: ✅ ✅ ✅ ⬜ ⬜ (3/5 - Pendiente)                  │ │
│ │ [CONTINUAR VOTACIÓN]                                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 📊 Estadísticas del Rango:                                 │
│ • Total PLATINO: 23 jugadores (4.2% de ORO)                │
│ • Invitaciones este mes: 5 automáticas, 2 comité           │
│ • Ratio aceptación: 85%                                    │
│ • Degradaciones: 1 (inactividad)                           │
│                                                             │
│ [NUEVA REUNIÓN]  [HISTORIAL]  [CONFIGURACIÓN]              │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 Beneficios Exclusivos PLATINO

### 🏆 Deportivos
- **Torneos Élite**: Solo PLATINO, premios 1000€+
- **Priority Booking**: Reservas preferentes en horarios premium
- **Pro Sessions**: Entrenamientos con jugadores profesionales
- **Masterclasses**: Acceso exclusivo a clínicas técnicas
- **Sparring VIP**: Partidos con invitados especiales

### 🎖️ Sociales y Reconocimiento  
- **Badge Distintivo**: 💎 PLATINO visible en perfil público
- **Eventos VIP**: Galas, presentaciones, networking exclusivo
- **Media Coverage**: Aparición en contenido promocional
- **Influencia Plataforma**: Voto en decisiones importantes
- **Mentoría**: Posibilidad de mentorizar jugadores ORO

### 💎 Económicos
- **Descuentos Premium**: 20% en todos los servicios
- **Comisiones**: Ingresos por referencias exitosas
- **Sponsoring**: Oportunidades de patrocinio personal
- **Productos Exclusivos**: Merchandising limitado PLATINO
- **Eventos Corporativos**: Participación remunerada

### Wireframe: Beneficios Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ 💎 Panel de Beneficios PLATINO                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🏆 Torneos Disponibles (Solo PLATINO):                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💎 Élite Nacional Madrid - 15-17 Agosto                 │ │
│ │ Premio: 2,500€ + Trophy + Ranking Nacional              │ │
│ │ Inscritos: 8/16 - Fecha límite: 5 Agosto               │ │
│ │ [INSCRIBIRSE - 100€]                                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ 🎯 Reservas Prioritarias:                                   │
│ • Pistas 1-2: Disponibles siempre                          │
│ • Horarios premium: 19:00-21:00 garantizados               │
│ • Cancelación flexible: Hasta 2h antes                     │
│                                                             │
│ 💰 Ahorros Este Mes:                                        │
│ • Descuentos aplicados: 45€                                │
│ • Comisiones ganadas: 120€ (3 referencias)                 │
│ • Ahorro total: 165€                                       │
│                                                             │
│ 🎖️ Próximos Eventos VIP:                                   │
│ • 28 Jul: Masterclass con Fernando Belasteguín             │
│ • 15 Ago: Gala Anual PadelHUB                              │
│ • 30 Ago: Torneo Corporativo Exclusivo                     │
│                                                             │
│ [GESTIONAR BENEFICIOS]  [INVITAR AMIGOS]  [PERFIL VIP]     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Métricas y KPIs del Sistema PLATINO

### Objetivos de Gamificación
- **Exclusividad**: Mantener PLATINO en 3-5% de jugadores ORO
- **Actividad**: 90%+ de jugadores PLATINO activos mensualmente
- **Retención**: <10% degradaciones por inactividad
- **Calidad**: Rating fairplay promedio >4.5
- **Engagement**: 80%+ participación en eventos exclusivos

### Wireframe: Analytics Dashboard (Admin)
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 Analytics PLATINO - Dashboard Administrativo            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 🎯 KPIs Principales:                                        │
│ ┌─────────────┬─────────────┬─────────────┬─────────────────┐ │
│ │ Total       │ Activos     │ Nuevos      │ Degradaciones   │ │
│ │ PLATINO     │ Este Mes    │ Este Mes    │ Este Mes        │ │
│ │             │             │             │                 │ │
│ │    23       │    21       │     3       │       1         │ │
│ │  ↑ +2       │  📈 91%     │  ↑ +50%     │  ↓ -50%        │ │
│ └─────────────┴─────────────┴─────────────┴─────────────────┘ │
│                                                             │
│ 📈 Tendencia Población (6 meses):                          │
│ Jul: ████████████████ 23 (+2)                              │
│ Jun: ████████████████ 21 (+1)                              │
│ May: ███████████████ 20 (+3)                               │
│ Abr: ██████████████ 17 (+2)                                │
│ Mar: █████████████ 15 (+1)                                 │
│ Feb: ████████████ 14 (=)                                   │
│                                                             │
│ 🔍 Canales de Invitación:                                  │
│ • Automática: 65% (15 invitaciones)                        │
│ • Comité: 25% (6 invitaciones)                             │
│ • Recomendación: 10% (2 invitaciones)                      │
│                                                             │
│ ⚠️ Alertas del Sistema:                                     │
│ • 2 jugadores próximos a degradación por inactividad       │
│ • 1 caso pendiente revisión Comité (>15 días)              │
│ • 5 candidatos automáticos detectados esta semana          │
│                                                             │
│ [GENERAR REPORTE]  [CONFIGURAR ALERTAS]  [EXPORTAR]        │
└─────────────────────────────────────────────────────────────┘
```

### Modelo de Datos Técnico

#### Tabla: user_platinum_tracking
```sql
CREATE TABLE user_platinum_tracking (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    invitation_type ENUM('automatic', 'committee', 'recommendation'),
    invited_by INT REFERENCES users(id), -- Para recomendaciones
    invitation_date TIMESTAMP,
    accepted_date TIMESTAMP,
    status ENUM('pending', 'accepted', 'declined', 'expired'),
    committee_votes JSON, -- Para invitaciones por comité
    eligibility_score INT, -- Puntuación automática
    special_merit TEXT, -- Méritos especiales
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Componentes Angular Necesarios
```typescript
// Componentes principales
- PlatinumInvitationComponent
- PlatinumProgressComponent
- PlatinumBenefitsComponent
- CommitteePanelComponent
- PlatinumAnalyticsComponent

// Servicios
- PlatinumInvitationService
- RankingCalculatorService
- CommitteeVotingService
- PlatinumMetricsService

// Guards y Validators
- PlatinumAccessGuard
- EligibilityValidator
- InvitationLimitValidator
```

---

## 🚀 Roadmap de Implementación

### Fase 1: Core System (Sprint 1-2)
- [ ] Migración base de datos a sistema de metales
- [ ] Componente base de ranking con badges metálicos
- [ ] Sistema de puntuación automático
- [ ] Interface básica de progreso

### Fase 2: PLATINO Foundation (Sprint 3-4)
- [ ] Sistema de detección automática de candidatos
- [ ] Panel de progreso hacia PLATINO
- [ ] Notificaciones de elegibilidad
- [ ] Base de datos de invitaciones

### Fase 3: Comité y Votación (Sprint 5-6)
- [ ] Panel del Comité PLATINO
- [ ] Sistema de votación
- [ ] Gestión de casos especiales
- [ ] Workflow de apelaciones

### Fase 4: Beneficios y Gamificación (Sprint 7-8)
- [ ] Panel de beneficios exclusivos
- [ ] Sistema de descuentos automáticos
- [ ] Torneos exclusivos PLATINO
- [ ] Eventos VIP y networking

### Fase 5: Analytics y Optimización (Sprint 9-10)
- [ ] Dashboard de métricas administrativas
- [ ] Sistema de alertas automáticas
- [ ] Reportes de engagement
- [ ] Optimización basada en datos

---

¡El sistema PLATINO está completamente documentado y listo para implementación! 🎯💎

---

## 💰 Modelo de Monetización

### Estructura de Pagos
```
🏢 CLUB (Obligatorio)
├── 200€/mes suscripción plataforma
├── Gestión ilimitada de miembros
├── Creación de torneos sin comisión
└── Tarifas libres para jugadores

👤 JUGADOR (Opcional)  
├── 8€/mes membresía premium
├── Funciones adicionales
├── Soporte prioritario
└── Estadísticas avanzadas
```

### Wireframe: Gestión de Suscripciones (Club)
```
┌─────────────────────────────────────────────────────────────┐
│ 💳 Gestión de Suscripciones - Club Los Campeones           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 📊 Resumen Financiero                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🏢 Suscripción Plataforma: 200€/mes                    │ │
│ │ Estado: ✅ Activa hasta 31/08/2025                      │ │
│ │ Próximo pago: 1 de Septiembre - 200€                   │ │
│ │                                                         │ │
│ │ 👥 Miembros Premium: 45 de 234 (8€/mes c/u)            │ │
│ │ Ingresos compartidos: ~180€/mes                         │ │
│ │                                                         │ │
│ │ 🏆 Torneos organizados: 12 (sin comisión)              │ │
│ │ 💰 Recaudación directa: 2,400€                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ⚙️ Configuración de Tarifas                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Membresía Club: [45] €/mes                              │ │
│ │ ┌─ Incluye: ──────────────────────────────────────────┐ │ │
│ │ │ ✅ Reserva de pistas (incluidas)                    │ │ │
│ │ │ ✅ Torneos internos (incluidos)                     │ │ │
│ │ │ ✅ Entrenamientos grupales                          │ │ │
│ │ │ ✅ Uso de vestuarios y duchas                       │ │ │
│ │ │ ✅ Descuentos en tienda club                        │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Opciones extras:                                        │ │
│ │ ☐ Clases particulares: +30€/mes                         │ │
│ │ ☐ Parking cubierto: +25€/mes                            │ │
│ │ ☐ Taquilla personal: +10€/mes                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [ACTUALIZAR TARIFAS]        [VER HISTÓRICO PAGOS]          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Seguridad y Control

### Medidas Anti-Fraude
- **Verificación Email/SMS**: Obligatoria para registro
- **Validación por Club**: Confirmación de pertenencia
- **Control de Duplicados**: Sistema de detección automática
- **Moderación**: Revisión de cambios de club justificados

### Wireframe: Verificación de Usuario
```
┌─────────────────────────────────────────────────────┐
│ 🔒 Verificación de Cuenta                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Para garantizar la integridad del sistema:          │
│                                                     │
│ ✅ 1. Email verificado                              │
│    ✉️ [abel@example.com] - Confirmado              │
│                                                     │
│ ⏳ 2. Teléfono móvil                                │
│    📱 [+34 666 123 456]                            │
│    Código: [____] [REENVIAR CÓDIGO]                │
│                                                     │
│ ⏳ 3. Validación por club                           │
│    🏟️ "Los Campeones"                              │
│    Estado: Pendiente aprobación administrador      │
│                                                     │
│ ⏸️ 4. Nivel inicial (tras validación)               │
│    🎯 Grupo seleccionado: C                         │
│    📊 Será validado por otros jugadores             │
│                                                     │
│ ⚠️ Tu cuenta estará limitada hasta completar        │
│    todas las verificaciones                         │
│                                                     │
│ [VERIFICAR TELÉFONO]                               │
└─────────────────────────────────────────────────────┘
```

---

## 📈 Métricas y Rankings

### Rankings Individuales
- **Por Grupo**: Clasificación dentro del mismo nivel
- **Por Club**: Contribución individual al club
- **Nacional**: Posición general en la plataforma
- **Histórico**: Evolución temporal de puntos

### Rankings de Clubes
- **Puntuación Total**: Suma de puntos de todos los miembros
- **Promedio por Jugador**: Media de rendimiento
- **Actividad**: Partidos y torneos organizados
- **Crecimiento**: Evolución mensual

### Wireframe: Dashboard de Rankings
```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 Rankings - Rango 🥈 PLATA                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [Individual] [Por Club] [Nacional] [Histórico]                  │
│                                                                 │
│ 🏆 TOP 10 - Rango 🥈 PLATA (Madrid)                            │
│ ┌─────┬──────────────────┬──────────┬─────────┬──────────────┐  │
│ │ POS │ JUGADOR          │ PUNTOS   │ CLUB    │ TENDENCIA    │  │
│ ├─────┼──────────────────┼──────────┼─────────┼──────────────┤  │
│ │  1  │ 👑 Carlos Ruiz   │   47 pts │ Madrid+ │ ⬆️⬆️⬆️ (+6)   │  │
│ │  2  │ 🥈 Ana García    │   44 pts │ Centro  │ ⬆️⬆️ (+3)     │  │
│ │  3  │ 🥉 Luis Martín   │   41 pts │ Sur     │ ➡️ (0)       │  │
│ │  4  │    María López   │   38 pts │ Norte   │ ⬆️ (+3)      │  │
│ │  5  │ 🔥 Pedro Santos  │   36 pts │ Este    │ ⬆️⬆️⬆️ (+9)   │  │
│ │ ... │                  │          │         │              │  │
│ │ 23  │ ⭐ TÚ (Abel J.)   │   24 pts │ Campeones│ ⬇️ (-3)      │  │
│ └─────┴──────────────────┴──────────┴─────────┴──────────────┘  │
│                                                                 │
│ 🎯 Para ascender a 🥇 ORO necesitas: 28 puntos (+4)            │
│ 📈 Progreso esta semana: 1 victoria, 1 derrota                 │
│                                                                 │
│ 🏟️ Ranking de tu Club "Los Campeones":                         │
│ Posición Nacional: #12 de 89 clubes                            │
│ Puntos totales: 1,247 pts (45 miembros activos)                │
│ Promedio: 27.7 pts/jugador                                     │
│ Distribución: 💎1 🥇12 🥈18 🥉10 🟫4                            │
│                                                                 │
│ [VER DETALLES COMPLETOS]    [COMPARTIR RANKING]                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Objetivos del Usuario

### Progresión Individual
1. **Acumular Puntos**: A través de victorias y participación
2. **Ascender de Rango**: De 🟫 COBRE → 🥉 BRONCE → 🥈 PLATA → 🥇 ORO → 💎 PLATINO
3. **Mejorar Ranking**: Posición dentro del rango y nacional
4. **Ganar Torneos**: Premios en metálico y reconocimiento

### Objetivos Colectivos
1. **Ranking del Club**: Llevar al club al primer puesto nacional
2. **Torneos Interclubes**: Representar al club con orgullo
3. **Comunidad**: Fomentar el ambiente competitivo y sano
4. **Crecimiento**: Atraer nuevos miembros al club

---

*Versión del Sistema: 2.0*  
*Actualizado: 24 Julio 2025*  
*Basado en: Conversación ChatGPT del 23/07/2025*
