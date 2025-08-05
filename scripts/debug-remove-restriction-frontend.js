/**
 * Script para debuggear exactamente la llamada que está fallando desde el frontend
 */

const { MongoClient } = require('mongodb');

async function debugRemoveRestrictionCall() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    console.log('🔧 Debug de eliminación de restricción desde frontend');
    console.log('======================================================');
    console.log('🔍 Conectando a MongoDB...');
    
    await client.connect();
    const db = client.db('padelHUB');
    const clubs = db.collection('clubs');

    // Obtener el primer club disponible
    let club = await clubs.findOne({});

    if (!club) {
      console.log('❌ No hay clubes en la base de datos');
      return;
    }

    console.log(`📋 Club base encontrado: ${club.name} (ID: ${club._id})`);

    // Si no tiene restricciones, agregar algunas para la prueba
    if (!club.restrictions || !club.restrictions.activeRestrictions || club.restrictions.activeRestrictions.length === 0) {
      console.log('🔧 Agregando restricciones de prueba...');
      
      const testRestrictions = [
        {
          type: 'payment_delay',
          reason: 'Retraso en pagos de cuotas mensuales',
          appliedDate: new Date(),
          appliedBy: 'test-admin',
          isActive: true,
          lastModified: new Date()
        },
        {
          type: 'system_maintenance', 
          reason: 'Mantenimiento del sistema de reservas',
          appliedDate: new Date(),
          appliedBy: 'system-admin',
          isActive: true,
          lastModified: new Date()
        }
      ];

      const updateResult = await clubs.updateOne(
        { _id: club._id },
        {
          $set: {
            'restrictions.isRestricted': true,
            'restrictions.activeRestrictions': testRestrictions,
            'restrictions.restrictionsSummary': ['payment_delay', 'system_maintenance'],
            'restrictions.restrictionsHistory': []
          }
        }
      );

      console.log(`✅ Restricciones agregadas: ${updateResult.modifiedCount} documento(s) modificado(s)`);
      
      // Recargar el club con las nuevas restricciones
      club = await clubs.findOne({ _id: club._id });
    }

    console.log(`📋 Club encontrado: ${club.name} (ID: ${club._id})`);
    console.log(`🔍 Restricciones activas: ${club.restrictions.activeRestrictions.length}`);
    
    // Examinar cada restricción activa
    club.restrictions.activeRestrictions.forEach((restriction, index) => {
      console.log(`\n📊 Restricción ${index}:`);
      console.log(`  - Tipo: ${restriction.type}`);
      console.log(`  - Razón: ${restriction.reason}`);
      console.log(`  - Aplicada por: ${restriction.appliedBy}`);
      console.log(`  - Fecha aplicación: ${restriction.appliedDate}`);
      console.log(`  - Es activa: ${restriction.isActive}`);
      console.log(`  - Fecha expiración: ${restriction.expiryDate || 'N/A'}`);
      
      // Verificar si faltan campos requeridos
      const missingFields = [];
      if (!restriction.type) missingFields.push('type');
      if (!restriction.reason) missingFields.push('reason');
      if (!restriction.appliedBy) missingFields.push('appliedBy');
      if (!restriction.appliedDate) missingFields.push('appliedDate');
      
      if (missingFields.length > 0) {
        console.log(`  ⚠️ CAMPOS FALTANTES: ${missingFields.join(', ')}`);
      } else {
        console.log(`  ✅ Todos los campos requeridos están presentes`);
      }
    });

    // Examinar el historial si existe
    if (club.restrictions.restrictionsHistory && club.restrictions.restrictionsHistory.length > 0) {
      console.log(`\n📚 Historial de restricciones: ${club.restrictions.restrictionsHistory.length} entradas`);
      
      club.restrictions.restrictionsHistory.forEach((histItem, index) => {
        console.log(`\n📊 Historial ${index}:`);
        console.log(`  - Tipo: ${histItem.type}`);
        console.log(`  - Razón: ${histItem.reason}`);
        console.log(`  - Aplicada por: ${histItem.appliedBy}`);
        console.log(`  - Fecha aplicación: ${histItem.appliedDate}`);
        console.log(`  - Es activa: ${histItem.isActive}`);
        console.log(`  - Removida: ${histItem.removedDate || 'N/A'}`);
        console.log(`  - Removida por: ${histItem.removedBy || 'N/A'}`);
        
        // Verificar si faltan campos requeridos
        const missingFields = [];
        if (!histItem.type) missingFields.push('type');
        if (!histItem.reason) missingFields.push('reason');
        if (!histItem.appliedBy) missingFields.push('appliedBy');
        
        if (missingFields.length > 0) {
          console.log(`  ⚠️ CAMPOS FALTANTES EN HISTORIAL: ${missingFields.join(', ')}`);
        } else {
          console.log(`  ✅ Campos requeridos del historial están presentes`);
        }
      });
    }

    // Simular el proceso de eliminar restricción
    const restrictionToRemove = club.restrictions.activeRestrictions[0];
    if (restrictionToRemove) {
      console.log(`\n🗑️ Simulando eliminación de restricción: ${restrictionToRemove.type}`);
      
      // Crear la entrada de historial como lo hace el backend
      const historyEntry = {
        type: restrictionToRemove.type,
        reason: restrictionToRemove.reason,
        appliedDate: restrictionToRemove.appliedDate,
        expiryDate: restrictionToRemove.expiryDate,
        appliedBy: restrictionToRemove.appliedBy,
        isActive: false,
        removedDate: new Date(),
        removedBy: 'test-user',
        removalReason: 'Test de eliminación',
        lastModified: new Date()
      };
      
      console.log('📝 Entrada de historial que se creará:');
      Object.keys(historyEntry).forEach(key => {
        const value = historyEntry[key];
        console.log(`  - ${key}: ${value} (tipo: ${typeof value})`);
        if (value === null || value === undefined || value === '') {
          console.log(`    ⚠️ VALOR PROBLEMÁTICO: ${key} = ${value}`);
        }
      });
      
      // Verificar campos requeridos para el historial
      const requiredFields = ['type', 'reason', 'appliedBy'];
      const missingInHistory = requiredFields.filter(field => !historyEntry[field]);
      
      if (missingInHistory.length > 0) {
        console.log(`❌ FALTAN CAMPOS REQUERIDOS EN NUEVA ENTRADA: ${missingInHistory.join(', ')}`);
      } else {
        console.log(`✅ Nueva entrada de historial tiene todos los campos requeridos`);
      }
    }

  } catch (error) {
    console.error('❌ Error en debug:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await client.close();
    console.log('\n🔒 Conexión cerrada');
  }
}

debugRemoveRestrictionCall();
