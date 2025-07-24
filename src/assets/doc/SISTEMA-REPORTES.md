# 🚨 Sistema de Reportes de Conducta Antideportiva - PadelHUB

## 🎯 Principios Fundamentales

El sistema de reportes de PadelHUB está diseñado como un mecanismo **completamente independiente** del sistema de ascensos, permitiendo al club gestionar la deportividad con total flexibilidad y criterio humano.

### ⚖️ Separación Absoluta
- **Sistema de Ascenso**: Automático, basado solo en puntos + win rate
- **Sistema Disciplinario**: Manual, gestionado por el club caso por caso
- **Principio**: El rendimiento deportivo nunca se penaliza por incidentes disciplinarios

---

## 📋 Proceso de Reporte

### 🔍 ¿Cuándo Reportar?

#### Conductas Reportables
- **Insultos o faltas de respeto**: Comentarios ofensivos hacia otros jugadores
- **Trampas o juego desleal**: Marcador falso, reglas inventadas
- **Agresividad física o verbal**: Comportamiento intimidatorio
- **Disputa maliciosa de puntuación**: Discutir resultados claros
- **Abandono injustificado**: Dejar partido sin causa válida
- **Otros**: Cualquier comportamiento que afecte el ambiente deportivo

#### Lo que NO es Reportable
- **Nivel de juego bajo**: No es una falta de deportividad
- **Errores de puntuación honestos**: Parte normal del juego
- **Discusiones técnicas sobre reglas**: Debate legítimo
- **Celebraciones normales**: Expresión de alegría por victoria

### 📝 Wireframe: Formulario de Reporte

