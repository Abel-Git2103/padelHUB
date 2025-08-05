/**
 * Script para limpiar restricciones problemáticas directamente en MongoDB
 */

const mongoose = require('mongoose');

async function limpiarRestricionesDirecto() {
  try {
    // Conectar a MongoDB
    await mongoose.connect('mongodb://localhost:27017/padelhub');
    console.log('🔗 Conectado a MongoDB');
    
    // Primero buscar cualquier club
    const clubs = await mongoose.connection.db.collection('clubs').find({}).toArray();
    console.log(`📋 Encontrados ${clubs.length} clubes en la base de datos`);
    
    if (clubs.length === 0) {
      console.log('❌ No hay clubes en la base de datos');
      return;
    }
    
    // Si no existe Club Pádel Elite Madrid, usar el primer club
    let targetClub = clubs.find(c => c.name === 'Club Pádel Elite Madrid');
    if (!targetClub) {
      targetClub = clubs[0];
      console.log(`⚠️ Club Pádel Elite Madrid no encontrado, usando: ${targetClub.name}`);
    }
    
    console.log(`🎯 Limpiando restricciones del club: ${targetClub.name}`);
    
    // Mostrar estado actual
    console.log('📊 Estado actual:', {
      activeRestrictions: targetClub.restrictions?.activeRestrictions?.length || 0,
      restrictionsHistory: targetClub.restrictions?.restrictionsHistory?.length || 0
    });
    
    // Actualizar el club
    const result = await mongoose.connection.db.collection('clubs').updateOne(
      { _id: targetClub._id },
      {
        $set: {
          'restrictions.isRestricted': false,
          'restrictions.activeRestrictions': [],
          'restrictions.restrictionsSummary': [],
          'restrictions.restrictionsHistory': [] // Limpiar el historial problemático
        }
      }
    );
    
    console.log('✅ Restricciones limpiadas:', result.modifiedCount, 'documentos actualizados');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

limpiarRestricionesDirecto();
