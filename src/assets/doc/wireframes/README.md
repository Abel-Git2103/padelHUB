# 📋 Índice de Wireframes - PadelHUB

## 🎯 Descripción General

Este conjunto d| Rango | Nivel Equivalente | Perfil Jugador | Puntos Mínimos Torneo |
|-------|------------------|----------------|----------------------|
| **💎 PLATINO** | 6.0+ | Jugador élite | Invitación |
| **🥇 ORO** | 4.0 - 5.9 | Jugador avanzado | 70 pts |
| **🥈 PLATA** | 2.0 - 3.9 | Jugador intermedio | 50 pts |
| **🥉 BRONCE** | 1.0 - 1.9 | Jugador amateur | 30 pts |
| **🟫 COBRE** | 0 - 0.9 | Principiante | 15 pts |rames representa la arquitectura completa de la aplicación PadelHUB, una **alternativa a Playtomic** centrada en el progreso por méritos y competición por rangos de metales (💎 Platino, 🥇 Oro, 🥈 Plata, 🥉 Bronce, 🟫 Cobre) y un modelo de monetización sin comisiones.

## 📱 Wireframes Disponibles

### 🎯 Documentación del Sistema
- **[00-sistema-niveles.md](./00-sistema-niveles.md)** - Sistema completo de rangos y competición (💎🥇🥈🥉🟫)

### 🔐 Autenticación y Onboarding
- **[01-login.md](./01-login.md)** - Pantalla de inicio de sesión
- **[02-registro.md](./02-registro.md)** - Registro de nuevos usuarios
- **[03-forgot-password.md](./03-forgot-password.md)** - Recuperación de contraseña

### 🏠 Core de la Aplicación
- **[04-dashboard.md](./04-dashboard.md)** - Dashboard principal (Jugador/Club/Admin)
- **[05-player-profile.md](./05-player-profile.md)** - Perfil completo del jugador
- **[06-edit-profile.md](./06-edit-profile.md)** - Edición de perfil de usuario

### 💬 Comunicación
- **[07-chat.md](./07-chat.md)** - Sistema de mensajería y chat grupal
- **[08-rankings.md](./08-rankings.md)** - Rankings y clasificaciones

### 🎾 Gestión Deportiva
- **[09-matches.md](./09-matches.md)** - Gestión de partidos y reservas
- **[10-tournaments.md](./10-tournaments.md)** - Sistema completo de torneos
- **[11-wallet.md](./11-wallet.md)** - Monedero virtual y pagos

## 🎨 Sistema de Diseño

### Paleta de Colores Principal
```scss
// Colores del tema pádel
$primary-green: #2E7D32;      // Verde pádel
$primary-blue: #1976D2;       // Azul corporativo  
$secondary-orange: #FF8F00;   // Naranja de acento
$background-light: #F5F5F5;   // Fondo claro
$text-primary: #212121;       // Texto principal
$success: #4CAF50;            // Estados de éxito
$error: #F44336;              // Estados de error
```

### Breakpoints Responsivos
```scss
$breakpoint-sm: 576px;    // Móviles
$breakpoint-md: 768px;    // Tablets
$breakpoint-lg: 992px;    // Desktop pequeño
$breakpoint-xl: 1200px;   // Desktop grande
```

## 🔄 Flujo de Usuario Principal

### 1. 🚪 Entrada del Usuario
```
Registro → Selección de club → Auto-valoración rango → Dashboard
  ↓
Login → Dashboard → Exploración por rango de metal
```

### 2. 🎾 Flujo de Partidos
```
Dashboard → Crear Partido (Igualado/No Igualado) → Validación de rango → Jugar → Registrar resultado → Actualizar puntos
```

### 3. 🏆 Flujo de Torneos
```
Lista Torneos → Verificar puntos mínimos → Inscripción → Pago con monedero → Competir → Ascenso potencial
```

### 4. 💰 Flujo Monetario Club
```
Suscripción club 200€/mes → Gestión membresías jugadores → Tarifas internas → Sin comisiones torneos
```

### 5. 📈 Flujo de Ascenso
```
Acumular puntos → Alcanzar mínimo rango → Participar torneos → Victoria/Ascenso → Nuevo rango disponible
```

## 📊 Sistema de Rangos y Competición

