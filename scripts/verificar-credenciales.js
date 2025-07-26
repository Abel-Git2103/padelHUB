const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function verificarCredenciales() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    console.log('🔍 VERIFICANDO CREDENCIALES:');
    console.log('=' .repeat(50));
    
    // Verificar usuario admin
    const admin = await usuarios.findOne({ email: 'admin@test.com' });
    if (admin) {
      console.log('👤 ADMIN encontrado:');
      console.log(`   📧 Email: ${admin.email}`);
      console.log(`   👤 Rol: ${admin.rol}`);
      console.log(`   🔐 Password hash existe: ${!!admin.password}`);
      console.log(`   🔐 Password hash: ${admin.password?.substring(0, 20)}...`);
      
      // Verificar si la contraseña coincide
      const passwordCorrecta = await bcrypt.compare('password123', admin.password);
      console.log(`   ✅ Password 'password123' es correcta: ${passwordCorrecta}`);
    } else {
      console.log('❌ Usuario admin NO encontrado');
    }
    
    console.log('\n' + '-'.repeat(50));
    
    // Verificar usuario jugador
    const jugador = await usuarios.findOne({ email: 'jugador@test.com' });
    if (jugador) {
      console.log('🎮 JUGADOR encontrado:');
      console.log(`   📧 Email: ${jugador.email}`);
      console.log(`   👤 Rol: ${jugador.rol}`);
      console.log(`   🔐 Password hash existe: ${!!jugador.password}`);
      console.log(`   🔐 Password hash: ${jugador.password?.substring(0, 20)}...`);
      
      // Verificar si la contraseña coincide
      const passwordCorrecta = await bcrypt.compare('password123', jugador.password);
      console.log(`   ✅ Password 'password123' es correcta: ${passwordCorrecta}`);
    } else {
      console.log('❌ Usuario jugador NO encontrado');
    }
    
    // Listar todos los usuarios para debug
    console.log('\n' + '='.repeat(50));
    console.log('📋 TODOS LOS USUARIOS EN BBDD:');
    
    const todosUsuarios = await usuarios.find({}).toArray();
    todosUsuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. ${usuario.email} (${usuario.rol || 'SIN ROL'})`);
      console.log(`   - Nombre: ${usuario.nombre} ${usuario.apellidos}`);
      console.log(`   - Password existe: ${!!usuario.password}`);
      console.log(`   - Activo: ${usuario.activo}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

verificarCredenciales();
