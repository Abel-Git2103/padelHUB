const axios = require('axios');

async function testAPIEliminarRestriccion() {
    try {
        console.log('🔧 Test de API - Eliminación de Restricciones');
        console.log('===============================================');
        
        const BASE_URL = 'http://localhost:3000/api';
        
        // 1. Login para obtener token
        console.log('🔐 Realizando login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'admin.sistema@test.com',
            password: 'admin123'
        });
        
        const token = loginResponse.data.token;
        console.log('✅ Login exitoso');
        
        // Headers con autenticación
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        // 2. Obtener clubes
        console.log('📋 Obteniendo lista de clubes...');
        const clubsResponse = await axios.get(`${BASE_URL}/clubs`, { headers });
        const clubs = clubsResponse.data;
        
        if (clubs.length === 0) {
            console.log('❌ No hay clubes disponibles');
            return;
        }
        
        const club = clubs[0];
        console.log(`📍 Club seleccionado: ${club.nombre} (ID: ${club._id})`);
        
        // 3. Verificar restricciones activas
        const clubDetailResponse = await axios.get(`${BASE_URL}/clubs/${club._id}`, { headers });
        const clubDetail = clubDetailResponse.data;
        
        console.log(`📊 Estado actual del club:`);
        console.log(`- Restringido: ${clubDetail.restrictions.isRestricted}`);
        console.log(`- Restricciones activas: ${clubDetail.restrictions.activeRestrictions.length}`);
        console.log(`- Historial: ${clubDetail.restrictions.restrictionsHistory.length}`);
        
        if (clubDetail.restrictions.activeRestrictions.length === 0) {
            console.log('➕ Agregando restricción de prueba...');
            await axios.post(`${BASE_URL}/clubs/${club._id}/restrictions`, {
                type: 'payment_delay',
                reason: 'Test para eliminación API',
                appliedBy: 'API Test'
            }, { headers });
            console.log('✅ Restricción agregada');
        }
        
        // 4. Obtener restricciones actualizadas
        const updatedClubResponse = await axios.get(`${BASE_URL}/clubs/${club._id}`, { headers });
        const updatedClub = updatedClubResponse.data;
        
        if (updatedClub.restrictions.activeRestrictions.length === 0) {
            console.log('❌ No hay restricciones activas para eliminar');
            return;
        }
        
        const restrictionToRemove = updatedClub.restrictions.activeRestrictions[0];
        console.log(`🎯 Restricción a eliminar:`);
        console.log(`- ID: ${restrictionToRemove._id}`);
        console.log(`- Tipo: ${restrictionToRemove.type}`);
        console.log(`- Razón: ${restrictionToRemove.reason}`);
        
        // 5. Eliminar restricción usando el endpoint del backend
        console.log('🗑️ Eliminando restricción via API...');
        const removeResponse = await axios.delete(
            `${BASE_URL}/clubs/${club._id}/restrictions/${restrictionToRemove._id}`,
            {
                headers,
                data: {
                    removedBy: 'API Test User',
                    removalReason: 'Test de eliminación via API'
                }
            }
        );
        
        console.log('✅ Restricción eliminada via API');
        console.log('📊 Respuesta del servidor:', removeResponse.data);
        
        // 6. Verificar estado final
        const finalClubResponse = await axios.get(`${BASE_URL}/clubs/${club._id}`, { headers });
        const finalClub = finalClubResponse.data;
        
        console.log(`📊 Estado final del club:`);
        console.log(`- Restringido: ${finalClub.restrictions.isRestricted}`);
        console.log(`- Restricciones activas: ${finalClub.restrictions.activeRestrictions.length}`);
        console.log(`- Historial: ${finalClub.restrictions.restrictionsHistory.length}`);
        
        console.log('✅ Test de API completado exitosamente');
        
    } catch (error) {
        console.error('❌ Error en test de API:', error.response?.data || error.message);
        if (error.response?.data?.details) {
            console.error('🔍 Detalles del error:', error.response.data.details);
        }
    }
}

testAPIEliminarRestriccion();
