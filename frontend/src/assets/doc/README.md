# 📚 Documentación PadelHUB

## 🎯 Descripción del│    RANGO    │ NIVEL EQUIVALENTE│ PERFIL JUGADOR      │ PUNTOS MIN. TORNEO  │
├─────────────┼──────────────────┼─────────────────────┼─────────────────────┤
│ 💎 PLATINO  │    6.0+          │ Jugador élite       │     Invitación      │
│ 🥇 ORO      │    4.0 - 5.9     │ Jugador avanzado    │      70 pts         │
│ 🥈 PLATA    │    2.0 - 3.9     │ Jugador intermedio  │      50 pts         │
│ 🥉 BRONCE   │    1.0 - 1.9     │ Jugador amateur     │      30 pts         │
│ 🟫 COBRE    │    0 - 0.9       │ Principiante        │      15 pts         │to

**PadelHUB** es una plataforma integral de gestión de pádel diseñada como **alternativa moderna a Playtomic**, enfocada en un sistema de competición por méritos basado en rangos de metales (💎 Platino, 🥇 Oro, 🥈 Plata, 🥉 Bronce, 🟫 Cobre) y un modelo de monetización sin comisiones.

---

## 📋 Índice de Documentación

### 📊 **Documentación Técnica Principal**

#### 🔍 Análisis y Especificaciones
- **[ESTRUCTURA.md](./ESTRUCTURA.md)** - Estructura de documentación y organización de archivos
- **[WIREFRAMES_ANALYSIS.md](./WIREFRAMES_ANALYSIS.md)** - Análisis completo de componentes y arquitectura
- **[DEFINICIÓN DE REQUERIMIENTOS DE SOFTWARE.txt](./DEFINICIÓN%20DE%20REQUERIMIENTOS%20DE%20SOFTWARE.txt)** - Especificaciones técnicas detalladas del sistema
- **[ACTUALIZACIONES.md](./ACTUALIZACIONES.md)** - Resumen de cambios y próximos pasos de desarrollo
- **[UMBRALES-ASCENSO.md](./UMBRALES-ASCENSO.md)** - Criterios técnicos para ascenso automático entre rangos
- **[SISTEMA-REPORTES.md](./SISTEMA-REPORTES.md)** - Sistema de gestión de conducta antideportiva independiente

### 🎨 **Wireframes y Diseño**

#### 📱 Diseño de Interfaz
- **[wireframes/README.md](./wireframes/README.md)** - Índice completo de wireframes y sistema de diseño
- **[wireframes/00-sistema-niveles.md](./wireframes/00-sistema-niveles.md)** - Sistema de rangos y competición (💎🥇🥈🥉🟫)

#### 🔐 Autenticación y Onboarding
- **[wireframes/01-login.md](./wireframes/01-login.md)** - Pantalla de inicio de sesión
- **[wireframes/02-registro.md](./wireframes/02-registro.md)** - Registro con selección de grupo
- **[wireframes/03-forgot-password.md](./wireframes/03-forgot-password.md)** - Recuperación de contraseña

#### 🏠 Core de la Aplicación
- **[wireframes/04-dashboard.md](./wireframes/04-dashboard.md)** - Dashboard con sistema de puntos
- **[wireframes/05-player-profile.md](./wireframes/05-player-profile.md)** - Perfil completo del jugador
- **[wireframes/06-edit-profile.md](./wireframes/06-edit-profile.md)** - Edición de perfil

#### 💬 Comunicación y Social
- **[wireframes/07-chat.md](./wireframes/07-chat.md)** - Sistema de mensajería
- **[wireframes/08-rankings.md](./wireframes/08-rankings.md)** - Rankings por grupo y club

#### 🎾 Gestión Deportiva
- **[wireframes/09-matches.md](./wireframes/09-matches.md)** - Gestión de partidos (Igualado/No Igualado/Amistoso)
- **[wireframes/10-tournaments.md](./wireframes/10-tournaments.md)** - Sistema de torneos con puntos mínimos
- **[wireframes/11-wallet.md](./wireframes/11-wallet.md)** - Monedero virtual y pagos

---

## 🎯 **Características Principales del Sistema**

### 🏷️ Sistema de Niveles
```
┌─────────────┬──────────────────┬─────────────────────┬─────────────────────┐
│    RANGO    │ NIVEL EQUIVALENTE│ PERFIL JUGADOR      │ PUNTOS MIN. TORNEO  │
├─────────────┼──────────────────┼─────────────────────┼─────────────────────┤
│ 💎 PLATINO  │    6.0 - 7.0     │ Jugador élite       │ Solo invitación     │
│ 🥇 ORO      │    4.0 - 5.9     │ Jugador avanzado    │      55 pts         │
│ 🥈 PLATA    │    2.0 - 3.9     │ Jugador intermedio  │      35 pts         │
│ 🥉 BRONCE   │    1.0 - 1.9     │ Jugador amateur     │      20 pts         │
│ 🟫 COBRE    │    0 - 0.9       │ Principiante        │      10 pts         │
└─────────────┴──────────────────┴─────────────────────┴─────────────────────┘
```

