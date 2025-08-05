/**
 * Script para limpiar todas las restricciones y partir de cero
 */

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000/api';

async function limpiarRestricciones() {
  try {
    console.log('🧹 Limpiando restricciones existentes...\n');

    // Login
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin.sistema@test.com',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    const token = loginData.accessToken;
    console.log('✅ Login exitoso\n');

    // Obtener clubes
    const clubsResponse = await fetch(`${baseUrl}/clubs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const clubs = await clubsResponse.json();
    
    console.log(`📋 Procesando ${clubs.clubs.length} clubes...\n`);

    for (const club of clubs.clubs) {
      console.log(`🏢 Procesando club: ${club.name}`);
      
      if (club.restrictions && club.restrictions.activeRestrictions && club.restrictions.activeRestrictions.length > 0) {
        console.log(`  📊 Restricciones activas: ${club.restrictions.activeRestrictions.length}`);
        
        // Intentar remover cada restricción activa
        for (const restriction of club.restrictions.activeRestrictions) {
          console.log(`  🗑️ Removiendo: ${restriction.type}`);
          
          const removeResponse = await fetch(`${baseUrl}/clubs/${club._id}/restrictions/${restriction.type}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              removedBy: 'admin.sistema@test.com',
              removalReason: 'Limpieza de sistema'
            })
          });

          if (removeResponse.ok) {
            console.log(`    ✅ Removida: ${restriction.type}`);
          } else {
            const errorText = await removeResponse.text();
            console.log(`    ❌ Error removiendo ${restriction.type}: ${errorText}`);
          }
        }
      } else {
        console.log('  ✅ Sin restricciones activas');
      }
      console.log('');
    }

    console.log('🎯 Proceso de limpieza completado');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

limpiarRestricciones();
