# Wireframe: Monedero Virtual

## 📱 Vista Principal del Monedero

```
┌─────────────────────────────────────────┐
│ ← Monedero                         💳 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 💰 MI MONEDERO VIRTUAL              │ │
│ │                                     │ │
│ │    ┌─────────────────────────────┐   │ │
│ │    │                             │   │ │
│ │    │       💶 125.50€            │   │ │
│ │    │    Saldo Disponible         │   │ │
│ │    │                             │   │ │
│ │    │  📈 +25.00€ esta semana     │   │ │
│ │    └─────────────────────────────┘   │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌───────── Acciones Rápidas ──────────┐ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       💳 RECARGAR SALDO         │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       📤 ENVIAR DINERO          │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       🏆 INSCRIBIR TORNEO       │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │       📊 VER HISTORIAL          │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Transacciones Recientes ───────┐ │
│ │                                   │ │
│ │ 🏆 +50.00€  Torneo Interno        │ │
│ │    Premio 2º puesto               │ │
│ │    🕐 Hace 2 días                 │ │
│ │                                   │ │
│ │ ❌ -25.00€  Inscripción torneo     │ │
│ │    Copa Nacional Interclubes      │ │
│ │    🕐 Hace 5 días                 │ │
│ │                                   │ │
│ │ 💳 +100.00€ Recarga tarjeta       │ │
│ │    Visa ****1234                  │ │
│ │    🕐 Hace 1 semana               │ │
│ │                                   │ │
│ │ 🏆 +25.00€  Torneo Mensual        │ │
│ │    Participación cuartos          │ │
│ │    🕐 Hace 2 semanas              │ │
│ │                                   │ │
│ │ ❌ -15.00€  Clínica de técnica    │ │
│ │    Mejora tu revés                │ │
│ │    🕐 Hace 3 semanas              │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │        VER TODAS (47)           │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Estadísticas del Mes ──────────┐ │
│ │                                   │ │
│ │ 📊 Julio 2025                     │ │
│ │                                   │ │
│ │ 💸 Gastos: -65.00€                │ │
│ │ • Torneos: -40.00€                │ │
│ │ • Clínicas: -15.00€               │ │
│ │ • Otros: -10.00€                  │ │
│ │                                   │ │
│ │ 💰 Ingresos: +75.00€              │ │
│ │ • Premios: +75.00€                │ │
│ │ • Recargas: +0.00€                │ │
│ │                                   │ │
│ │ 📈 Balance: +10.00€               │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Próximos Gastos Programados ───┐ │
│ │                                   │ │
│ │ 🏆 Copa Nacional B - 25.00€       │ │
│ │    📅 Cobro automático: 25 Jul    │ │
│ │                                   │ │
│ │ 🎾 Clínica smash - 20.00€         │ │
│ │    📅 Inscrito para: 30 Jul       │ │
│ │                                   │ │
│ │ 💡 Sugerencia: Mantén al menos    │ │
│ │    50€ para gastos programados    │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 💳 Modal de Recarga de Saldo

```
┌─────────────────────────────────────────┐
│  ✕              Recargar Saldo          │
├─────────────────────────────────────────┤
│                                         │
│  💰 Saldo actual: 125.50€               │
│                                         │
│  🎯 Selecciona cantidad a recargar:     │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ ┌─────┬─────┬─────┬─────┬─────────┐ ││
│  │ │ 25€ │ 50€ │100€ │200€ │OTRO...  │ ││
│  │ └─────┴─────┴─────┴─────┴─────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  💡 Cantidad personalizada:             │
│  ┌─────────────────────────────────────┐│
│  │ € 50.00                             ││
│  └─────────────────────────────────────┘│
│                                         │
│  💳 Método de pago:                     │
│  ⚫ Tarjeta guardada: Visa ****1234     │
│  ○ Nueva tarjeta                        │
│  ○ PayPal                               │
│  ○ Bizum                                │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📄 Resumen de recarga:              ││
│  │                                     ││
│  │ Cantidad: 50.00€                    ││
│  │ Comisión: 0.00€                     ││
│  │ ──────────────────                  ││
│  │ Total: 50.00€                       ││
│  │                                     ││
│  │ Nuevo saldo: 175.50€                ││
│  └─────────────────────────────────────┘│
│                                         │
│  ☑️ Acepto términos de la transacción   │
│                                         │
│  🔒 Transacción segura SSL              │
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │      💳 RECARGAR        ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 📤 Modal de Envío de Dinero