### ⚔️ Tipos de Competición
- **🎯 Igualado**: Solo jugadores del mismo grupo → **SIEMPRE PUNTÚA**
- **🔀 No Igualado**: Mixto → Puntúa si todos son del grupo objetivo o superior
- **🤝 Amistoso**: Con jugadores de grupo inferior → **NO PUNTÚA**

### 📈 Sistema de Puntuación
- **Victoria**: +3 puntos individuales + puntos al club
- **Empate**: +1 punto individual + puntos al club
- **Derrota**: -3 puntos individuales (club no pierde puntos)

### 💰 Modelo de Monetización
- **🏢 Club**: 200€/mes (obligatorio) - Sin comisiones en torneos
- **👤 Jugador**: 8€/mes (opcional) - Funciones premium
- **🆓 Clubes**: Libertad total para fijar tarifas internas

---

## 🚀 **Roadmap de Desarrollo**

### **Fase 1: MVP (Meses 1-2)**
1. ✅ Sistema de autenticación con rangos de metales
2. ✅ Dashboard con indicadores de puntos
3. ✅ Gestión básica de partidos igualados
4. ✅ Sistema de puntuación (+3/-3/+1)

### **Fase 2: Competición Avanzada (Meses 3-4)**
5. ⏳ Partidos no igualados con validación
6. ⏳ Torneos con puntos mínimos de acceso
7. ⏳ Rankings individuales y por club
8. ⏳ Monedero virtual básico

### **Fase 3: Monetización y Gestión (Meses 5-6)**
9. ⏳ Sistema de suscripciones (200€/8€)
10. ⏳ Gestión de cambio de club (1 vez/temporada)
11. ⏳ Torneos interclubes y mixtos
12. ⏳ Sistema de ascenso automático

### **Fase 4: Optimización (Meses 7-8)**
13. ⏳ Verificación anti-duplicados avanzada
14. ⏳ Analíticas de rendimiento
15. ⏳ Sistema de invitaciones Grupo A
16. ⏳ Rankings nacionales

---

## 🧩 **Arquitectura Técnica**

### **Stack Tecnológico**
- **Frontend**: Angular 20 + SCSS
- **Backend**: Node.js/Express (recomendado)
- **Base de Datos**: PostgreSQL/MySQL
- **Autenticación**: JWT + OAuth2
- **Pagos**: Stripe/PayPal
- **Real-time**: WebSockets (chat, notificaciones)

### **Componentes Principales**
```typescript
// Componentes del Sistema de Niveles
GroupValidator         // Validación de elegibilidad
PointsCalculator      // Cálculo de puntos
TournamentEligibility // Verificación puntos mínimos
ClubSwitcher         // Gestión cambio de club
SubscriptionManager  // Pagos 200€/8€

// Componentes de UI
RankBadge            // Indicador visual de metales (💎🥇🥈🥉🟫)
PointsCounter        // Contador con progreso
RankingBoard         // Rankings múltiples
MatchTypeSelector    // Igualado/No Igualado/Amistoso
ProgressBar          // Barra de progreso hacia siguiente rango
```

---

## 📊 **Métricas y KPIs**

### **Objetivos de Producto**
- **Tiempo de adopción**: <7 días desde registro a primer partido
- **Retención mensual**: >85% usuarios activos
- **Satisfacción clubes**: >90% renovación suscripción
- **Engagement**: >5 partidos/mes por usuario activo

### **Métricas Técnicas**
- **Tiempo de carga**: <2 segundos
- **Disponibilidad**: 99.9% uptime
- **Escalabilidad**: Soportar 10K+ usuarios concurrentes
- **Seguridad**: Cumplimiento GDPR + verificación anti-fraude

---

## 📝 **Cómo Contribuir**

### **Para Desarrolladores**
1. Revisar **WIREFRAMES_ANALYSIS.md** para entender la arquitectura
2. Consultar **wireframes/** para implementación de UI
3. Seguir las fases de desarrollo en **ACTUALIZACIONES.md**

### **Para Diseñadores**
1. Mantener consistencia con el sistema de diseño en **wireframes/README.md**
2. Usar la paleta de colores y breakpoints definidos
3. Considerar el flujo de usuarios por rangos de metales (💎🥇🥈🥉🟫)

### **Para Product Managers**
1. Validar funcionalidades contra **sistema-niveles.md** y **UMBRALES-ASCENSO.md**
2. Verificar cumplimiento del modelo de monetización
3. Asegurar experiencia coherente entre tipos de usuario

---

## 📞 **Contacto y Soporte**

- **Repositorio**: [Abel-Git2103/padelHUB](https://github.com/Abel-Git2103/padelHUB)
- **Documentación**: `/src/assets/doc/`
- **Issues**: GitHub Issues para bugs y solicitudes
- **Versión Actual**: 1.0 (Documentación completa)

---

*Última actualización: 24 Julio 2025*  
*Estado: ✅ Documentación completa - Listo para desarrollo*  
*Archivos totales: 17 documentos*
