/**
 * Script simplificado para crear y luego remover una restricción
 */

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000/api';

async function testSimple() {
  try {
    console.log('🚀 Test simplificado de restricciones...\n');

    // Login
    console.log('🔐 Haciendo login...');
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
    const club = clubs.clubs[0];
    console.log(`📍 Usando club: ${club.name}\n`);

    // Crear restricción
    console.log('➕ Creando restricción...');
    const createResponse = await fetch(`${baseUrl}/clubs/${club._id}/restrictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: 'PAYMENT_DELAY',
        reason: 'Test de debug',
        appliedBy: 'admin.sistema@test.com'
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.log('❌ Error al crear restricción:', errorText);
      return;
    }

    const updatedClub = await createResponse.json();
    console.log('✅ Restricción creada exitosamente');
    
    const restriction = updatedClub.restrictions.activeRestrictions[0];
    console.log(`🎯 Restricción: ${restriction.type} - ${restriction.reason}\n`);

    // Ahora intentar remover
    console.log('🗑️ Removiendo restricción...');
    const removeResponse = await fetch(`${baseUrl}/clubs/${club._id}/restrictions/${restriction.type}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        removedBy: 'admin.sistema@test.com',
        removalReason: 'Test completado'
      })
    });

    if (!removeResponse.ok) {
      const errorText = await removeResponse.text();
      console.log(`❌ Error al remover restricción: ${removeResponse.status}`);
      console.log(`📝 Respuesta: ${errorText}`);
      
      // Mostrar detalles del error
      try {
        const errorJson = JSON.parse(errorText);
        console.log('📋 Error detallado:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        console.log('📝 Error en texto plano:', errorText);
      }
    } else {
      const result = await removeResponse.json();
      console.log('✅ Restricción removida exitosamente!');
      console.log('📊 Resultado:', JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSimple();
