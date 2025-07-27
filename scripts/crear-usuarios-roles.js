const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function crearUsuariosConRoles() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    // Hashear password común
    const passwordHasheada = await bcrypt.hash('password123', 10);
    
    // Usuarios de prueba con roles correctos
    const usuariosPrueba = [
      {
        nombre: 'Admin',
        apellidos: 'Sistema',
        email: 'admin.sistema@test.com',
        password: passwordHasheada,
        telefono: '+34600111111',
        rangoActual: 'PLATINO',
        rol: 'ADMIN_SISTEMA',
        activo: true,
        emailVerificado: true,
        fechaCreacion: new Date().toISOString(),
        ultimaActividad: new Date().toISOString()
      },
      {
        nombre: 'Admin',
        apellidos: 'Club',
        email: 'admin.club@test.com',
        password: passwordHasheada,
        telefono: '+34600222222',
        rangoActual: 'ORO',
        rol: 'ADMIN_CLUB',
        idClub: '507f1f77bcf86cd799439011',
        activo: true,
        emailVerificado: true,
        fechaCreacion: new Date().toISOString(),
        ultimaActividad: new Date().toISOString()
      },
      {
        nombre: 'Jugador',
        apellidos: 'Test',
        email: 'jugador@test.com',
        password: passwordHasheada,
        telefono: '+34600333333',
        rangoActual: 'BRONCE',
        rol: 'JUGADOR',
        idClub: '507f1f77bcf86cd799439011',
        activo: true,
        emailVerificado: true,
        fechaCreacion: new Date().toISOString(),
        ultimaActividad: new Date().toISOString()
      }
    ];
    
    // Crear usuarios de prueba
    for (const usuario of usuariosPrueba) {
      const usuarioExistente = await usuarios.findOne({ email: usuario.email });
      
      if (usuarioExistente) {
        console.log(`⚠️ Usuario ${usuario.email} ya existe, actualizando...`);
        await usuarios.updateOne(
          { email: usuario.email },
          { $set: { rol: usuario.rol } }
        );
        console.log(`✅ Usuario ${usuario.email} actualizado con rol: ${usuario.rol}`);
      } else {
        await usuarios.insertOne(usuario);
        console.log(`✅ Usuario creado: ${usuario.email} con rol: ${usuario.rol}`);
      }
    }
    
    console.log('\n📋 Usuarios de prueba creados:');
    console.log('Admin Sistema: admin.sistema@test.com / password123');
    console.log('Admin Club: admin.club@test.com / password123');
    console.log('Jugador: jugador@test.com / password123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('📪 Conexión cerrada');
  }
}

crearUsuariosConRoles();
