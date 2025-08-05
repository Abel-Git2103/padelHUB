#!/usr/bin/env node

/**
 * Script para probar específicamente la eliminación de restricciones
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'padelhub';

async function testEliminarRestricciones() {
  let client;
  
  try {
    console.log('🔧 Test de Eliminación de Restricciones');
    console.log('======================================');
    
    console.log('🔍 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // 1. Buscar un club para probar
    const club = await clubsCollection.findOne({ status: 'ACTIVO' });
    if (!club) {
      console.log('❌ No hay clubes activos para probar');
      return;
    }
    
    console.log(`\n📋 Club seleccionado: ${club.name} (ID: ${club._id})`);
    
    // 2. Aplicar una restricción de prueba
    console.log('\n➕ Aplicando restricción de prueba...');
    
    const restrictionData = {
      type: 'no_tournaments',
      reason: 'Prueba de eliminación',
      appliedDate: new Date(),
      appliedBy: 'test-admin',
      isActive: true,
      lastModified: new Date()
    };
    
    await clubsCollection.updateOne(
      { _id: club._id },
      {
        $set: {
          'restrictions.isRestricted': true,
          'restrictions.restrictionsSummary': ['no_tournaments'],
          'restrictions.totalRestrictionsApplied': 1,
          'restrictions.lastRestrictionDate': new Date()
        },
        $push: {
          'restrictions.activeRestrictions': restrictionData,
          'restrictions.restrictionsHistory': restrictionData
        }
      }
    );
    
    console.log('✅ Restricción aplicada');
    
    // 3. Verificar estado con restricción
    const clubWithRestriction = await clubsCollection.findOne({ _id: club._id });
    console.log('\n📊 Estado con restricción:');
    console.log(`- Restringido: ${clubWithRestriction.restrictions?.isRestricted}`);
    console.log(`- Restricciones activas: ${clubWithRestriction.restrictions?.activeRestrictions?.length || 0}`);
    console.log(`- Historial: ${clubWithRestriction.restrictions?.restrictionsHistory?.length || 0}`);
    
    // 4. Simular eliminación como lo haría el backend
    console.log('\n🗑️ Eliminando restricción (simulando backend)...');
    
    const now = new Date();
    const updatedRestriction = {
      ...restrictionData,
      isActive: false,
      removedDate: now,
      removedBy: 'test-admin',
      removalReason: 'Prueba de eliminación completada',
      lastModified: now
    };
    
    // Primero actualizar el historial
    await clubsCollection.updateOne(
      { 
        _id: club._id,
        'restrictions.restrictionsHistory.type': 'no_tournaments'
      },
      {
        $set: {
          'restrictions.restrictionsHistory.$': updatedRestriction
        }
      }
    );
    
    // Luego remover de activas y actualizar estado
    await clubsCollection.updateOne(
      { _id: club._id },
      {
        $pull: {
          'restrictions.activeRestrictions': { type: 'no_tournaments' }
        },
        $set: {
          'restrictions.isRestricted': false,
          'restrictions.restrictionsSummary': [],
          'restrictions.lastRestrictionRemovalDate': now
        }
      }
    );
    
    console.log('✅ Restricción eliminada');
    
    // 5. Verificar estado final
    const finalClub = await clubsCollection.findOne({ _id: club._id });
    console.log('\n📊 Estado final:');
    console.log(`- Restringido: ${finalClub.restrictions?.isRestricted}`);
    console.log(`- Restricciones activas: ${finalClub.restrictions?.activeRestrictions?.length || 0}`);
    console.log(`- Historial: ${finalClub.restrictions?.restrictionsHistory?.length || 0}`);
    
    if (finalClub.restrictions?.restrictionsHistory?.length > 0) {
      const historicalRestriction = finalClub.restrictions.restrictionsHistory[0];
      console.log('\n🔍 Detalle del historial:');
      console.log(`- Tipo: ${historicalRestriction.type}`);
      console.log(`- Estado: ${historicalRestriction.isActive ? 'ACTIVA' : 'REMOVIDA'}`);
      console.log(`- Aplicada: ${historicalRestriction.appliedDate}`);
      if (!historicalRestriction.isActive) {
        console.log(`- Removida: ${historicalRestriction.removedDate}`);
        console.log(`- Removida por: ${historicalRestriction.removedBy}`);
        console.log(`- Razón: ${historicalRestriction.removalReason}`);
      }
    }
    
    console.log('\n✅ Test de eliminación completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en el test:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

testEliminarRestricciones().catch(console.error);