```
┌─────────────────────────────────────────┐
│  ✕              Enviar Dinero           │
├─────────────────────────────────────────┤
│                                         │
│  💰 Saldo disponible: 125.50€           │
│                                         │
│  👤 Destinatario:                       │
│  ┌─────────────────────────────────────┐│
│  │ 🔍 Buscar por nombre o email...     ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─── Contactos Recientes ─────────────┐│
│  │                                     ││
│  │ ☑️ Ana Martín                       ││
│  │    ana.martin@email.com             ││
│  │    🏟️ Club Norte                    ││
│  │                                     ││
│  │ ○ Carlos López                      ││
│  │    carlos.lopez@email.com           ││
│  │    🏟️ Club Centro                   ││
│  │                                     ││
│  │ ○ María González                    ││
│  │    maria.gonzalez@email.com         ││
│  │    🏟️ Club Norte                    ││
│  │                                     ││
│  └─────────────────────────────────────┘│
│                                         │
│  💶 Cantidad a enviar:                  │
│  ┌─────────────────────────────────────┐│
│  │ € 25.00                             ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📝 Concepto (opcional):             ││
│  │ ┌─────────────────────────────────┐ ││
│  │ │ Pago partido del sábado         │ ││
│  │ └─────────────────────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  📊 Resumen:                            │
│  • Destinatario: Ana Martín             │
│  • Cantidad: 25.00€                     │
│  • Tu nuevo saldo: 100.50€              │
│                                         │
│  ⚠️ Esta transacción no se puede deshacer│
│                                         │
│  ┌─────────┐  ┌─────────────────────────┐│
│  │ CANCELAR│  │       📤 ENVIAR         ││
│  └─────────┘  └─────────────────────────┘│
│                                         │
└─────────────────────────────────────────┘
```

## 📊 Vista Historial Completo

