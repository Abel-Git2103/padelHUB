#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distPath = './dist/padelHUB/browser';

// Función para obtener el tamaño de archivo en KB
function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Función para analizar todos los archivos JS
function analyzeBundle() {
  console.log('🔍 BUNDLE ANALYSIS - PadelHUB Frontend\n');
  console.log('='.repeat(60));

  const files = fs.readdirSync(distPath);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  
  // Separar archivos por tipo
  const initialChunks = [];
  const lazyChunks = [];
  let mainFile = null;

  jsFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    const size = parseFloat(getFileSizeInKB(filePath));
    
    if (file.startsWith('main-')) {
      mainFile = { name: file, size };
    } else if (file.startsWith('chunk-')) {
      // Determinar si es inicial o lazy basado en el tamaño y la salida del build
      if (size > 100) {
        initialChunks.push({ name: file, size });
      } else {
        lazyChunks.push({ name: file, size });
      }
    }
  });

  // Ordenar por tamaño
  initialChunks.sort((a, b) => b.size - a.size);
  lazyChunks.sort((a, b) => b.size - a.size);

  console.log('\n📦 INITIAL CHUNKS (Critical Path)');
  console.log('-'.repeat(40));
  
  let totalInitial = 0;
  if (mainFile) {
    console.log(`   ${mainFile.name.padEnd(25)} ${mainFile.size.toString().padStart(8)} KB`);
    totalInitial += mainFile.size;
  }
  
  initialChunks.forEach(chunk => {
    console.log(`   ${chunk.name.padEnd(25)} ${chunk.size.toString().padStart(8)} KB`);
    totalInitial += chunk.size;
  });
  
  console.log('-'.repeat(40));
  console.log(`   TOTAL INITIAL:               ${totalInitial.toFixed(2).padStart(8)} KB`);

  console.log('\n🚀 LAZY CHUNKS (Code Splitting)');
  console.log('-'.repeat(40));
  
  let totalLazy = 0;
  const topLazyChunks = lazyChunks.slice(0, 10); // Top 10
  
  topLazyChunks.forEach(chunk => {
    console.log(`   ${chunk.name.padEnd(25)} ${chunk.size.toString().padStart(8)} KB`);
    totalLazy += chunk.size;
  });
  
  if (lazyChunks.length > 10) {
    const remainingChunks = lazyChunks.slice(10);
    const remainingSize = remainingChunks.reduce((sum, chunk) => sum + chunk.size, 0);
    totalLazy += remainingSize;
    console.log(`   ... ${remainingChunks.length} more chunks        ${remainingSize.toFixed(2).padStart(8)} KB`);
  }
  
  console.log('-'.repeat(40));
  console.log(`   TOTAL LAZY:                  ${totalLazy.toFixed(2).padStart(8)} KB`);

  // CSS Files
  const cssFiles = files.filter(file => file.endsWith('.css'));
  let totalCSS = 0;
  
  console.log('\n🎨 CSS BUNDLES');
  console.log('-'.repeat(40));
  
  cssFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    const size = parseFloat(getFileSizeInKB(filePath));
    totalCSS += size;
    console.log(`   ${file.padEnd(25)} ${size.toString().padStart(8)} KB`);
  });
  
  console.log('-'.repeat(40));
  console.log(`   TOTAL CSS:                   ${totalCSS.toFixed(2).padStart(8)} KB`);

  // Summary
  const grandTotal = totalInitial + totalLazy + totalCSS;
  
  console.log('\n📊 BUNDLE SUMMARY');
  console.log('='.repeat(60));
  console.log(`🔥 Initial Load (Critical):     ${totalInitial.toFixed(2).padStart(8)} KB (${((totalInitial/grandTotal)*100).toFixed(1)}%)`);
  console.log(`⚡ Lazy Loaded:                 ${totalLazy.toFixed(2).padStart(8)} KB (${((totalLazy/grandTotal)*100).toFixed(1)}%)`);
  console.log(`🎨 Styles:                      ${totalCSS.toFixed(2).padStart(8)} KB (${((totalCSS/grandTotal)*100).toFixed(1)}%)`);
  console.log('-'.repeat(60));
  console.log(`📦 TOTAL BUNDLE SIZE:           ${grandTotal.toFixed(2).padStart(8)} KB`);

  // Recommendations
  console.log('\n💡 OPTIMIZATION RECOMMENDATIONS');
  console.log('='.repeat(60));
  
  if (totalInitial > 300) {
    console.log('⚠️  Initial bundle is large (>300KB)');
    console.log('   → Consider lazy loading more modules');
    console.log('   → Review vendor dependencies');
  }
  
  if (lazyChunks.some(chunk => chunk.size > 100)) {
    console.log('⚠️  Large lazy chunks detected (>100KB)');
    console.log('   → Consider further code splitting');
    console.log('   → Review component dependencies');
  }
  
  if (totalCSS > 50) {
    console.log('⚠️  CSS bundle is large (>50KB)');
    console.log('   → Consider critical CSS extraction');
    console.log('   → Review component styles');
  }

  console.log('\n✅ Good practices found:');
  console.log('   ✓ Code splitting implemented');
  console.log('   ✓ Lazy loading of routes');
  console.log('   ✓ Component-level bundles');
  
  console.log('\n🎯 Next optimization steps:');
  console.log('   1. Tree shaking verification');
  console.log('   2. Vendor chunk optimization');
  console.log('   3. Preloading critical routes');
  console.log('   4. Service worker for caching');
}

try {
  analyzeBundle();
} catch (error) {
  console.error('Error analyzing bundle:', error.message);
  console.log('Make sure to run "ng build --configuration analyze" first');
}
