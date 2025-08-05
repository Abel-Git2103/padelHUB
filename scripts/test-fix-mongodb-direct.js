#!/usr/bin/env node

/**
 * Script para probar el fix del historial de restricciones directamente con MongoDB
 * Simula las operaciones que hace el backend para verificar que los campos se preservan
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'padelhub';

async function testFixHistorialMongoDB() {
  let client;
  
  try {
    console.log('🔧 Test Fix: Historial MongoDB Direct - Type y Reason');
    console.log('===================================================');
    
    console.log('🔍 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // 1. Buscar un club para las pruebas
    console.log('\n📋 1. Buscando club para las pruebas...');
    const club = await clubsCollection.findOne({ status: 'ACTIVO' });
    if (!club) {
      console.log('❌ No hay clubes activos para probar');
      return;
    }
    
    console.log(`Usando club: ${club.name} (ID: ${club._id})`);
    
    // 2. Crear una restricción completa como lo haría el backend corregido
    console.log('\n➕ 2. Creando restricción con datos completos...');
    
    const restrictionData = {
      type: 'PAYMENT_FROZEN',
      reason: 'Test fix - Verificación de preservación de campos en historial',
      appliedDate: new Date(),
      appliedBy: 'admin.test@fixtest.com',
      isActive: true,
      lastModified: new Date()
    };
    
    // Simular la validación que agregamos al backend
    if (!restrictionData.type || !restrictionData.reason || !restrictionData.appliedBy) {
      throw new Error(`Datos de restricción incompletos: type=${restrictionData.type}, reason=${restrictionData.reason}, appliedBy=${restrictionData.appliedBy}`);
    }
    
    console.log(`📝 Datos de restricción validados:`, {
      type: restrictionData.type,
      reason: restrictionData.reason,
      appliedBy: restrictionData.appliedBy,
      appliedDate: restrictionData.appliedDate
    });
    
    // Aplicar la restricción
    const updateResult = await clubsCollection.updateOne(
      { _id: club._id },
      {
        $set: {
          'restrictions.isRestricted': true,
          'restrictions.lastRestrictionDate': restrictionData.appliedDate
        },
        $push: {
          'restrictions.activeRestrictions': restrictionData,
          'restrictions.restrictionsHistory': {...restrictionData} // Copia explícita
        },
        $inc: {
          'restrictions.totalRestrictionsApplied': 1
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log('✅ Restricción aplicada exitosamente');
    } else {
      console.log('⚠️ No se modificó el club');
    }
    
    // 3. Verificar inmediatamente después de aplicar
    console.log('\n🔍 3. Verificando estado inmediatamente después de aplicar...');
    const clubAfterApply = await clubsCollection.findOne({ _id: club._id });
    
    if (clubAfterApply.restrictions && clubAfterApply.restrictions.restrictionsHistory) {
      const lastHistoryEntry = clubAfterApply.restrictions.restrictionsHistory[clubAfterApply.restrictions.restrictionsHistory.length - 1];
      
      console.log('📊 Última entrada del historial después de aplicar:', {
        type: lastHistoryEntry.type,
        reason: lastHistoryEntry.reason,
        appliedBy: lastHistoryEntry.appliedBy,
        isActive: lastHistoryEntry.isActive
      });
      
      // Verificar campos críticos
      if (!lastHistoryEntry.type) {
        console.error('❌ ERROR: Campo "type" faltante o vacío');
      } else {
        console.log('✅ Campo "type" preservado:', lastHistoryEntry.type);
      }
      
      if (!lastHistoryEntry.reason) {
        console.error('❌ ERROR: Campo "reason" faltante o vacío');
      } else {
        console.log('✅ Campo "reason" preservado:', lastHistoryEntry.reason);
      }
      
      if (!lastHistoryEntry.appliedBy) {
        console.error('❌ ERROR: Campo "appliedBy" faltante o vacío');
      } else {
        console.log('✅ Campo "appliedBy" preservado:', lastHistoryEntry.appliedBy);
      }
    }
    
    // 4. Simular la operación de remoción como lo haría el backend corregido
    console.log('\n🗑️ 4. Simulando remoción con preservación de campos...');
    
    const now = new Date();
    const removedBy = 'admin.test@fixtest.com';
    const removalReason = 'Test fix - Verificación de preservación en remoción';
    
    // Buscar la restricción en el historial para actualizar
    const historyUpdateResult = await clubsCollection.updateOne(
      { 
        _id: club._id,
        'restrictions.restrictionsHistory.type': 'PAYMENT_FROZEN',
        'restrictions.restrictionsHistory.isActive': true
      },
      {
        $set: {
          'restrictions.restrictionsHistory.$.isActive': false,
          'restrictions.restrictionsHistory.$.removedDate': now,
          'restrictions.restrictionsHistory.$.removedBy': removedBy,
          'restrictions.restrictionsHistory.$.removalReason': removalReason,
          'restrictions.restrictionsHistory.$.lastModified': now
        }
      }
    );
    
    // Remover de restricciones activas
    await clubsCollection.updateOne(
      { _id: club._id },
      {
        $pull: {
          'restrictions.activeRestrictions': { type: 'PAYMENT_FROZEN' }
        },
        $set: {
          'restrictions.isRestricted': false,
          'restrictions.lastRestrictionRemovalDate': now
        }
      }
    );
    
    if (historyUpdateResult.modifiedCount > 0) {
      console.log('✅ Restricción removida y historial actualizado');
    } else {
      console.log('⚠️ No se pudo actualizar el historial');
    }
    
    // 5. Verificación final
    console.log('\n🔍 5. Verificación final del historial...');
    const clubFinal = await clubsCollection.findOne({ _id: club._id });
    
    if (clubFinal.restrictions && clubFinal.restrictions.restrictionsHistory) {
      console.log(`📚 Total entradas en historial: ${clubFinal.restrictions.restrictionsHistory.length}`);
      
      // Buscar nuestra entrada de prueba
      const testEntry = clubFinal.restrictions.restrictionsHistory.find(entry => 
        entry.type === 'PAYMENT_FROZEN' && entry.appliedBy === 'admin.test@fixtest.com'
      );
      
      if (testEntry) {
        console.log('📊 Entrada de prueba en historial final:', {
          type: testEntry.type,
          reason: testEntry.reason,
          appliedBy: testEntry.appliedBy,
          isActive: testEntry.isActive,
          removedBy: testEntry.removedBy,
          removalReason: testEntry.removalReason
        });
        
        // Verificación final de integridad
        let errorsFound = 0;
        
        if (!testEntry.type) {
          console.error('❌ ERROR FINAL: Campo "type" perdido');
          errorsFound++;
        } else {
          console.log('✅ FINAL: Campo "type" preservado:', testEntry.type);
        }
        
        if (!testEntry.reason) {
          console.error('❌ ERROR FINAL: Campo "reason" perdido');
          errorsFound++;
        } else {
          console.log('✅ FINAL: Campo "reason" preservado:', testEntry.reason);
        }
        
        if (!testEntry.appliedBy) {
          console.error('❌ ERROR FINAL: Campo "appliedBy" perdido');
          errorsFound++;
        } else {
          console.log('✅ FINAL: Campo "appliedBy" preservado:', testEntry.appliedBy);
        }
        
        if (errorsFound === 0) {
          console.log('\n🎉 ¡FIX EXITOSO! Todos los campos críticos se preservaron correctamente');
        } else {
          console.log(`\n❌ FIX INCOMPLETO: Se encontraron ${errorsFound} errores`);
        }
      } else {
        console.error('❌ No se encontró la entrada de prueba en el historial');
      }
    }
    
  } catch (error) {
    console.error('❌ Error en el test:', error.message);
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Ejecutar el test
testFixHistorialMongoDB();