### 🏷️ Rangos de Metales
| Rango | Nivel Equivalente | Perfil Jugador | Puntos Mínimos Torneo |
|-------|------------------|----------------|----------------------|
| **💎 PLATINO** | 6.0 - 7.0 | Jugador élite | Solo invitación |
| **🥇 ORO** | 4.0 - 5.9 | Jugador avanzado | 55 pts |
| **🥈 PLATA** | 2.0 - 3.9 | Jugador intermedio | 35 pts |
| **🥉 BRONCE** | 1.0 - 1.9 | Jugador amateur | 20 pts |
| **🟫 COBRE** | 0 - 0.9 | Principiante | 10 pts |

### ⚔️ Tipos de Partido
- **🎯 Igualado**: Solo jugadores del mismo rango - **PUNTÚA**
- **🔀 No Igualado**: Mixto entre rangos - Puntúa solo si todos son del rango objetivo o superior
- **🤝 Amistoso**: Si hay jugadores de rango inferior - **NO PUNTÚA**

### 📈 Sistema de Puntuación
- **Victoria**: +3 puntos
- **Empate**: +1 punto  
- **Derrota**: -3 puntos
- **Inicio**: Mínimo del grupo + 6 puntos de margen
- **Temporada**: Septiembre a Mayo (cambio de club permitido 1 vez)

### 🏆 Tipos de Torneo
- **🏠 Internos**: Solo jugadores del club
- **🌐 Interclubes**: Jugadores de múltiples clubes
- **⚡ Mixtos**: Equipos con jugadores de diferentes clubes

## 👥 Tipos de Usuario y Permisos

### 👤 Jugador Estándar
- ✅ Crear partidos igualados/no igualados según su grupo
- ✅ Participar en torneos (si cumple puntos mínimos)
- ✅ Ver rankings individuales y de clubes
- ✅ Chat con otros jugadores
- ✅ Gestión de monedero y membresía (8€/mes opcional)
- ✅ Cambio de club 1 vez por temporada (Sep-May)

### 🏟️ Administrador de Club
- ✅ Todas las funciones de jugador
- ✅ Gestión de miembros y tarifas del club
- ✅ Crear torneos internos e interclubes
- ✅ Suscripción club obligatoria (200€/mes)
- ✅ Gestión de pistas y reservas
- ✅ Sin comisiones por torneos o clínicas

### 🛡️ Super Administrador
- ✅ Todas las funciones anteriores
- ✅ Gestión global de niveles y ascensos
- ✅ Moderación y verificación de usuarios
- ✅ Control de cambios de club justificados
- ✅ Rankings nacionales y estadísticas globales

## 💰 Modelo de Monetización

### 🏢 Ingresos de la Plataforma
- **Cuota Club**: 200€/mes por club (obligatoria)
- **Membresía Jugador**: 8€/mes por jugador (opcional)
- **Sin Comisiones**: 0% en torneos, clínicas o eventos
- **Libertad Tarifaria**: Clubes fijan sus propias membresías

### 💳 Gestión de Pagos
- **Monedero Virtual**: Para torneos y servicios
- **Tarifa Plana Club**: Cubre reservas, torneos, entrenamientos
- **Premios**: Saldo monedero + posibilidad de ascenso

## 🔧 Componentes Reutilizables

## 🔧 Componentes Reutilizables

### Componentes Base (45+ identificados)
- **Formularios**: InputField, Button, Select, Checkbox, RadioGroup
- **Navegación**: Header, Sidebar, BottomNav, Breadcrumb, RankFilter
- **Contenido**: Card, Modal, Tabs, Pagination, LoadingSpinner
- **Deportivos**: Scoreboard, Bracket, PlayerCard, MatchHistory, RankBadge
- **Financieros**: WalletCard, PaymentForm, TransactionList, SubscriptionCard
- **Rango/Metal**: MetalIndicator, PointsCounter, RankSelector, ProgressBar
- **Club**: ClubCard, MembershipCard, TariffSettings, ClubRanking
- **Torneos**: TournamentCard, RegistrationForm, BracketView, PrizePool

### Componentes Específicos del Sistema
- **RankValidator**: Valida elegibilidad para partidos/torneos
- **PointsCalculator**: Calcula puntos según tipo de partido y resultado  
- **ClubSwitcher**: Gestiona cambio de club (1 vez por temporada)
- **TournamentEligibility**: Verifica puntos mínimos para acceso
- **SubscriptionManager**: Gestiona pagos club (200€) y jugador (8€)
- **RankingBoard**: Rankings individuales y por clubes
- **MatchTypeSelector**: Diferencia entre igualado/no igualado/amistoso

