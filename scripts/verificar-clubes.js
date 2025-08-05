/**
 * Script para verificar clubes en la base de datos
 */

const { MongoClient } = require('mongodb');

async function checkClubs() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    console.log('🔍 Conectando a MongoDB...');
    await client.connect();
    const db = client.db('padelHUB');
    const clubs = db.collection('clubs');

    const totalClubs = await clubs.countDocuments();
    console.log(`📊 Total de clubes: ${totalClubs}`);

    if (totalClubs > 0) {
      const allClubs = await clubs.find({}).toArray();
      console.log('\n📋 CLUBES ENCONTRADOS:');
      console.log('=====================');
      
      allClubs.forEach((club, index) => {
        console.log(`${index + 1}. ${club.name} (ID: ${club._id})`);
        console.log(`   📧 Email: ${club.contact?.email || 'N/A'}`);
        console.log(`   📍 Ciudad: ${club.location?.city || 'N/A'}`);
        console.log(`   ⚡ Estado: ${club.status || 'N/A'}`);
        
        if (club.restrictions) {
          console.log(`   🚫 Restricciones:`);
          console.log(`      - Restringido: ${club.restrictions.isRestricted || false}`);
          console.log(`      - Activas: ${club.restrictions.activeRestrictions?.length || 0}`);
          console.log(`      - Historial: ${club.restrictions.restrictionsHistory?.length || 0}`);
        } else {
          console.log(`   🚫 Sin sistema de restricciones`);
        }
        console.log('   ------------------------------');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n🔒 Conexión cerrada');
  }
}

checkClubs();
