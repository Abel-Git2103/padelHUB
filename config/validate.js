#!/usr/bin/env node

/**
 * Script de validación de configuración de PadelHUB
 * Verifica que todos los archivos de configuración sean válidos
 */

const fs = require('fs');
const path = require('path');

const configDir = __dirname;
const projectRoot = path.join(configDir, '..');

console.log('🔍 Validando configuración de PadelHUB...\n');

// Archivos de configuración a validar
const configFiles = [
  'project.json',
  'paths.json',
  'environment.json',
  'tools.json'
];

let allValid = true;

configFiles.forEach(file => {
  const filePath = path.join(configDir, file);

  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${file}: Archivo no encontrado`);
      allValid = false;
      return;
    }

    // Verificar que es un JSON válido
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);

    console.log(`✅ ${file}: Válido`);

  } catch (error) {
    console.log(`❌ ${file}: Error de sintaxis JSON - ${error.message}`);
    allValid = false;
  }
});

// Verificar referencias en paths.json
try {
  const pathsConfig = require('./paths.json');

  console.log('\n🔗 Verificando referencias de rutas...');

  // Verificar que los directorios referenciados existen
  Object.entries(pathsConfig.directories).forEach(([key, dirPath]) => {
    // Resolver la ruta desde la raíz del proyecto, no desde config/
    const fullPath = path.resolve(projectRoot, dirPath);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ Directorio ${key}: ${dirPath}`);
    } else {
      console.log(`⚠️  Directorio ${key}: ${dirPath} (no encontrado)`);
    }
  });

  console.log('\n📄 Verificando archivos importantes...');

  // Verificar que los archivos package.json existen
  Object.entries(pathsConfig.files).forEach(([key, filePath]) => {
    const fullPath = path.resolve(projectRoot, filePath);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ Archivo ${key}: ${filePath}`);
    } else {
      console.log(`⚠️  Archivo ${key}: ${filePath} (no encontrado)`);
    }
  });

} catch (error) {
  console.log(`❌ Error verificando rutas y archivos: ${error.message}`);
  allValid = false;
}

console.log('\n' + '='.repeat(50));

if (allValid) {
  console.log('🎉 ¡Todas las configuraciones son válidas!');
  process.exit(0);
} else {
  console.log('❌ Se encontraron errores en la configuración');
  process.exit(1);
}
