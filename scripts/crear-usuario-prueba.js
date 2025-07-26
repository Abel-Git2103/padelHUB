const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

async function crearUsuarioPrueba() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('🔗 Conectado a MongoDB');
    
    const db = client.db('padelhub');
    const usuarios = db.collection('usuarios');
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await usuarios.findOne({ email: 'admin@test.com' });
    if (usuarioExistente) {
      console.log('⚠️ El usuario ya existe');
      return;
    }
    
    // Crear el usuario
    const passwordHasheada = await bcrypt.hash('password123', 10);
    
    const nuevoUsuario = {
      nombre: 'Admin',
      apellidos: 'Test',
      email: 'admin@test.com',
      password: passwordHasheada,
      telefono: '+34600123456',
      rangoActual: 'COBRE',
      fechaRegistro: new Date(),
      activo: true
    };
    
    const resultado = await usuarios.insertOne(nuevoUsuario);
    console.log('✅ Usuario creado exitosamente:', resultado.insertedId);
    console.log('📧 Email: admin@test.com');
    console.log('🔐 Password: password123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

crearUsuarioPrueba();
