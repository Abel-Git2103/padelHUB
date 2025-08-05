#!/usr/bin/env node

/**
 * Script para reproducir exactamente cómo el frontend envía datos al backend
 */

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000/api';

async function testFrontendFlow() {
  try {
    console.log('🔧 Test: Simulando flujo del Frontend');
    console.log('=====================================');
    
    // 1. Obtener un club
    console.log('\n📋 1. Obteniendo club...');
    const clubsResponse = await fetch(`${baseUrl}/clubs`);
    const clubsData = await clubsResponse.json();
    
    if (!clubsData.clubs || clubsData.clubs.length === 0) {
      console.log('❌ No hay clubes disponibles');
      return;
    }
    
    const testClub = clubsData.clubs[0];
    console.log(`Usando club: ${testClub.name} (ID: ${testClub._id})`);
    
    // 2. Simular datos como los envía el frontend
    console.log('\n➕ 2. Simulando aplicación de restricción desde frontend...');
    
    // Datos que típicamente enviaría el frontend
    const frontendData = {
      type: 'PAYMENT_FROZEN',  // RestrictionType del frontend
      reason: 'Pago pendiente desde frontend',  // Texto ingresado por el usuario
      appliedBy: '507f1f77bcf86cd799439011'  // ObjectId del usuario (como lo envía el frontend)
    };
    
    console.log('📤 Datos enviados (simulando frontend):', frontendData);
    
    const response = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(frontendData)
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error del backend:', response.status, error);
      return;
    }
    
    const result = await response.json();
    console.log('✅ Restricción aplicada desde backend');
    
    // 3. Verificar el historial
    console.log('\n🔍 3. Verificando historial...');
    const historyResponse = await fetch(`${baseUrl}/clubs/${testClub._id}/restrictions/history`);
    const historyData = await historyResponse.json();
    
    if (historyData.history && historyData.history.length > 0) {
      const lastEntry = historyData.history[historyData.history.length - 1];
      
      console.log('📊 Última entrada del historial:', {
        type: lastEntry.type,
        reason: lastEntry.reason,
        appliedBy: lastEntry.appliedBy,
        isActive: lastEntry.isActive
      });
      
      // Verificar si aparecen los valores por defecto problemáticos
      if (lastEntry.type === 'maintenance' && 
          lastEntry.reason === 'Sin razón especificada' && 
          lastEntry.appliedBy === 'admin.sistema@test.com') {
        console.error('❌ PROBLEMA DETECTADO: Se guardaron valores por defecto');
        console.error('   - Se esperaba type: "PAYMENT_FROZEN"');
        console.error('   - Se esperaba reason: "Pago pendiente desde frontend"');
        console.error('   - Se esperaba appliedBy: email del usuario o el ObjectId convertido');
      } else {
        console.log('✅ Los datos se guardaron correctamente');
      }
    } else {
      console.error('❌ No se encontró historial');
    }
    
  } catch (error) {
    console.error('❌ Error en el test:', error.message);
  }
}

// Ejecutar el test
testFrontendFlow();
