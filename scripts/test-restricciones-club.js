#!/usr/bin/env node

/**
 * Script para verificar que las restricciones de clubes funcionan correctamente
 * y se almacenan en la base de datos
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'padelhub';

async function testRestricciones() {
  let client;
  
  try {
    console.log('🔍 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // Buscar clubes con restricciones
    console.log('\n📋 Verificando clubes con restricciones...');
    
    const clubsWithRestrictions = await clubsCollection.find({
      'restrictions.isRestricted': true
    }).toArray();
    
    console.log(`Clubes con restricciones encontrados: ${clubsWithRestrictions.length}`);
    
    if (clubsWithRestrictions.length > 0) {
      console.log('\n🔍 Detalles de restricciones:');
      clubsWithRestrictions.forEach((club, index) => {
        console.log(`\n--- Club ${index + 1}: ${club.name} ---`);
        console.log(`ID: ${club._id}`);
        console.log(`Estado restringido: ${club.restrictions.isRestricted}`);
        console.log(`Número de restricciones activas: ${club.restrictions.activeRestrictions?.length || 0}`);
        
        if (club.restrictions.activeRestrictions && club.restrictions.activeRestrictions.length > 0) {
          club.restrictions.activeRestrictions.forEach((restriction, rIndex) => {
            console.log(`  Restricción ${rIndex + 1}:`);
            console.log(`    Tipo: ${restriction.type}`);
            console.log(`    Razón: ${restriction.reason}`);
            console.log(`    Aplicada el: ${restriction.appliedDate}`);
            console.log(`    Aplicada por: ${restriction.appliedBy}`);
            console.log(`    Activa: ${restriction.isActive}`);
            if (restriction.expiryDate) {
              console.log(`    Expira: ${restriction.expiryDate}`);
            }
          });
        }
        
        if (club.restrictions.restrictionsSummary && club.restrictions.restrictionsSummary.length > 0) {
          console.log(`Resumen de restricciones: ${club.restrictions.restrictionsSummary.join(', ')}`);
        }
      });
    }
    
    // Verificar estructura de la colección
    console.log('\n🔍 Verificando estructura de restricciones en todos los clubes...');
    
    const allClubs = await clubsCollection.find({}).toArray();
    console.log(`Total de clubes en la base de datos: ${allClubs.length}`);
    
    let clubsWithRestrictionsField = 0;
    let clubsWithoutRestrictionsField = 0;
    
    allClubs.forEach(club => {
      if (club.restrictions) {
        clubsWithRestrictionsField++;
      } else {
        clubsWithoutRestrictionsField++;
      }
    });
    
    console.log(`Clubes con campo 'restrictions': ${clubsWithRestrictionsField}`);
    console.log(`Clubes sin campo 'restrictions': ${clubsWithoutRestrictionsField}`);
    
    // Si hay clubes sin el campo restrictions, mostrar algunos ejemplos
    if (clubsWithoutRestrictionsField > 0) {
      console.log('\n⚠️  Algunos clubes no tienen el campo restrictions inicializado:');
      const clubsWithoutRestrictions = allClubs.filter(club => !club.restrictions).slice(0, 3);
      clubsWithoutRestrictions.forEach(club => {
        console.log(`- ${club.name} (ID: ${club._id})`);
      });
    }
    
    // Estadísticas de tipos de restricciones
    console.log('\n📊 Estadísticas de tipos de restricciones:');
    const restrictionTypes = {};
    
    allClubs.forEach(club => {
      if (club.restrictions && club.restrictions.activeRestrictions) {
        club.restrictions.activeRestrictions.forEach(restriction => {
          if (restriction.isActive) {
            restrictionTypes[restriction.type] = (restrictionTypes[restriction.type] || 0) + 1;
          }
        });
      }
    });
    
    if (Object.keys(restrictionTypes).length > 0) {
      Object.entries(restrictionTypes).forEach(([type, count]) => {
        console.log(`- ${type}: ${count} club(es)`);
      });
    } else {
      console.log('No hay restricciones activas en ningún club');
    }
    
    console.log('\n✅ Verificación de restricciones completada');
    
  } catch (error) {
    console.error('❌ Error al verificar restricciones:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Función para crear una restricción de prueba
async function crearRestriccionPrueba() {
  let client;
  
  try {
    console.log('\n🧪 Creando restricción de prueba...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // Buscar un club activo sin restricciones
    const club = await clubsCollection.findOne({
      status: 'ACTIVO',
      $or: [
        { 'restrictions.isRestricted': { $ne: true } },
        { 'restrictions': { $exists: false } }
      ]
    });
    
    if (!club) {
      console.log('No hay clubes disponibles para crear restricción de prueba');
      return;
    }
    
    console.log(`Aplicando restricción de prueba al club: ${club.name}`);
    
    const restrictionData = {
      type: 'PAYMENT_DELAY',
      reason: 'Prueba de funcionamiento del sistema de restricciones',
      appliedDate: new Date(),
      appliedBy: 'script-test',
      isActive: true
    };
    
    const updateResult = await clubsCollection.updateOne(
      { _id: club._id },
      {
        $set: {
          'restrictions.isRestricted': true,
          'restrictions.restrictionsSummary': ['PAYMENT_DELAY']
        },
        $push: {
          'restrictions.activeRestrictions': restrictionData
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log('✅ Restricción de prueba aplicada correctamente');
      
      // Verificar que se guardó correctamente
      const updatedClub = await clubsCollection.findOne({ _id: club._id });
      console.log('Estado después de la actualización:');
      console.log(`- Restringido: ${updatedClub.restrictions.isRestricted}`);
      console.log(`- Restricciones activas: ${updatedClub.restrictions.activeRestrictions.length}`);
      console.log(`- Resumen: ${updatedClub.restrictions.restrictionsSummary.join(', ')}`);
    } else {
      console.log('❌ No se pudo aplicar la restricción de prueba');
    }
    
  } catch (error) {
    console.error('❌ Error al crear restricción de prueba:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Función para eliminar una restricción de prueba
async function eliminarRestriccionPrueba() {
  let client;
  
  try {
    console.log('\n🗑️ Eliminando restricción de prueba...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // Buscar un club con restricciones
    const club = await clubsCollection.findOne({
      'restrictions.isRestricted': true,
      'restrictions.activeRestrictions': { $exists: true, $ne: [] }
    });
    
    if (!club) {
      console.log('No hay clubes con restricciones para eliminar');
      return;
    }
    
    console.log(`Eliminando restricción del club: ${club.name}`);
    console.log(`Restricciones activas antes: ${club.restrictions.activeRestrictions.length}`);
    
    // Obtener el primer tipo de restricción para eliminar
    const restrictionTypeToRemove = club.restrictions.activeRestrictions[0].type;
    console.log(`Eliminando restricción de tipo: ${restrictionTypeToRemove}`);
    
    // Eliminar la restricción específica
    const updateResult = await clubsCollection.updateOne(
      { _id: club._id },
      {
        $pull: {
          'restrictions.activeRestrictions': { type: restrictionTypeToRemove }
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      // Verificar el estado después de la eliminación
      const updatedClub = await clubsCollection.findOne({ _id: club._id });
      const remainingRestrictions = updatedClub.restrictions.activeRestrictions || [];
      
      console.log('✅ Restricción eliminada correctamente');
      console.log(`Restricciones restantes: ${remainingRestrictions.length}`);
      
      // Si no quedan restricciones, actualizar el estado
      if (remainingRestrictions.length === 0) {
        console.log('No quedan restricciones activas, actualizando estado del club...');
        
        await clubsCollection.updateOne(
          { _id: club._id },
          {
            $set: {
              'restrictions.isRestricted': false,
              'restrictions.restrictionsSummary': []
            }
          }
        );
        
        console.log('✅ Estado del club actualizado - ya no está restringido');
      } else {
        // Actualizar resumen de restricciones
        const newSummary = remainingRestrictions
          .filter(r => r.isActive)
          .map(r => r.type);
        
        await clubsCollection.updateOne(
          { _id: club._id },
          {
            $set: {
              'restrictions.restrictionsSummary': newSummary
            }
          }
        );
        
        console.log(`✅ Resumen actualizado: ${newSummary.join(', ')}`);
      }
      
      // Verificar estado final
      const finalClub = await clubsCollection.findOne({ _id: club._id });
      console.log('\nEstado final del club:');
      console.log(`- Restringido: ${finalClub.restrictions.isRestricted}`);
      console.log(`- Restricciones activas: ${finalClub.restrictions.activeRestrictions.length}`);
      console.log(`- Resumen: ${finalClub.restrictions.restrictionsSummary.join(', ')}`);
      
    } else {
      console.log('❌ No se pudo eliminar la restricción');
    }
    
  } catch (error) {
    console.error('❌ Error al eliminar restricción:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Ejecutar funciones
async function main() {
  console.log('🔧 Test de Sistema de Restricciones de Clubes');
  console.log('===========================================');
  
  await testRestricciones();
  
  // Preguntar si crear restricción de prueba
  if (process.argv.includes('--create-test')) {
    await crearRestriccionPrueba();
    console.log('\n🔍 Verificando después de crear restricción de prueba...');
    await testRestricciones();
  }
  
  // Preguntar si eliminar restricción de prueba
  if (process.argv.includes('--remove-test')) {
    await eliminarRestriccionPrueba();
    console.log('\n🔍 Verificando después de eliminar restricción de prueba...');
    await testRestricciones();
  }
}

main().catch(console.error);
