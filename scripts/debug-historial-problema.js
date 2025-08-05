/**
 * Script para debuggear directamente el problema de historial
 */

const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/padelClub');

// Esquema simplificado para el test
const ClubSchema = new mongoose.Schema({}, { strict: false });
const Club = mongoose.model('Club', ClubSchema, 'clubs'); // Especificar la colección

async function debugHistorialProblem() {
  try {
    console.log('🔗 Conectado a MongoDB');
    
    // Buscar cualquier club
    const club = await Club.findOne({});
    
    if (!club) {
      console.log('❌ No se encontró ningún club');
      return;
    }
    
    console.log('📍 Club encontrado:', club.name);
    
    // Si no hay restricciones, inicializar
    if (!club.restrictions) {
      club.restrictions = {
        isRestricted: false,
        activeRestrictions: [],
        restrictionsHistory: [],
        restrictionsSummary: [],
        totalRestrictionsApplied: 0
      };
    }
    
    // Agregar una restricción de prueba si no hay ninguna activa
    if (!club.restrictions.activeRestrictions || club.restrictions.activeRestrictions.length === 0) {
      console.log('🔧 Agregando restricción de prueba...');
      const testRestriction = {
        type: 'PAYMENT_DELAY',
        reason: 'Prueba para debuggear',
        appliedDate: new Date(),
        appliedBy: '68855ce9ead8bbdfd3e360ad', // ObjectId problemático
        isActive: true,
        lastModified: new Date()
      };
      
      club.restrictions.activeRestrictions.push(testRestriction);
      club.restrictions.restrictionsHistory.push({...testRestriction});
      club.restrictions.isRestricted = true;
      club.restrictions.totalRestrictionsApplied += 1;
      
      await club.save();
      console.log('✅ Restricción de prueba agregada');
    }
    
    console.log('📍 Club encontrado:', club.name);
    console.log('🔍 Restricciones activas:', club.restrictions.activeRestrictions.length);
    console.log('📜 Historial:', club.restrictions.restrictionsHistory.length);
    
    // Analizar el historial
    if (club.restrictions.restrictionsHistory) {
      console.log('\n📊 ANÁLISIS DEL HISTORIAL:');
      club.restrictions.restrictionsHistory.forEach((item, index) => {
        console.log(`\n[${index}] Entrada del historial:`);
        console.log('  ✓ type:', item.type);
        console.log('  ✓ reason:', item.reason);
        console.log('  ✓ appliedBy:', item.appliedBy, '(tipo:', typeof item.appliedBy, ')');
        console.log('  ✓ appliedDate:', item.appliedDate);
        console.log('  ✓ isActive:', item.isActive, '(tipo:', typeof item.isActive, ')');
        console.log('  ✓ lastModified:', item.lastModified);
        
        // Verificar si appliedBy es un ObjectId
        const isObjectId = item.appliedBy && item.appliedBy.toString().match(/^[0-9a-fA-F]{24}$/);
        console.log('  🔍 Es ObjectId:', isObjectId);
        
        // Campos faltantes
        const missingFields = [];
        if (!item.type) missingFields.push('type');
        if (!item.reason) missingFields.push('reason');
        if (!item.appliedBy) missingFields.push('appliedBy');
        if (!item.appliedDate) missingFields.push('appliedDate');
        if (item.isActive === undefined || item.isActive === null) missingFields.push('isActive');
        
        if (missingFields.length > 0) {
          console.log('  ❌ Campos faltantes:', missingFields);
        } else {
          console.log('  ✅ Todos los campos presentes');
        }
      });
    }
    
    // Analizar restricciones activas
    if (club.restrictions.activeRestrictions) {
      console.log('\n🎯 RESTRICCIONES ACTIVAS:');
      club.restrictions.activeRestrictions.forEach((item, index) => {
        console.log(`\n[${index}] Restricción activa:`);
        console.log('  ✓ type:', item.type);
        console.log('  ✓ reason:', item.reason);
        console.log('  ✓ appliedBy:', item.appliedBy, '(tipo:', typeof item.appliedBy, ')');
        console.log('  ✓ appliedDate:', item.appliedDate);
        console.log('  ✓ isActive:', item.isActive, '(tipo:', typeof item.isActive, ')');
        
        // Verificar si appliedBy es un ObjectId
        const isObjectId = item.appliedBy && item.appliedBy.toString().match(/^[0-9a-fA-F]{24}$/);
        console.log('  🔍 Es ObjectId:', isObjectId);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

debugHistorialProblem();
