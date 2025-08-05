#!/usr/bin/env node

/**
 * Script para probar los endpoints de la API de restricciones con autenticación
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const CLUB_ID = '68914cd24fa9395bf67f5675'; // ID del Club Pádel Elite Madrid

async function testRestrictionsAPIWithAuth() {
  try {
    console.log('🔧 Test de API de Restricciones con Autenticación');
    console.log('=================================================');
    
    // 1. Login para obtener token
    console.log('\n🔐 1. Obteniendo token de autenticación...');
    let token;
    try {
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'admin.sistema@test.com',
        password: 'admin123'
      });
      
      token = loginResponse.data.access_token;
      console.log('✅ Token obtenido exitosamente');
      console.log('Token:', token.substring(0, 50) + '...');
    } catch (error) {
      console.log('❌ Error al hacer login:', error.response?.data || error.message);
      return;
    }
    
    // Configurar headers de autorización
    const authHeaders = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // 2. Obtener restricciones actuales
    console.log('\n📋 2. Obteniendo restricciones actuales...');
    try {
      const restrictionsResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`, {
        headers: authHeaders
      });
      console.log('✅ Restricciones obtenidas:');
      console.log(JSON.stringify(restrictionsResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al obtener restricciones:', error.response?.data || error.message);
    }
    
    // 3. Crear una restricción de prueba primero
    console.log('\n➕ 3. Creando restricción de prueba...');
    const newRestriction = {
      type: 'PAYMENT_DELAY',
      reason: 'Test de eliminación de restricción',
      appliedBy: 'api-test-script',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    try {
      const createResponse = await axios.post(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`, newRestriction, {
        headers: authHeaders
      });
      console.log('✅ Restricción de prueba creada exitosamente');
      console.log(JSON.stringify(createResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al crear restricción:', error.response?.data || error.message);
    }
    
    // 4. Eliminar restricción usando la API (con cuerpo de petición)
    console.log('\n🗑️ 4. Eliminando restricción PAYMENT_DELAY usando la API...');
    try {
      const deleteData = {
        removedBy: 'admin.sistema@test.com',
        removalReason: 'Test de eliminación desde API'
      };
      
      const deleteResponse = await axios.delete(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions/PAYMENT_DELAY`, {
        headers: authHeaders,
        data: deleteData
      });
      console.log('✅ Restricción eliminada exitosamente:');
      console.log(JSON.stringify(deleteResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al eliminar restricción:', error.response?.data || error.message);
      console.log('Detalles del error:', error.response?.status, error.response?.statusText);
    }
    
    // 5. Verificar que se movió al historial
    console.log('\n🔍 5. Verificando estado final y historial...');
    try {
      const verificacionResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions`, {
        headers: authHeaders
      });
      console.log('✅ Estado después de eliminar:');
      console.log(JSON.stringify(verificacionResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al verificar restricciones:', error.response?.data || error.message);
    }
    
    // 6. Obtener historial de restricciones
    console.log('\n📜 6. Obteniendo historial de restricciones...');
    try {
      const historyResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}/restrictions/history`, {
        headers: authHeaders
      });
      console.log('✅ Historial obtenido:');
      console.log(JSON.stringify(historyResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Error al obtener historial:', error.response?.data || error.message);
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
  console.log('🔧 Test de Endpoints de Restricciones con Autenticación');
  console.log('======================================================');
  
  // Verificar que el servidor esté corriendo
  const serverRunning = await checkServerStatus();
  if (!serverRunning) {
    console.log('\n💡 Para ejecutar el backend:');
    console.log('   cd backend');
    console.log('   npm run start:dev');
    return;
  }
  
  await testRestrictionsAPIWithAuth();
}

main().catch(console.error);
