const { MongoClient } = require('mongodb');

async function corregirRolAdmin() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    // Buscar el usuario admin actual
    const usuarioActual = await usuarios.findOne({ email: 'admin@test.com' });
    
    if (!usuarioActual) {
      console.log('❌ Usuario admin@test.com no encontrado');
      return;
    }
    
    console.log('🔍 Usuario actual encontrado:');
    console.log('- Email:', usuarioActual.email);
    console.log('- Rol actual:', usuarioActual.rol || 'NO DEFINIDO');
    console.log('- Nombre:', usuarioActual.nombre);
    console.log('- RangoActual:', usuarioActual.rangoActual);
    
    // Actualizar el rol a admin
    const resultado = await usuarios.updateOne(
      { email: 'admin@test.com' },
      {
        $set: {
          rol: 'admin' // Establecer rol como admin
        }
      }
    );
    
    console.log('✅ Usuario actualizado:', resultado.modifiedCount, 'documento(s) modificado(s)');
    
    // Verificar la actualización
    const usuarioActualizado = await usuarios.findOne({ email: 'admin@test.com' });
    console.log('🎉 Verificación post-actualización:');
    console.log('- Email:', usuarioActualizado.email);
    console.log('- Rol actualizado:', usuarioActualizado.rol);
    console.log('- Nombre:', usuarioActualizado.nombre);
    
    // También crear un usuario jugador de prueba si no existe
    const jugadorExistente = await usuarios.findOne({ email: 'jugador@test.com' });
    
    if (!jugadorExistente) {
      const bcrypt = require('bcrypt');
      const passwordHasheada = await bcrypt.hash('password123', 10);
      
      const jugadorPrueba = {
        nombre: 'Jugador',
        apellidos: 'Test',
        email: 'jugador@test.com',
        password: passwordHasheada,
        telefono: '+34600123457',
        rol: 'user', // Rol de jugador
        rangoActual: 'BRONCE',
        fechaRegistro: new Date(),
        activo: true
      };
      
      const resultadoJugador = await usuarios.insertOne(jugadorPrueba);
      console.log('🎮 Usuario jugador creado:', resultadoJugador.insertedId);
      console.log('📧 Email jugador: jugador@test.com');
      console.log('🔐 Password jugador: password123');
    } else {
      console.log('ℹ️ Usuario jugador ya existe');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

corregirRolAdmin();
