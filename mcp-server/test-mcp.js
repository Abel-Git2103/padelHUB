const { spawn } = require('child_process');
const path = require('path');

async function testMCPTool(toolName, args = {}) {
  return new Promise((resolve, reject) => {
    const serverPath = path.join(__dirname, 'dist', 'index.js');
    
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    console.log(`\n🔧 Probando: ${toolName}`);
    console.log('Request:', JSON.stringify(request, null, 2));
    console.log('-'.repeat(50));

    const child = spawn('node', [serverPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let error = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      error += data.toString();
    });

    child.on('close', (code) => {
      console.log('✅ Salida:', output);
      if (error) console.log('⚠️  Error:', error);
      resolve({ output, error, code });
    });

    child.on('error', (err) => {
      reject(err);
    });

    // Enviar el request
    child.stdin.write(JSON.stringify(request) + '\n');
    child.stdin.end();
  });
}

async function runTests() {
  try {
    console.log('🚀 PROBANDO SERVIDOR MCP PADELHUB');
    console.log('='.repeat(60));

    // 1. Estructura del proyecto
    await testMCPTool('get_project_structure');

    console.log('\n\n⏳ Esperando 2 segundos antes de la siguiente prueba...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. Leer archivo
    await testMCPTool('read_file_content', { filepath: 'package.json' });

    console.log('\n\n⏳ Esperando 2 segundos antes de la siguiente prueba...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. APIs del backend
    await testMCPTool('get_backend_apis');

    console.log('\n\n⏳ Esperando 2 segundos antes de la siguiente prueba...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Componentes frontend
    await testMCPTool('get_frontend_components');

    console.log('\n\n⏳ Esperando 2 segundos antes de la siguiente prueba...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 5. Búsqueda en código
    await testMCPTool('search_code', { query: 'Club', filePattern: '*.ts' });

    console.log('\n🎉 ¡Todas las pruebas completadas!');
  } catch (error) {
    console.error('❌ Error en las pruebas:', error);
  }
}

runTests();
