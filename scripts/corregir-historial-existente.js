#!/usr/bin/env node

/**
 * Script para corregir entradas de historial existentes que tengan campos faltantes
 * y limpiar restricciones de prueba
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'padelhub';

async function corregirHistorialExistente() {
  let client;
  
  try {
    console.log('🔧 Corrección de Historial Existente');
    console.log('====================================');
    
    console.log('🔍 Conectando a MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DB_NAME);
    const clubsCollection = db.collection('clubs');
    
    // 1. Buscar clubes con historial de restricciones
    console.log('\n📋 1. Buscando clubes con historial de restricciones...');
    const clubsWithRestrictions = await clubsCollection.find({
      'restrictions.restrictionsHistory': { $exists: true, $ne: [] }
    }).toArray();
    
    console.log(`Encontrados ${clubsWithRestrictions.length} clubes con historial`);
    
    let totalFixed = 0;
    let totalEntries = 0;
    
    // 2. Procesar cada club
    for (const club of clubsWithRestrictions) {
      console.log(`\n🏢 Procesando club: ${club.name}`);
      
      if (!club.restrictions || !club.restrictions.restrictionsHistory) {
        continue;
      }
      
      let clubFixed = false;
      const history = club.restrictions.restrictionsHistory;
      
      for (let i = 0; i < history.length; i++) {
        const entry = history[i];
        totalEntries++;
        let entryFixed = false;
        
        console.log(`  📄 Entrada ${i + 1}:`, {
          type: entry.type,
          reason: entry.reason,
          appliedBy: entry.appliedBy,
          isActive: entry.isActive
        });
        
        // Corregir type faltante
        if (!entry.type || entry.type === undefined || entry.type === null) {
          console.log(`    ⚠️ Corrigiendo type faltante`);
          entry.type = 'MAINTENANCE';
          entryFixed = true;
        }
        
        // Corregir reason faltante
        if (!entry.reason || entry.reason === undefined || entry.reason === null || entry.reason === '') {
          console.log(`    ⚠️ Corrigiendo reason faltante`);
          entry.reason = 'Restricción histórica - motivo no especificado';
          entryFixed = true;
        }
        
        // Corregir appliedBy faltante
        if (!entry.appliedBy || entry.appliedBy === undefined || entry.appliedBy === null || entry.appliedBy === '') {
          console.log(`    ⚠️ Corrigiendo appliedBy faltante`);
          entry.appliedBy = 'admin.sistema@historico.com';
          entryFixed = true;
        }
        
        // Corregir appliedDate faltante
        if (!entry.appliedDate) {
          console.log(`    ⚠️ Corrigiendo appliedDate faltante`);
          entry.appliedDate = new Date('2025-01-01');
          entryFixed = true;
        }
        
        // Corregir lastModified faltante
        if (!entry.lastModified) {
          console.log(`    ⚠️ Corrigiendo lastModified faltante`);
          entry.lastModified = new Date();
          entryFixed = true;
        }
        
        // Corregir isActive si está undefined
        if (entry.isActive === undefined || entry.isActive === null) {
          console.log(`    ⚠️ Corrigiendo isActive faltante`);
          entry.isActive = false;
          entryFixed = true;
        }
        
        if (entryFixed) {
          totalFixed++;
          clubFixed = true;
          console.log(`    ✅ Entrada ${i + 1} corregida`);
        } else {
          console.log(`    ✅ Entrada ${i + 1} ya está correcta`);
        }
      }
      
      // Actualizar el club si se hicieron correcciones
      if (clubFixed) {
        const updateResult = await clubsCollection.updateOne(
          { _id: club._id },
          { $set: { 'restrictions.restrictionsHistory': history } }
        );
        
        if (updateResult.modifiedCount > 0) {
          console.log(`  💾 Club ${club.name} actualizado exitosamente`);
        } else {
          console.log(`  ⚠️ No se pudo actualizar el club ${club.name}`);
        }
      }
    }
    
    console.log(`\n📊 Resumen de correcciones:`);
    console.log(`- Total entradas procesadas: ${totalEntries}`);
    console.log(`- Total entradas corregidas: ${totalFixed}`);
    console.log(`- Clubs procesados: ${clubsWithRestrictions.length}`);
    
    // 3. Limpiar restricciones de prueba (opcional)
    console.log('\n🧹 3. ¿Limpiar restricciones de prueba?');
    const testEntries = await clubsCollection.find({
      $or: [
        { 'restrictions.restrictionsHistory.appliedBy': 'admin-test' },
        { 'restrictions.restrictionsHistory.appliedBy': 'admin.test@fixtest.com' },
        { 'restrictions.restrictionsHistory.reason': { $regex: /test|prueba/i } }
      ]
    }).toArray();
    
    console.log(`Encontradas ${testEntries.length} entradas de prueba para limpiar`);
    
    if (testEntries.length > 0 && process.argv.includes('--clean-test')) {
      console.log('🧹 Limpiando restricciones de prueba...');
      
      for (const club of testEntries) {
        const originalHistory = club.restrictions?.restrictionsHistory || [];
        const cleanedHistory = originalHistory.filter(entry => 
          !entry.appliedBy?.includes('test') && 
          !entry.reason?.toLowerCase().includes('test') &&
          !entry.reason?.toLowerCase().includes('prueba')
        );
        
        if (cleanedHistory.length !== originalHistory.length) {
          await clubsCollection.updateOne(
            { _id: club._id },
            { $set: { 'restrictions.restrictionsHistory': cleanedHistory } }
          );
          console.log(`  🧹 Limpiado historial del club: ${club.name}`);
        }
      }
    } else if (testEntries.length > 0) {
      console.log('💡 Para limpiar restricciones de prueba, ejecuta:');
      console.log('node scripts/corregir-historial-existente.js --clean-test');
    }
    
    console.log('\n✅ Proceso de corrección completado');
    
  } catch (error) {
    console.error('❌ Error en la corrección:', error.message);
    console.error(error.stack);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Ejecutar la corrección
corregirHistorialExistente();
