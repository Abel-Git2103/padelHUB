# Figma MCP Workflow

## Objetivo

Conectar Figma al entorno MCP del proyecto para poder:

1. Leer el borrador real de Figma.
2. Ajustar componentes, layouts y textos desde el agente.
3. Revisar el draft frente a las capturas reales de `docs/screenshots/`.
4. Convertir decisiones de diseño en cambios aterrizables para Angular.

## Configuración del repo

Este repo queda preparado con un servidor MCP de Figma basado en `supercharged-figma-mcp`.

Archivos configurados:

1. `.vscode/mcp.json`
2. `claude_desktop_config.json`
3. `package.json`

Script disponible:

```bash
npm run dev:mcp:figma
```

## Qué falta para que funcione de verdad

La parte MCP del repo no basta por sí sola. Necesitas también el lado Figma:

1. Instalar el plugin de Figma compatible con `supercharged-figma-mcp`.
2. Abrir el archivo o draft de Figma de PadelHUB.
3. Ejecutar el plugin dentro de Figma para enlazarlo con el relay local.
4. Reiniciar VS Code o abrir una nueva conversación para que el host cargue la nueva tool `figma`.

Sin ese paso, el servidor MCP arrancará, pero no tendrá un documento Figma conectado para leer o editar.

## Arranque recomendado

### 1. Instalar dependencias

```bash
npm install
```

### 2. Arrancar Figma MCP

```bash
npm run dev:mcp:figma
```

Esto levanta el servidor MCP en modo local con relay en `127.0.0.1:8888`.

### 3. Abrir Figma

En Figma:

1. Abre el borrador o archivo de diseño de PadelHUB.
2. Ejecuta el plugin asociado a `supercharged-figma-mcp`.
3. Conecta el plugin con el relay local.

### 4. Reiniciar la sesión del agente

Abre una conversación nueva tras tener el plugin enlazado. Ahí ya debería aparecer el MCP de Figma como tool utilizable.

## Flujo de trabajo recomendado

### Fase 1. Lectura y auditoría

Objetivo: entender el draft antes de tocarlo.

Pedir al agente:

1. Leer páginas, frames y componentes principales.
2. Detectar incoherencias entre jugador móvil y admin escritorio.
3. Comparar el draft con `docs/screenshots/figma-batch-01` y `docs/screenshots/figma-batch-02`.
4. Listar deuda visual, deuda estructural y oportunidades de sistema.

### Fase 2. Sistema visual

Objetivo: consolidar un mini design system antes de mover pantallas.

Pedir al agente:

1. Unificar color, tipografía, spacing, radios y sombras.
2. Estandarizar botones, inputs, cards, badges y navegación.
3. Detectar componentes duplicados o inconsistentes.
4. Proponer y aplicar naming consistente.

### Fase 3. Pantallas prioritarias

Objetivo: mejorar primero las superficies de mayor impacto.

Orden recomendado:

1. Login
2. Dashboard jugador
3. Perfil jugador
4. Detalle de club
5. Dashboard admin sistema
6. Gestión de clubes
7. Dashboard admin club

### Fase 4. Refinado y handoff

Objetivo: dejar el diseño listo para implementación.

Pedir al agente:

1. Revisar responsive y variantes.
2. Ajustar empty, loading y error states.
3. Consolidar tokens y componentes.
4. Preparar plan de implementación por fases para Angular.

## Prompts recomendados una vez conectado

### Auditoría inicial

```text
Lee el draft actual de Figma de PadelHUB y compáralo con las capturas reales de docs/screenshots. Detecta incoherencias visuales, componentes duplicados, jerarquía débil y oportunidades para un mini design system unificado entre jugador móvil y admin escritorio.
```

### Iteración de sistema

```text
Refina el design system del draft actual. Quiero un lenguaje visual más premium, consistente e implementable. Unifica tipografía, color, spacing, cards, formularios, navegación móvil y sidebar admin sin inventar módulos nuevos.
```

### Iteración de pantallas

```text
Ajusta el borrador de Figma para mejorar login, dashboard jugador, perfil jugador, detalle de club y dashboard admin. Mantén la lógica funcional actual, pero mejora jerarquía, densidad, claridad y percepción de calidad.
```

## Convenciones para trabajar bien

1. No modificar demasiadas pantallas a la vez.
2. Hacer primero sistema, luego pantallas.
3. Usar `docs/screenshots/figma-batch-01` como lote base.
4. Usar `docs/screenshots/figma-batch-02` para refinar densidad y módulos operativos.
5. Validar cada iteración antes de pasar a Angular.

## Resultado esperado

Cuando el MCP de Figma esté realmente enlazado, el agente debería poder:

1. Leer el archivo de Figma.
2. Inspeccionar frames, nodos y componentes.
3. Ajustar el borrador sobre el archivo real.
4. Convertir el diseño aprobado en un plan claro de implementación frontend.