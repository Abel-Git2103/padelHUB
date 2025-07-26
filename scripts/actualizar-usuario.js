const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function actualizarUsuario() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    // Hashear la nueva contraseña
    const passwordHasheada = await bcrypt.hash('password123', 10);
    
    // Actualizar el usuario
    const resultado = await usuarios.updateOne(
      { email: 'admin@test.com' },
      {
        $set: {
          password: passwordHasheada,
          fechaRegistro: new Date(),
          activo: true
        },
        $unset: {
          contraseña: "" // Eliminar el campo antiguo
        }
      }
    );
    
    console.log('✅ Usuario actualizado:', resultado.modifiedCount, 'documento(s) modificado(s)');
    
    // Verificar la actualización
    const usuarioActualizado = await usuarios.findOne({ email: 'admin@test.com' });
    console.log('🔐 Password hash existe:', !!usuarioActualizado.password);
    console.log('❌ Campo antiguo contraseña existe:', !!usuarioActualizado.contraseña);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

actualizarUsuario();
