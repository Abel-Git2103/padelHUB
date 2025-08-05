#!/usr/bin/env node

/**
 * Script para reproducir exactamente el error del frontend
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const CLUB_ID = '68914cd24fa9395bf67f5675';

async function testErrorCondition() {
  try {
    console.log('🔧 Reproduciendo error del frontend');
    console.log('===================================');
    
    // 1. Verificar que el servidor esté corriendo
    console.log('\n1. Verificando servidor...');
    try {
      const healthCheck = await axios.get(`${API_BASE_URL}/clubs`);
      console.log('✅ Servidor backend funcionando');
    } catch (error) {
      console.log('❌ Servidor backend no responde');
      return;
    }
    
    // 2. Obtener información del club
    console.log('\n2. Obteniendo información del club...');
    try {
      const clubResponse = await axios.get(`${API_BASE_URL}/clubs/${CLUB_ID}`);
      console.log(`✅ Club encontrado: ${clubResponse.data.name}`);
      console.log(`Estado de restricciones: ${JSON.stringify(clubResponse.data.restrictions, null, 2)}`);
    } catch (error) {
      console.log('❌ Error al obtener club:', error.response?.data || error.message);
      return;
    }
    
    // 3. Intentar eliminar la restricción exactamente como el frontend
    console.log('\n3. Intentando eliminar restricción no_tournaments...');
    try {
      const deleteResponse = await axios.delete(
        `${API_BASE_URL}/clubs/${CLUB_ID}/restrictions/no_tournaments`,
        {
          params: {
            removedBy: 'admin-frontend',
            removalReason: 'Test desde frontend'
          }
        }
      );
      console.log('✅ Restricción eliminada exitosamente:', deleteResponse.data);
    } catch (error) {
      console.log('❌ Error al eliminar restricción:');
      console.log('Status:', error.response?.status);
      console.log('Status Text:', error.response?.statusText);
      console.log('Error Data:', JSON.stringify(error.response?.data, null, 2));
      console.log('Headers:', error.response?.headers);
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

testErrorCondition().catch(console.error);
