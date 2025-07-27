const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  activo: Boolean
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', UsuarioSchema);

async function debugLogin() {
  try {
    console.log('🔍 BUSCANDO USUARIO...');
    const usuario = await Usuario.findOne({ email: 'jugador@test.com' });
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return;
    }
    
    console.log('👤 Usuario encontrado:');
    console.log('   📧 Email:', usuario.email);
    console.log('   🔐 Campo contraseña:', usuario.contraseña ? 'existe' : 'no existe');
    console.log('   🔐 Campo password:', usuario.password ? 'existe' : 'no existe');
    console.log('   👤 Rol:', usuario.rol);
    console.log('   ✅ activo:', usuario.activo);
    
    // Probar verificación de contraseña
    const passwordToCheck = usuario.password || usuario.contraseña;
    console.log('\n🔐 VERIFICANDO CONTRASEÑA:');
    console.log('   Campo usado:', passwordToCheck === usuario.password ? 'password' : 'contraseña');
    console.log('   Hash:', passwordToCheck);
    
    if (passwordToCheck) {
      const isValid = await bcrypt.compare('password123', passwordToCheck);
      console.log('   ✅ Contraseña válida:', isValid);
    } else {
      console.log('   ❌ No hay contraseña para verificar');
    }
    
    // Verificar estado del usuario
    console.log('\n📊 VERIFICANDO ESTADO:');
    const isActive = !usuario.activo;
    console.log('   Estado activo:', !isActive);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

debugLogin();