```
┌─────────────────────────────────────────┐
│ ← Historial de Transacciones       📊 ⚙️│
└─────────────────────────────────────────┘
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 📈 HISTORIAL DE TRANSACCIONES       │ │
│ │ Balance actual: 125.50€             │ │
│ │ Total movimientos: 47               │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─── Filtros ─────────────────────────┐ │
│ │                                   │ │
│ │ 📅 Período: ▼ Últimos 3 meses     │ │
│ │ 💰 Tipo: ▼ Todos los movimientos  │ │
│ │ 🏆 Categoría: ▼ Todas              │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Julio 2025 ─────────────────────┐ │
│ │                                   │ │
│ │ 📅 20/07/2025                     │ │
│ │ 🏆 +50.00€ Premio torneo          │ │
│ │    Torneo Interno - 2º puesto     │ │
│ │    💰 Nuevo saldo: 125.50€        │ │
│ │                                   │ │
│ │ 📅 15/07/2025                     │ │
│ │ ❌ -25.00€ Inscripción            │ │
│ │    Copa Nacional Interclubes      │ │
│ │    💰 Nuevo saldo: 75.50€         │ │
│ │                                   │ │
│ │ 📅 10/07/2025                     │ │
│ │ 💳 +100.00€ Recarga               │ │
│ │    Visa ****1234                  │ │
│ │    💰 Nuevo saldo: 100.50€        │ │
│ │                                   │ │
│ │ 📅 05/07/2025                     │ │
│ │ 🏆 +25.00€ Premio participación   │ │
│ │    Torneo Mensual - Cuartos       │ │
│ │    💰 Nuevo saldo: 0.50€          │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Junio 2025 ─────────────────────┐ │
│ │                                   │ │
│ │ 📅 28/06/2025                     │ │
│ │ ❌ -15.00€ Clínica                │ │
│ │    Mejora tu revés                │ │
│ │    💰 Nuevo saldo: -24.50€        │ │
│ │                                   │ │
│ │ 📅 25/06/2025                     │ │
│ │ ❌ -10.00€ Material               │ │
│ │    Grip nuevo para pala           │ │
│ │    💰 Nuevo saldo: -9.50€         │ │
│ │                                   │ │
│ │ 📅 20/06/2025                     │ │
│ │ 📤 -20.00€ Enviado a Ana M.       │ │
│ │    Concepto: Pago cena equipo     │ │
│ │    💰 Nuevo saldo: 0.50€          │ │
│ │                                   │ │
│ │ 📅 15/06/2025                     │ │
│ │ 💳 +50.00€ Recarga                │ │
│ │    PayPal                         │ │
│ │    💰 Nuevo saldo: 20.50€         │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │        CARGAR MÁS (39)          │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌──── Estadísticas Anuales ──────────┐ │
│ │                                   │ │
│ │ 📊 2025 (hasta ahora)             │ │
│ │                                   │ │
│ │ 💰 Total ingresado: 425.00€       │ │
│ │ • Premios: 250.00€               │ │
│ │ • Recargas: 175.00€              │ │
│ │                                   │ │
│ │ 💸 Total gastado: -299.50€        │ │
│ │ • Torneos: -180.00€              │ │
│ │ • Clínicas: -85.00€              │ │
│ │ • Otros: -34.50€                 │ │
│ │                                   │ │
│ │ 📈 Balance neto: +125.50€         │ │
│ │ 🏆 Mejor mes: Abril (+85€)        │ │
│ │                                   │ │
│ │ ┌─────────────────────────────────┐ │ │
│ │ │      📊 VER GRÁFICO ANUAL       │ │ │
│ │ └─────────────────────────────────┘ │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

## 🎨 Elementos de Diseño

### Componentes Utilizados
- `WalletDashboardComponent`
- `TransactionHistoryComponent`
- `PaymentGatewayComponent`
- `RechargeComponent`
- `SendMoneyComponent`
- `StatsChartComponent`
- `PaymentMethodComponent`
- `TransactionFilterComponent`

## 📱 Responsive Design

### Mobile (≤576px)
```
┌─────────────────┐
│ ← Monedero  💳  │
├─────────────────┤
│ 💰 MI MONEDERO  │
│                 │
│   💶 125.50€    │
│  Disponible     │
│  📈 +25€ semana │
├─────────────────┤
│ 💳 RECARGAR     │
│ 📤 ENVIAR       │
│ 🏆 TORNEO       │
│ 📊 HISTORIAL    │
├─────────────────┤
│ Recientes       │
│ 🏆+50€ Torneo   │
│ ❌-25€ Copa     │
│ 💳+100€ Recarga │
│ VER TODAS (47)  │
├─────────────────┤
│ 📊 Julio 2025   │
│ 💸 Gastos: -65€ │
│ 💰 Ingresos:+75€│
│ 📈 Balance:+10€ │
├─────────────────┤
│ Próximos gastos │
│ 🏆 Copa B -25€  │
│ 🎾 Clínica -20€ │
└─────────────────┘
```

## 🔧 Funcionalidades Técnicas

### Seguridad Financiera
- **Encriptación**: Todas las transacciones cifradas
- **2FA**: Autenticación doble para grandes montos
- **Límites**: Máximos diarios/mensuales configurables
- **Auditoría**: Log completo de todas las operaciones

### Integración de Pagos
- **Stripe/PayPal**: Pasarelas de pago certificadas
- **Tarjetas**: Visa, Mastercard, American Express
- **Bizum**: Pagos instantáneos españoles
- **SEPA**: Transferencias bancarias europeas

### Gestión Automática
- **Cobros programados**: Inscripciones automáticas
- **Premios**: Distribución automática post-torneo
- **Notificaciones**: Alerts de saldo bajo, transacciones
- **Reportes**: Exportación para declaración fiscal