```
┌─────────────────────────────────────────────────────────┐
│ 🚨 Reportar Conducta Antideportiva                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📍 Información del Partido:                             │
│ • Fecha: [27/07/2025] • Hora: [18:00h]                 │
│ • Rivales: Juan Pérez vs Miguel Ángel                  │
│ • Resultado: 6-4, 6-2 (Miguel perdió)                  │
│                                                         │
│ 🎯 Tipo de Incidente:                                   │
│ [x] Insultos o faltas de respeto                       │
│ [ ] Trampas o juego desleal                            │
│ [ ] Agresividad física o verbal                        │
│ [ ] Disputa de puntuación maliciosa                    │
│ [ ] Abandono injustificado del partido                 │
│ [ ] Otro: ________________________                     │
│                                                         │
│ 📝 Descripción detallada del incidente:                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Durante el segundo set, Miguel comenzó a insultar   │ │
│ │ mi nivel de juego, diciendo que "no sabía jugar    │ │
│ │ al pádel" y que "era un principiante patético".    │ │
│ │ Al final del partido siguió con comentarios        │ │
│ │ despectivos sobre mi técnica.                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 👁️ ¿Hubo testigos del incidente?                        │
│ [x] Sí, otros jugadores  [ ] Sí, personal del club     │
│ [ ] No hubo testigos                                   │
│ Especificar: Laura Gómez y Diego Silva (pista 2)      │
│                                                         │
│ ⚠️ IMPORTANTE: Este reporte será enviado al comité      │
│ disciplinario del club para investigación. Se          │
│ contactará con todas las partes involucradas.          │
│                                                         │
│ [ENVIAR REPORTE]        [CANCELAR]                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🛡️ Gestión por el Club

### 📊 Panel de Administración del Club

```
┌─────────────────────────────────────────────────────────┐
│ 🛡️ Gestión de Incidentes - Club Los Campeones          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📋 Reportes Pendientes (3) | 📈 Estadísticas Mes       │
│                                                         │
│ 🚨 REPORTE #247 - ALTA PRIORIDAD                        │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 👤 Reportado: Miguel Ángel (🥈 PLATA - 51 pts)      │ │
│ │ 📝 Reportado por: Juan Pérez                        │ │
│ │ 📅 Fecha incidente: 27 Jul 2025 - 18:00h            │ │
│ │ 🎯 Tipo: Insultos y faltas de respeto               │ │
│ │ 🎾 Partido: Juan 6-4, 6-2 Miguel                    │ │
│ │                                                     │ │
│ │ 📖 Resumen: Comentarios despectivos sobre nivel    │ │
│ │ de juego del oponente durante y después del        │ │
│ │ partido. Testigos confirman comportamiento.        │ │
│ │                                                     │ │
│ │ 📊 Puntos en disputa: Miguel perdió 3 pts          │ │
│ │ ⚠️ Estado puntos: NO afecta rango automáticamente   │ │
│ │                                                     │ │
│ │ [INVESTIGAR] [CONTACTAR MIGUEL] [VER HISTORIAL]    │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 📊 Historial Disciplinario - Miguel Ángel:             │
│ • Incidentes previos: 1 (advertencia verbal - Mar 25)  │
│ • Tiempo en club: 8 meses                              │
│ • Actividad: Regular (15 partidos/mes)                 │
│ • Rango actual: 🥈 PLATA estable                       │
│                                                         │
│ 🔧 Medidas Disponibles:                                 │
│ 🟡 LEVES                                                │
│ [ ] Advertencia verbal (conversación)                  │
│ [ ] Advertencia escrita (registro formal)              │
│ [ ] Reunión educativa sobre fair play                  │
│                                                         │
│ 🟠 MODERADAS                                            │
│ [ ] Suspensión temporal (1-7 días)                     │
│ [ ] Exclusión próximo torneo                           │
│ [ ] Servicio comunitario en club                       │
│                                                         │
│ 🔴 GRAVES                                               │
│ [ ] Anular resultado del partido                       │
│ [ ] Suspensión prolongada (1-4 semanas)                │
│ [ ] Expulsión definitiva del club                      │
│                                                         │
│ [APLICAR SANCIÓN]  [ARCHIVAR SIN ACCIÓN]  [MÁS INFO]   │
└─────────────────────────────────────────────────────────┘
```

### 🎯 Tipos de Sanciones

#### 🟡 Sanciones Leves (Primera vez / Incidentes menores)
- **Advertencia verbal**: Conversación educativa con el jugador
- **Advertencia escrita**: Registro formal en historial disciplinario
- **Reunión educativa**: Sesión sobre fair play y valores del club
- **Impacto**: Solo registro, no afecta actividad deportiva

#### 🟠 Sanciones Moderadas (Reincidencia / Incidentes serios)
- **Suspensión temporal**: 1-7 días sin poder jugar partidos
- **Exclusión de torneo**: No puede inscribirse en próximo torneo del club
- **Servicio comunitario**: Colaborar en organización de eventos
- **Impacto**: Limitación temporal de actividad, pero mantiene rango

#### 🔴 Sanciones Graves (Casos extremos / Múltiple reincidencia)
- **Anulación de resultado**: El partido se da por perdido automáticamente
- **Suspensión prolongada**: 1-4 semanas completamente sin actividad
- **Expulsión definitiva**: Salida permanente del club
- **Impacto**: Consecuencias significativas, posible pérdida de puntos por inactividad

### 📋 Wireframe: Notificación de Sanción

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ NOTIFICACIÓN OFICIAL DEL CLUB                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Estimado Miguel Ángel,                                  │
│                                                         │
│ Tras investigar el reporte #247 del 27 de Julio sobre  │
│ tu comportamiento durante el partido contra Juan        │
│ Pérez, hemos determinado la siguiente medida:           │
│                                                         │
│ 📋 SANCIÓN APLICADA:                                    │
│ • Tipo: Advertencia escrita                            │
│ • Motivo: Comentarios irrespetuosos hacia rival        │
│ • Vigencia: Registro permanente en historial           │
│ • Duración: Inmediata                                  │
│                                                         │
│ 🎾 DECISIÓN SOBRE EL RESULTADO DEL PARTIDO:             │
│ • El resultado se mantiene válido: Juan 6-4, 6-2       │
│ • No hay cambios en la puntuación de ningún jugador    │
│ • Tu rango actual se mantiene: 🥈 PLATA (51 pts)       │
│                                                         │
│ 💡 IMPACTO EN TU PROGRESIÓN:                            │
│ • ✅ Puedes seguir jugando partidos normalmente         │
│ • ✅ Puedes seguir ascendiendo de rango                 │
│ • ✅ Puedes participar en torneos                       │
│ • ⚠️ Queda registrado para futuras evaluaciones         │
│                                                         │
│ 🤝 COMPROMISO REQUERIDO:                                │
│ • Mantener respeto hacia todos los jugadores           │
│ • Evitar comentarios sobre el nivel de otros           │
│ • Centrarse en el juego y la mejora personal           │
│                                                         │
│ ⚠️ ADVERTENCIA IMPORTANTE:                               │
│ Un segundo incidente similar resultará en suspensión   │
│ temporal (3-5 días). Valoramos el ambiente deportivo   │
│ y el respeto mutuo en nuestro club.                    │
│                                                         │
│ Atentamente,                                           │
│ Comité Disciplinario - Club Los Campeones             │
│                                                         │
│ [ACEPTAR MEDIDA]     [SOLICITAR REUNIÓN]               │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementación Técnica

### 📊 Base de Datos

#### Tabla: conduct_reports
```sql
CREATE TABLE conduct_reports (
    id SERIAL PRIMARY KEY,
    reported_user_id INT REFERENCES users(id),
    reporter_user_id INT REFERENCES users(id),
    match_id INT REFERENCES matches(id),
    club_id INT REFERENCES clubs(id),
    incident_type ENUM('insults', 'cheating', 'aggression', 'score_dispute', 'abandonment', 'other'),
    description TEXT NOT NULL,
    has_witnesses BOOLEAN DEFAULT FALSE,
    witness_details TEXT,
    status ENUM('pending', 'investigating', 'resolved', 'dismissed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP NULL
);
```

#### Tabla: club_sanctions
```sql
CREATE TABLE club_sanctions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    club_id INT REFERENCES clubs(id),
    report_id INT REFERENCES conduct_reports(id),
    sanction_type ENUM('verbal_warning', 'written_warning', 'educational_meeting', 
                      'temporary_suspension', 'tournament_exclusion', 'community_service',
                      'match_annulment', 'prolonged_suspension', 'club_expulsion'),
    severity ENUM('light', 'moderate', 'severe'),
    description TEXT,
    duration_days INT DEFAULT 0,
    applied_by INT REFERENCES club_admins(id),
    active BOOLEAN DEFAULT TRUE,
    applied_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NULL
);
```

#### Tabla: disciplinary_history
```sql
CREATE TABLE disciplinary_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    club_id INT REFERENCES clubs(id),
    incident_date DATE,
    incident_type VARCHAR(100),
    sanction_applied VARCHAR(100),
    severity ENUM('light', 'moderate', 'severe'),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 🛠️ Servicios Angular

