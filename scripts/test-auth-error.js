#!/usr/bin/env node

/**
 * Script para probar el endpoint con autenticación simulada
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const CLUB_ID = '68914cd24fa9395bf67f5675';

// Token JWT válido (necesitarías obtener uno real del login)
// Por ahora, vamos a verificar el estado del club y aplicar una restricción manualmente

async function testWithRestriction() {
  try {
    console.log('🔧 Test de eliminación con restricción existente');
    console.log('===============================================');
    
    console.log('\n1. Estado actual del club...');
    try {
      const clubResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}`);
      console.log(`Club: ${clubResponse.data.name}`);
      console.log(`Restricciones activas: ${clubResponse.data.restrictions.activeRestrictions.length}`);
      console.log(`Historial: ${clubResponse.data.restrictions.restrictionsHistory.length}`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('⚠️  Error 401: El endpoint requiere autenticación');
        console.log('   El frontend debe enviar un JWT token válido en el header Authorization');
        console.log('   Formato: Authorization: Bearer <token>');
        
        console.log('\n💡 Soluciones:');
        console.log('1. Verificar que el usuario esté logueado en el frontend');
        console.log('2. Verificar que el token JWT sea válido y no haya expirado');
        console.log('3. Verificar que el interceptor de autenticación esté funcionando');
        console.log('4. Verificar que el usuario tenga permisos (ADMIN_SISTEMA o ADMIN_CLUB)');
        
        return;
      }
      throw error;
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWithRestriction().catch(console.error);
