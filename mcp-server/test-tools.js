#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class MCPTester {
  private mcpServerPath = 'e:\\Repositorios\\FRONTEND\\Angular 20\\padelHUB\\mcp-server\\dist\\index.js';

  async testTool(toolName: string, args: any = {}) {
    console.log(`\n🔧 Probando herramienta: ${toolName}`);
    console.log('=' .repeat(50));

    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    try {
      const command = `echo '${JSON.stringify(request)}' | node "${this.mcpServerPath}"`;
      const { stdout, stderr } = await execAsync(command, { 
        shell: true,
        timeout: 30000 
      });
      
      console.log('✅ Resultado:');
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log('⚠️  Stderr:', stderr);
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }

  async runAllTests() {
    console.log('🚀 INICIANDO PRUEBAS DEL SERVIDOR MCP PADELHUB');
    console.log('='.repeat(60));

    // 1. Estructura del proyecto
    await this.testTool('get_project_structure');

    // 2. Leer contenido de archivo
    await this.testTool('read_file_content', { 
      filepath: 'package.json' 
    });

    // 3. APIs del backend
    await this.testTool('get_backend_apis');

    // 4. Componentes del frontend
    await this.testTool('get_frontend_components');

    // 5. Búsqueda en código
    await this.testTool('search_code', { 
      query: 'PadelHUB',
      filePattern: '*.ts'
    });

    console.log('\n🎉 ¡Todas las pruebas completadas!');
  }
}

const tester = new MCPTester();
tester.runAllTests().catch(console.error);
