/**
 * Script para probar la funcionalidad completa de remover restricciones
 * Incluye autenticación JWT y llamadas HTTP al backend
 */

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3000/api';

async function testRemoverRestriccionCompleto() {
  try {
    console.log('🚀 Iniciando test completo de remoción de restricciones...\n');

    // Primero hacer login para obtener el token JWT
    console.log('🔐 Haciendo login...');
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin.sistema@test.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      throw new Error(`Error en login: ${loginResponse.status} - ${errorText}`);
    }

    const loginData = await loginResponse.json();
    console.log('📊 Respuesta de login:', JSON.stringify(loginData, null, 2));
    const token = loginData.access_token || loginData.token || loginData.accessToken;
    console.log('✅ Login exitoso, token obtenido');
    console.log('🔑 Token:', token ? token.substring(0, 50) + '...' : 'NO TOKEN');
    console.log('');

    // Obtener lista de clubes
    console.log('📋 Obteniendo lista de clubes...');
    const clubsResponse = await fetch(`${baseUrl}/clubs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!clubsResponse.ok) {
      throw new Error(`Error al obtener clubes: ${clubsResponse.status}`);
    }

    const clubs = await clubsResponse.json();
    
    // Verificar si la respuesta tiene el formato esperado
    const clubsArray = clubs.clubs || [];
    console.log(`✅ Encontrados ${clubsArray.length} clubes\n`);

    if (clubsArray.length === 0) {
      console.log('❌ No hay clubes para probar');
      return;
    }

    // Buscar un club con restricciones activas
    let clubConRestricciones = null;
    let restriccionActiva = null;

    for (const club of clubsArray) {
      if (club.restrictions && club.restrictions.activeRestrictions && club.restrictions.activeRestrictions.length > 0) {
        clubConRestricciones = club;
        restriccionActiva = club.restrictions.activeRestrictions[0];
        break;
      }
    }

    if (!clubConRestricciones) {
      console.log('❌ No se encontraron clubes con restricciones activas');
      console.log('🔧 Creando una restricción de prueba...');
      
      // Crear una restricción de prueba
      const primerClub = clubsArray[0];
      const createRestrictionResponse = await fetch(`${baseUrl}/clubs/${primerClub._id}/restrictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'PAYMENT_DELAY',
          reason: 'Restricción de prueba para test',
          appliedBy: 'admin.sistema@test.com'
        })
      });

      if (!createRestrictionResponse.ok) {
        const errorText = await createRestrictionResponse.text();
        throw new Error(`Error al crear restricción: ${createRestrictionResponse.status} - ${errorText}`);
      }

      const updatedClub = await createRestrictionResponse.json();
      clubConRestricciones = updatedClub;
      restriccionActiva = updatedClub.restrictions.activeRestrictions[0];
      console.log('✅ Restricción de prueba creada\n');
    }

    console.log(`📍 Club seleccionado: ${clubConRestricciones.name}`);
    console.log(`🚫 Restricción activa: ${restriccionActiva.type} - ${restriccionActiva.reason}`);
    console.log(`🆔 Tipo de restricción: ${restriccionActiva.type}`);
    console.log('📋 Restricción completa:', JSON.stringify(restriccionActiva, null, 2));
    console.log('');

    // Intentar remover la restricción - usando el tipo en lugar del ID
    console.log('🗑️ Removiendo restricción...');
    const removeResponse = await fetch(`${baseUrl}/clubs/${clubConRestricciones._id}/restrictions/${restriccionActiva.type}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        removedBy: 'admin.sistema@test.com',
        removalReason: 'Test de remoción de restricciones'
      })
    });

    if (!removeResponse.ok) {
      const errorText = await removeResponse.text();
      console.log(`❌ Error al remover restricción: ${removeResponse.status}`);
      console.log(`📝 Respuesta del servidor: ${errorText}`);
      
      // Intentar parsear como JSON para más detalles
      try {
        const errorJson = JSON.parse(errorText);
        console.log('📋 Detalles del error:', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        console.log('📝 Texto del error:', errorText);
      }
      return;
    }

    const result = await removeResponse.json();
    console.log('✅ Restricción removida exitosamente!');
    console.log('📊 Resultado:', JSON.stringify(result, null, 2));

    // Verificar el historial
    console.log('\n📜 Verificando historial de restricciones...');
    const historyResponse = await fetch(`${baseUrl}/clubs/${clubConRestricciones._id}/restrictions/history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (historyResponse.ok) {
      const historyData = await historyResponse.json();
      console.log('✅ Historial obtenido exitosamente');
      console.log(`📊 Total de entradas en historial: ${historyData.length}`);
      if (historyData.length > 0) {
        const ultimaEntrada = historyData[historyData.length - 1];
        console.log('🕐 Última entrada:', {
          type: ultimaEntrada.type,
          reason: ultimaEntrada.reason,
          removedBy: ultimaEntrada.removedBy,
          removedDate: ultimaEntrada.removedDate,
          isActive: ultimaEntrada.isActive
        });
      }
    } else {
      console.log('⚠️ No se pudo obtener el historial');
    }

  } catch (error) {
    console.error('❌ Error durante el test:', error.message);
    console.error('🔍 Stack trace:', error.stack);
  }
}

// Ejecutar el test
testRemoverRestriccionCompleto();
