const { MongoClient } = require('mongodb');

async function verificarUsuarios() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    // Listar todos los usuarios con sus roles
    const todosLosUsuarios = await usuarios.find({}).toArray();
    
    console.log('👥 USUARIOS EN LA BASE DE DATOS:');
    console.log('=' .repeat(50));
    
    todosLosUsuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. Usuario: ${usuario.nombre} ${usuario.apellidos}`);
      console.log(`   📧 Email: ${usuario.email}`);
      console.log(`   👤 Rol: ${usuario.rol || 'NO DEFINIDO'}`);
      console.log(`   🏆 Rango: ${usuario.rangoActual || 'NO DEFINIDO'}`);
      console.log(`   ✅ Activo: ${usuario.activo}`);
      console.log('   ' + '-'.repeat(30));
    });
    
    console.log(`\n📊 Total de usuarios: ${todosLosUsuarios.length}`);
    
    // Estadísticas por rol
    const estadisticas = {};
    todosLosUsuarios.forEach(usuario => {
      const rol = usuario.rol || 'SIN_ROL';
      estadisticas[rol] = (estadisticas[rol] || 0) + 1;
    });
    
    console.log('\n📈 ESTADÍSTICAS POR ROL:');
    Object.entries(estadisticas).forEach(([rol, cantidad]) => {
      console.log(`   ${rol}: ${cantidad} usuario(s)`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

verificarUsuarios();
