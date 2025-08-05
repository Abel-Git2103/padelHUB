const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

async function verificarHorariosClub() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('🔌 Conectado a MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('clubs');
    
    // Obtener todos los clubes
    const clubes = await collection.find({}).toArray();
    
    console.log(`📊 Total de clubes encontrados: ${clubes.length}\n`);
    
    clubes.forEach((club, index) => {
      console.log(`🏟️ Club ${index + 1}: ${club.name}`);
      console.log(`   ID: ${club._id}`);
      console.log(`   Tiene operatingHours: ${!!club.operatingHours}`);
      
      if (club.operatingHours) {
        console.log(`   Tipo de operatingHours: ${typeof club.operatingHours}`);
        console.log(`   Estructura:`, JSON.stringify(club.operatingHours, null, 2));
        
        // Verificar días específicos
        const dias = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        dias.forEach(dia => {
          const horario = club.operatingHours[dia];
          if (horario) {
            console.log(`   ${dia}: ${horario.open} - ${horario.close}`);
          } else {
            console.log(`   ${dia}: ❌ No definido`);
          }
        });
      } else {
        console.log(`   ❌ Sin horarios definidos`);
      }
      
      console.log(''); // Línea en blanco
    });
    
  } catch (error) {
    console.error('❌ Error al verificar horarios:', error);
  } finally {
    await client.close();
    console.log('🔐 Conexión cerrada');
  }
}

// Ejecutar el script
verificarHorariosClub();
