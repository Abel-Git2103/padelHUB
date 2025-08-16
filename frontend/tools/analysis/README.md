# Herramientas de Análisis - Frontend

Esta carpeta contiene herramientas para analizar y optimizar el bundle del frontend de PadelHUB.

## 🔧 Scripts de Análisis

### Bundle Analysis
- **`bundle-analyzer.js`** - Analiza el tamaño y composición del bundle principal
- **`import-analyzer.js`** - Analiza las importaciones y dependencias

### Optimization Tools
- **`optimization-guide.js`** - Guía automatizada de optimización
- **`optimization-report.js`** - Genera reportes de optimización

## 🚀 Uso

Ejecutar desde el directorio `frontend`:

```bash
# Análisis completo del bundle
npm run bundle:analyze

# Análisis de importaciones
node tools/analysis/import-analyzer.js

# Reporte de optimización
node tools/analysis/optimization-report.js
```

## 📊 Reportes

Los reportes se generan en formato HTML y se abren automáticamente en el navegador.

## 📝 Notas

- Los scripts requieren que el proyecto esté compilado (`ng build`)
- Los reportes HTML son temporales y no se incluyen en el control de versiones
- Para documentación de optimizaciones aplicadas, ver `docs/architecture/OPTIMIZACIONES_FRONTEND.md`
