const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/padelhub')
  .then(() => console.log('🔗 Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Definir el schema mínimo
const UsuarioSchema = new mongoose.Schema({
  email: String,
  contraseña: String,
  password: String,
  nombre: String,
  apellidos: String,
  rol: String,
  estaActivo: Boolean,
  activo: Boolean
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', UsuarioSchema);

async function corregirCampoEstaActivo() {
  try {
    console.log('🔧 CORRIGIENDO CAMPO estaActivo...');
    
    // Actualizar todos los usuarios que no tienen estaActivo definido
    const result = await Usuario.updateMany(
      { estaActivo: { $exists: false } },
      { $set: { estaActivo: true } }
    );
    
    console.log('✅ Usuarios actualizados:', result.matchedCount);
    
    // Verificar usuarios después de la corrección
    const usuarios = await Usuario.find({}, 'email estaActivo activo');
    console.log('\n📋 USUARIOS DESPUÉS DE LA CORRECCIÓN:');
    usuarios.forEach((usuario, index) => {
      console.log(`${index + 1}. ${usuario.email}`);
      console.log(`   estaActivo: ${usuario.estaActivo}`);
      console.log(`   activo: ${usuario.activo}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

corregirCampoEstaActivo();
