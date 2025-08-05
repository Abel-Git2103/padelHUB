#!/usr/bin/env node

/**
 * Script para probar los endpoints de la API de restricciones
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const CLUB_ID = '68914cd24fa9395bf67f5675'; // ID del Club Pádel Elite Madrid

async function testRestrictionsAPI() {
  try {
    console.log('🔧 Test de API de Restricciones');
    console.log('==============================');
    
    // 1. Obtener restricciones actuales
    console.log('\n📋 1. Obteniendo restricciones actuales...');
    try {
      const restrictionsResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`);
      console.log('✅ Restricciones obtenidas:');
      console.log(JSON.stringify(restrictionsResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al obtener restricciones:', error.response?.data || error.message);
    }
    
    // 2. Eliminar restricción usando la API
    console.log('\n🗑️ 2. Eliminando restricción PAYMENT_DELAY usando la API...');
    try {
      const deleteResponse = await axios.delete(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions/PAYMENT_DELAY`);
      console.log('✅ Restricción eliminada exitosamente:');
      console.log(JSON.stringify(deleteResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al eliminar restricción:', error.response?.data || error.message);
    }
    
    // 3. Verificar que se eliminó
    console.log('\n🔍 3. Verificando que la restricción se eliminó...');
    try {
      const verificacionResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`);
      console.log('✅ Estado después de eliminar:');
      console.log(JSON.stringify(verificacionResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al verificar restricciones:', error.response?.data || error.message);
    }
    
    // 4. Crear una nueva restricción usando la API
    console.log('\n➕ 4. Creando nueva restricción usando la API...');
    const newRestriction = {
      type: 'SYSTEM_MAINTENANCE',
      reason: 'Mantenimiento programado del sistema',
      appliedBy: 'api-test-script',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 días
    };
    
    try {
      const createResponse = await axios.post(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`, newRestriction);
      console.log('✅ Nueva restricción creada exitosamente:');
      console.log(JSON.stringify(createResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al crear restricción:', error.response?.data || error.message);
    }
    
    // 5. Verificar la nueva restricción
    console.log('\n🔍 5. Verificando la nueva restricción...');
    try {
      const finalResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`);
      console.log('✅ Estado final:');
      console.log(JSON.stringify(finalResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al verificar restricciones finales:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('❌ Error general en el test:', error.message);
  }
}

// Función para verificar si el servidor está corriendo
async function checkServerStatus() {
  try {
    const response = await axios.get(`${API_BASE_URL}/clubs`);
    console.log('✅ Servidor backend está funcionando');
    return true;
  } catch (error) {
    console.log('❌ El servidor backend no está funcionando.');
    console.log('   Asegúrate de que el backend esté corriendo en http://localhost:3000');
    return false;
  }
}

async function main() {
  console.log('🔧 Test de Endpoints de Restricciones');
  console.log('=====================================');
  
  // Verificar que el servidor esté corriendo
  const serverRunning = await checkServerStatus();
  if (!serverRunning) {
    console.log('\n💡 Para ejecutar el backend:');
    console.log('   cd backend');
    console.log('   npm run start:dev');
    return;
  }
  
  await testRestrictionsAPI();
}

main().catch(console.error);
