#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function analyzeImports() {
  console.log('🔍 ANALYZING HEAVY IMPORTS - PadelHUB\n');
  console.log('='.repeat(50));

  const srcPath = './src/app';
  const heavyLibraries = [
    '@angular/material',
    '@angular/cdk',
    'rxjs/operators',
    'lodash',
    'moment',
    'chart.js',
    'three.js',
    'primeng'
  ];

  function analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = [];
      
      // Buscar imports estáticos
      const staticImportRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
      let match;
      
      while ((match = staticImportRegex.exec(content)) !== null) {
        const importPath = match[1];
        const isHeavy = heavyLibraries.some(lib => importPath.startsWith(lib));
        
        if (isHeavy) {
          imports.push({
            path: importPath,
            line: content.substring(0, match.index).split('\n').length,
            fullMatch: match[0]
          });
        }
      }
      
      return imports;
    } catch (error) {
      return [];
    }
  }

  function scanDirectory(dir) {
    const results = [];
    
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          results.push(...scanDirectory(filePath));
        } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
          const imports = analyzeFile(filePath);
          if (imports.length > 0) {
            results.push({
              file: filePath.replace('./src/app/', ''),
              imports
            });
          }
        }
      }
    } catch (error) {
      // Directorio no existe
    }
    
    return results;
  }

  const heavyImports = scanDirectory(srcPath);
  
  if (heavyImports.length === 0) {
    console.log('✅ No heavy library imports found!');
    console.log('   The project uses lightweight imports strategy.');
  } else {
    console.log('⚠️  Heavy imports detected:\n');
    
    heavyImports.forEach(fileInfo => {
      console.log(`📄 ${fileInfo.file}`);
      fileInfo.imports.forEach(imp => {
        console.log(`   Line ${imp.line}: ${imp.path}`);
      });
      console.log('');
    });
    
    // Recommendations
    console.log('\n💡 OPTIMIZATION SUGGESTIONS:');
    console.log('-'.repeat(40));
    
    const allImports = heavyImports.flatMap(f => f.imports);
    const materialImports = allImports.filter(i => i.path.startsWith('@angular/material'));
    const cdkImports = allImports.filter(i => i.path.startsWith('@angular/cdk'));
    const rxjsImports = allImports.filter(i => i.path.startsWith('rxjs'));
    
    if (materialImports.length > 0) {
      console.log('🎨 Angular Material optimizations:');
      console.log('   → Use specific module imports');
      console.log('   → Example: import { MatButtonModule } from "@angular/material/button"');
    }
    
    if (cdkImports.length > 0) {
      console.log('🔧 Angular CDK optimizations:');
      console.log('   → Import only needed CDK modules');
      console.log('   → Consider alternatives for complex features');
    }
    
    if (rxjsImports.length > 0) {
      console.log('🔄 RxJS optimizations:');
      console.log('   → Use pipeable operators');
      console.log('   → Import from specific paths: rxjs/operators');
    }
  }

  // Check for dynamic imports
  console.log('\n🚀 DYNAMIC IMPORTS ANALYSIS:');
  console.log('-'.repeat(40));
  
  function findDynamicImports(dir) {
    const results = [];
    
    try {
      const files = fs.readdirSync(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          results.push(...findDynamicImports(filePath));
        } else if (file.endsWith('.ts')) {
          try {
            const content = fs.readFileSync(filePath, 'utf8');
            const dynamicImportRegex = /import\(['"]([^'"]+)['"]\)/g;
            let match;
            
            while ((match = dynamicImportRegex.exec(content)) !== null) {
              results.push({
                file: filePath.replace('./src/app/', ''),
                import: match[1],
                line: content.substring(0, match.index).split('\n').length
              });
            }
          } catch (error) {
            // Skip files that can't be read
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist
    }
    
    return results;
  }

  const dynamicImports = findDynamicImports(srcPath);
  
  if (dynamicImports.length > 0) {
    console.log(`✅ Found ${dynamicImports.length} dynamic imports (good for code splitting):`);
    dynamicImports.forEach(imp => {
      console.log(`   ${imp.file}:${imp.line} → ${imp.import}`);
    });
  } else {
    console.log('⚠️  No dynamic imports found. Consider adding lazy loading.');
  }

  console.log('\n📊 SUMMARY:');
  console.log('='.repeat(50));
  console.log(`Heavy imports found: ${heavyImports.length}`);
  console.log(`Dynamic imports found: ${dynamicImports.length}`);
  console.log(`Code splitting ratio: ${dynamicImports.length > 0 ? 'Good' : 'Needs improvement'}`);
}

try {
  analyzeImports();
} catch (error) {
  console.error('Error analyzing imports:', error.message);
}
