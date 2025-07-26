const { MongoClient } = require('mongodb');

async function verificarUsuario() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    const usuario = await usuarios.findOne({ email: 'admin@test.com' });
    
    if (usuario) {
      console.log('✅ Usuario encontrado:');
      console.log('📧 Email:', usuario.email);
      console.log('👤 Nombre:', usuario.nombre);
      console.log('🔐 Password hash existe:', !!usuario.password);
      console.log('📅 Fecha registro:', usuario.fechaRegistro);
      console.log('🏅 Rango:', usuario.rangoActual);
      console.log('📋 Todos los campos:', Object.keys(usuario));
    } else {
      console.log('❌ Usuario no encontrado');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

verificarUsuario();
