#!/usr/bin/env node

/**
 * Script para probar el nuevo sistema de restricciones con historial completo
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'padelhub';

async function testRestriccionesConHistorial() {
  let client;
  
  try {
    console.log('🔧 Test del Sistema de Restricciones con Historial');
    console.log('================================================');
    
    console.log('🔍 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // 1. Verificar estado inicial
    console.log('\n📋 1. Estado inicial del sistema...');
    const allClubs = await clubsCollection.find({}).toArray();
    console.log(`Total de clubes: ${allClubs.length}`);
    
    // 2. Crear restricción de prueba con historial
    console.log('\n➕ 2. Creando restricción con sistema de historial...');
    
    const club = await clubsCollection.findOne({ status: 'ACTIVO' });
    if (!club) {
      console.log('❌ No hay clubes activos para probar');
      return;
    }
    
    console.log(`Aplicando restricción al club: ${club.name}`);
    
    const restrictionData = {
      type: 'PAYMENT_DELAY',
      reason: 'Prueba del nuevo sistema de historial',
      appliedDate: new Date(),
      appliedBy: 'admin-test',
      isActive: true,
      lastModified: new Date()
    };
    
    // Inicializar el nuevo sistema de restricciones
    const updateResult = await clubsCollection.updateOne(
      { _id: club._id },
      {
        $set: {
          'restrictions.isRestricted': true,
          'restrictions.restrictionsSummary': ['PAYMENT_DELAY'],
          'restrictions.totalRestrictionsApplied': 1,
          'restrictions.lastRestrictionDate': new Date()
        },
        $push: {
          'restrictions.activeRestrictions': restrictionData,
          'restrictions.restrictionsHistory': restrictionData
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log('✅ Restricción aplicada con nuevo sistema');
    }
    
    // 3. Verificar que se guardó correctamente
    console.log('\n🔍 3. Verificando estado después de aplicar restricción...');
    const updatedClub = await clubsCollection.findOne({ _id: club._id });
    
    console.log(`- Restringido: ${updatedClub.restrictions.isRestricted}`);
    console.log(`- Restricciones activas: ${updatedClub.restrictions.activeRestrictions?.length || 0}`);
    console.log(`- Historial total: ${updatedClub.restrictions.restrictionsHistory?.length || 0}`);
    console.log(`- Total aplicadas: ${updatedClub.restrictions.totalRestrictionsApplied || 0}`);
    
    // 4. Agregar una segunda restricción
    console.log('\n➕ 4. Agregando segunda restricción...');
    
    const secondRestriction = {
      type: 'SYSTEM_MAINTENANCE',
      reason: 'Mantenimiento programado',
      appliedDate: new Date(),
      appliedBy: 'admin-test',
      isActive: true,
      lastModified: new Date()
    };
    
    await clubsCollection.updateOne(
      { _id: club._id },
      {
        $set: {
          'restrictions.restrictionsSummary': ['PAYMENT_DELAY', 'SYSTEM_MAINTENANCE'],
          'restrictions.totalRestrictionsApplied': 2,
          'restrictions.lastRestrictionDate': new Date()
        },
        $push: {
          'restrictions.activeRestrictions': secondRestriction,
          'restrictions.restrictionsHistory': secondRestriction
        }
      }
    );
    
    console.log('✅ Segunda restricción agregada');
    
    // 5. "Remover" primera restricción (marcar como inactiva)
    console.log('\n🗑️ 5. Removiendo primera restricción (manteniendo historial)...');
    
    const now = new Date();
    
    // Actualizar en activeRestrictions
    await clubsCollection.updateOne(
      { _id: club._id },
      {
        $pull: {
          'restrictions.activeRestrictions': { type: 'PAYMENT_DELAY' }
        }
      }
    );
    
    // Actualizar en el historial
    await clubsCollection.updateOne(
      { 
        _id: club._id,
        'restrictions.restrictionsHistory.type': 'PAYMENT_DELAY'
      },
      {
        $set: {
          'restrictions.restrictionsHistory.$.isActive': false,
          'restrictions.restrictionsHistory.$.removedDate': now,
          'restrictions.restrictionsHistory.$.removedBy': 'admin-test',
          'restrictions.restrictionsHistory.$.removalReason': 'Restricción resuelta - pago completado',
          'restrictions.restrictionsHistory.$.lastModified': now,
          'restrictions.restrictionsSummary': ['SYSTEM_MAINTENANCE'],
          'restrictions.lastRestrictionRemovalDate': now
        }
      }
    );
    
    console.log('✅ Primera restricción removida (historial mantenido)');
    
    // 6. Verificar estado final
    console.log('\n🔍 6. Estado final del sistema...');
    const finalClub = await clubsCollection.findOne({ _id: club._id });
    
    console.log('\n📊 Resumen final:');
    console.log(`- Club restringido: ${finalClub.restrictions.isRestricted}`);
    console.log(`- Restricciones activas: ${finalClub.restrictions.activeRestrictions?.length || 0}`);
    console.log(`- Historial total: ${finalClub.restrictions.restrictionsHistory?.length || 0}`);
    console.log(`- Total aplicadas históricamente: ${finalClub.restrictions.totalRestrictionsApplied || 0}`);
    console.log(`- Última restricción: ${finalClub.restrictions.lastRestrictionDate}`);
    console.log(`- Última remoción: ${finalClub.restrictions.lastRestrictionRemovalDate}`);
    
    console.log('\n🔍 Detalles del historial:');
    if (finalClub.restrictions.restrictionsHistory) {
      finalClub.restrictions.restrictionsHistory.forEach((restriction, index) => {
        console.log(`\n--- Restricción ${index + 1} ---`);
        console.log(`Tipo: ${restriction.type}`);
        console.log(`Razón: ${restriction.reason}`);
        console.log(`Aplicada: ${restriction.appliedDate}`);
        console.log(`Aplicada por: ${restriction.appliedBy}`);
        console.log(`Estado: ${restriction.isActive ? 'ACTIVA' : 'REMOVIDA'}`);
        if (!restriction.isActive) {
          console.log(`Removida: ${restriction.removedDate}`);
          console.log(`Removida por: ${restriction.removedBy}`);
          console.log(`Razón remoción: ${restriction.removalReason}`);
        }
      });
    }
    
    console.log('\n✅ Test del sistema de historial completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en el test:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function limpiarRestricciones() {
  let client;
  
  try {
    console.log('\n🧹 Limpiando restricciones de prueba...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // Limpiar todas las restricciones de prueba
    const result = await clubsCollection.updateMany(
      {},
      {
        $unset: { 'restrictions': '' }
      }
    );
    
    console.log(`✅ Restricciones limpiadas de ${result.modifiedCount} clubes`);
    
  } catch (error) {
    console.error('❌ Error al limpiar restricciones:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function main() {
  if (process.argv.includes('--clean')) {
    await limpiarRestricciones();
    return;
  }
  
  await testRestriccionesConHistorial();
  
  console.log('\n💡 Para limpiar las restricciones de prueba:');
  console.log('node test-historial-restricciones.js --clean');
}

main().catch(console.error);
