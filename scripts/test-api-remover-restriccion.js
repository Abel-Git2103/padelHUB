const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

async function testRemoverRestriccion() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        
        const db = client.db(dbName);
        const clubsCollection = db.collection('clubs');
        
        // Buscar un club con restricciones activas
        const clubWithRestrictions = await clubsCollection.findOne({
            'restrictions.activeRestrictions': { $exists: true, $ne: [] }
        });
        
        if (!clubWithRestrictions) {
            console.log('No hay clubes con restricciones activas para probar');
            return;
        }
        
        console.log(`\n=== CLUB: ${clubWithRestrictions.name} ===`);
        console.log(`Restricciones activas: ${clubWithRestrictions.restrictions.activeRestrictions.length}`);
        console.log(`Historial antes: ${clubWithRestrictions.restrictions.restrictionsHistory.length}`);
        
        // Mostrar restricciones activas
        clubWithRestrictions.restrictions.activeRestrictions.forEach((r, i) => {
            console.log(`  ${i}: ${r.type} - ${r.reason}`);
        });
        
        // Obtener la primera restricción para remover
        const restrictionToRemove = clubWithRestrictions.restrictions.activeRestrictions[0];
        console.log(`\nRemoción de restricción: ${restrictionToRemove.type}`);
        
        // Hacer la llamada al API del backend
        console.log('\n📡 Llamando al API del backend...');
        
        const response = await fetch(`http://localhost:3000/clubs/${clubWithRestrictions._id}/restrictions/${restrictionToRemove.type}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODg1NWNlOWVhZDhiYmRmZDNlMzYwYWQiLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOX1NJU1RFTUEiLCJpYXQiOjE3MzMzNTM0NzEsImV4cCI6MTczMzQzOTg3MX0.Qu-RD9Q3zDLkUq6-VEInSXgr2sGdKVfUHfnN_m1P9Us'
            },
            body: JSON.stringify({
                removedBy: 'test-admin',
                reason: 'Prueba de eliminación via API'
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Restricción removida exitosamente');
            console.log(`Restricciones activas después: ${result.restrictions.activeRestrictions?.length || 0}`);
            console.log(`Historial después: ${result.restrictions.restrictionsHistory?.length || 0}`);
        } else {
            const error = await response.text();
            console.log('❌ Error al remover restricción:', error);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await client.close();
    }
}

testRemoverRestriccion();