#### ConductReportService
```typescript
@Injectable({
  providedIn: 'root'
})
export class ConductReportService {
  
  // Enviar nuevo reporte
  submitReport(reportData: {
    reportedUserId: number;
    matchId: number;
    incidentType: string;
    description: string;
    hasWitnesses: boolean;
    witnessDetails?: string;
  }): Promise<void> {
    // Implementación de envío de reporte
  }
  
  // Para administradores del club
  getClubReports(clubId: number, status?: string): Promise<ConductReport[]> {
    // Lista de reportes pendientes/resueltos
  }
  
  // Aplicar sanción
  applySanction(reportId: number, sanction: {
    sanctionType: string;
    severity: string;
    description: string;
    durationDays?: number;
  }): Promise<void> {
    // Aplicar medida disciplinaria
  }
  
  // Historial disciplinario de un jugador
  getUserDisciplinaryHistory(userId: number, clubId: number): Promise<DisciplinaryRecord[]> {
    // Para evaluaciones internas del club
  }
  
  // Estadísticas para el club
  getClubDisciplinaryStats(clubId: number): Promise<DisciplinaryStats> {
    // Métricas de incidentes por mes, tipos más comunes, etc.
  }
}
```

---

## 📈 Métricas y Seguimiento

### 📊 Indicadores Clave para el Club

#### KPIs Mensuales
- **Número de reportes**: Meta <5 reportes por 100 jugadores activos
- **Tiempo de resolución**: Meta <48 horas para casos prioritarios  
- **Tasa de reincidencia**: Meta <10% en siguiente mes tras sanción
- **Satisfacción post-resolución**: Encuesta a ambas partes involucradas

#### Tipos de Incidentes Más Comunes
1. **Insultos/faltas respeto**: ~60% de reportes
2. **Disputas de puntuación**: ~20% de reportes
3. **Abandono injustificado**: ~10% de reportes
4. **Otros comportamientos**: ~10% de reportes

### 🎯 Objetivos del Sistema

1. **Ambiente deportivo saludable**: Reducir incidentes mes a mes
2. **Justicia transparente**: Proceso claro y consistente
3. **Educación preventiva**: Menos sanciones, más concienciación
4. **Separación de sistemas**: Disciplina no afecta progresión deportiva

---

## 💡 Recomendaciones de Uso

### Para Jugadores
- **Reporta solo casos reales**: No uses el sistema para venganza
- **Sé específico**: Describe exactamente qué pasó y cuándo
- **Incluye testigos**: Si los hay, mejora la investigación
- **Mantén la calma**: El sistema garantiza proceso justo

### Para Clubs
- **Actúa rápido**: Resolver reportes en 24-48 horas máximo
- **Sé consistente**: Aplicar criterios similares en casos similares  
- **Educa primero**: Preferir advertencias y reuniones antes que suspensiones
- **Documenta todo**: Historial completo para casos futuros

### Para el Sistema
- **Monitorear métricas**: Identificar patrones y jugadores problemáticos
- **Feedback loop**: Mejorar proceso basado en experiencia
- **Prevención activa**: Charlas de fair play, códigos de conducta
- **Transparencia**: Jugadores deben entender el proceso

---

_Sistema de Reportes de Conducta Antideportiva - PadelHUB_  
_Versión: 1.0 - 24 Julio 2025_