### Layouts Principales
- **AuthLayout**: Para login, registro, recuperación
- **MainLayout**: Dashboard y funciones principales
- **ChatLayout**: Sistema de mensajería
- **TournamentLayout**: Gestión de competiciones

## 📱 Consideraciones Mobile-First

### Adaptaciones Principales
- **Navegación**: Bottom navigation en móvil
- **Formularios**: Campos más grandes, mejor UX táctil
- **Tablas**: Conversion a cards apilables
- **Chat**: Interfaz optimizada para mensajería móvil
- **Torneos**: Brackets adaptativos según screen size

### Gestos y Interacciones
- **Swipe**: Navegación entre pestañas
- **Pull-to-refresh**: Actualización de listas
- **Long press**: Menús contextuales
- **Pinch zoom**: En brackets y gráficos

## 🎯 Métricas de UX/UI

### Objetivos de Usabilidad
- **Tiempo de carga**: <2 segundos
- **Clicks para acción**: Máximo 3 clicks para funciones principales
- **Tiempo de registro**: <3 minutos
- **Tasa de adopción**: >80% usuarios activos mensuales

### Accesibilidad
- **WCAG 2.1**: Cumplimiento nivel AA
- **Contraste**: Mínimo 4.5:1 para texto
- **Navegación por teclado**: Completamente funcional
- **Screen readers**: Compatible con lectores de pantalla

## 🔄 Estados y Feedback

### Estados de Loading
- **Skeleton screens**: Para cargas de contenido
- **Spinners**: Para acciones específicas
- **Progress bars**: Para procesos largos
- **Lazy loading**: Para listas e imágenes

### Feedback de Usuario
- **Toasts**: Notificaciones no intrusivas
- **Modals**: Para confirmaciones importantes
- **Inline validation**: Feedback inmediato en formularios
- **Success animations**: Para completar acciones

## 🚀 Próximos Pasos de Implementación

## 🚀 Próximos Pasos de Implementación

### Fase 1: Core System (Meses 1-2) - MVP
1. **Sistema de autenticación** y verificación anti-duplicados
2. **Gestión de grupos** (A-E) y auto-valoración inicial
3. **Asociación a club** y selección inicial
4. **Sistema de puntos** básico (Victoria +3, Empate +1, Derrota -3)
5. **Partidos igualados** entre jugadores del mismo grupo

### Fase 2: Competición Avanzada (Meses 3-4)
6. **Partidos no igualados** con validación de grupos
7. **Sistema de puntos mínimos** para acceso a torneos
8. **Torneos internos** por club
9. **Rankings individuales** y por club básicos
10. **Monedero virtual** y gestión de premios

### Fase 3: Monetización y Gestión (Meses 5-6)
11. **Suscripciones** (club 200€/mes, jugador 8€/mes)
12. **Gestión de membresías** y tarifas por club
13. **Torneos interclubes** y mixtos
14. **Sistema de ascenso** y cambio de grupo
15. **Control de cambio de club** (1 vez por temporada)

### Fase 4: Optimización y Escalado (Meses 7-8)
16. **Verificación avanzada** de usuarios
17. **Analíticas** de rendimiento y clubes
18. **Sistema de invitaciones** para grupo A
19. **Gestión de temporadas** (Sep-May)
20. **Rankings nacionales** y competiciones especiales

## 📄 Documentación Adicional

- **[../WIREFRAMES_ANALYSIS.md](../WIREFRAMES_ANALYSIS.md)** - Análisis completo de requerimientos
- **[../DEFINICIÓN DE REQUERIMIENTOS DE SOFTWARE.txt](../DEFINICIÓN%20DE%20REQUERIMIENTOS%20DE%20SOFTWARE.txt)** - Especificaciones técnicas detalladas
- **[../ACTUALIZACIONES.md](../ACTUALIZACIONES.md)** - Resumen de cambios y próximos pasos

## 🤝 Contribución

Para modificar o añadir wireframes:
1. Mantén la consistencia visual con el sistema de diseño establecido
2. Incluye todas las secciones: Layout, Componentes, Responsive, Funcionalidades
3. Actualiza este índice con los nuevos wireframes
4. Considera el impacto en el flujo de usuario general

---

*Última actualización: Julio 2025*  
*Versión: 1.0*  
*Estado: Completado para implementación*
