const mongoose = require('mongoose');

async function listCollections() {
  try {
    await mongoose.connect('mongodb://localhost:27017/padelClub');
    console.log('🔗 Conectado a MongoDB');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Colecciones disponibles:');
    collections.forEach(col => {
      console.log('  -', col.name);
    });
    
    // Contar documentos en cada colección
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  📊 ${col.name}: ${count} documentos`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

listCollections();
