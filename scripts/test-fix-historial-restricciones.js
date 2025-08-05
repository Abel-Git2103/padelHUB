#!/usr/bin/env node

/**
 * Script para probar el fix del problema donde se pierden type y reason en el historial
 */

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000';

async function testFixHistorialRestricciones() {
  try {
    console.log('🔧 Test Fix: Historial de Restricciones - Type y Reason');
    console.log('=====================================================');
    
    // 1. Obtener un club para las pruebas
    console.log('\n📋 1. Obteniendo club para las pruebas...');
    const clubsResponse = await fetch(`${baseUrl}/clubs`);
    const clubsData = await clubsResponse.json();
    
    if (!clubsData.data || clubsData.data.length === 0) {
      console.log('❌ No hay clubes disponibles para probar');
      return;
    }
    
    const testClub = clubsData.data[0];
    console.log(`Usando club: ${testClub.name} (ID: ${testClub._id})`);
    
    // 2. Aplicar una restricción nueva
    console.log('\n➕ 2. Aplicando restricción nueva...');
    const restrictionData = {
      type: 'PAYMENT_FROZEN',
      reason: 'Test fix - Pago pendiente por servicios',
      appliedBy: 'admin.test@padelhub.com'
    };
    
    const applyResponse = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restrictionData)
    });
    
    if (!applyResponse.ok) {
      const error = await applyResponse.text();
      console.error('❌ Error al aplicar restricción:', error);
      return;
    }
    
    const appliedRestriction = await applyResponse.json();
    console.log('✅ Restricción aplicada exitosamente');
    
    // 3. Verificar que se guardó correctamente en el historial
    console.log('\n🔍 3. Verificando historial después de aplicar...');
    const historyResponse = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions/history`);
    const historyData = await historyResponse.json();
    
    if (historyData.history && historyData.history.length > 0) {
      const lastHistoryEntry = historyData.history[historyData.history.length - 1];
      console.log('📊 Última entrada del historial:', {
        type: lastHistoryEntry.type,
        reason: lastHistoryEntry.reason,
        appliedBy: lastHistoryEntry.appliedBy,
        isActive: lastHistoryEntry.isActive
      });
      
      // Verificar que los campos críticos están presentes
      if (!lastHistoryEntry.type) {
        console.error('❌ ERROR: Falta campo "type" en el historial');
      } else {
        console.log('✅ Campo "type" presente:', lastHistoryEntry.type);
      }
      
      if (!lastHistoryEntry.reason) {
        console.error('❌ ERROR: Falta campo "reason" en el historial');
      } else {
        console.log('✅ Campo "reason" presente:', lastHistoryEntry.reason);
      }
      
      if (!lastHistoryEntry.appliedBy) {
        console.error('❌ ERROR: Falta campo "appliedBy" en el historial');
      } else {
        console.log('✅ Campo "appliedBy" presente:', lastHistoryEntry.appliedBy);
      }
    } else {
      console.error('❌ No se encontró historial');
    }
    
    // 4. Remover la restricción
    console.log('\n🗑️ 4. Removiendo restricción...');
    const removeResponse = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions/PAYMENT_FROZEN`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!removeResponse.ok) {
      const error = await removeResponse.text();
      console.error('❌ Error al remover restricción:', error);
      return;
    }
    
    console.log('✅ Restricción removida exitosamente');
    
    // 5. Verificar historial después de remover
    console.log('\n🔍 5. Verificando historial después de remover...');
    const finalHistoryResponse = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions/history`);
    const finalHistoryData = await finalHistoryResponse.json();
    
    if (finalHistoryData.history && finalHistoryData.history.length > 0) {
      console.log(`📚 Total entradas en historial: ${finalHistoryData.history.length}`);
      
      // Buscar la entrada que removimos
      const removedEntry = finalHistoryData.history.find(entry => 
        entry.type === 'PAYMENT_FROZEN' && entry.isActive === false
      );
      
      if (removedEntry) {
        console.log('📊 Entrada removida en historial:', {
          type: removedEntry.type,
          reason: removedEntry.reason,
          appliedBy: removedEntry.appliedBy,
          isActive: removedEntry.isActive,
          removedBy: removedEntry.removedBy,
          removalReason: removedEntry.removalReason
        });
        
        // Verificar que los campos críticos siguen presentes después de remover
        if (!removedEntry.type) {
          console.error('❌ ERROR: Se perdió el campo "type" después de remover');
        } else {
          console.log('✅ Campo "type" preservado después de remover:', removedEntry.type);
        }
        
        if (!removedEntry.reason) {
          console.error('❌ ERROR: Se perdió el campo "reason" después de remover');
        } else {
          console.log('✅ Campo "reason" preservado después de remover:', removedEntry.reason);
        }
        
        if (!removedEntry.appliedBy) {
          console.error('❌ ERROR: Se perdió el campo "appliedBy" después de remover');
        } else {
          console.log('✅ Campo "appliedBy" preservado después de remover:', removedEntry.appliedBy);
        }
      } else {
        console.error('❌ No se encontró la entrada removida en el historial');
      }
    }
    
    console.log('\n🎯 Test completado - Verificar logs arriba para problemas');
    
  } catch (error) {
    console.error('❌ Error en el test:', error.message);
  }
}

// Ejecutar el test
testFixHistorialRestricciones();
