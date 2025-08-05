const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

async function debugRestriccioesReales() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        
        const db = client.db(dbName);
        const clubsCollection = db.collection('clubs');
        
        // Buscar clubes con restricciones
        const clubsWithRestrictions = await clubsCollection.find({
            $or: [
                { 'restrictions.active': { $exists: true, $ne: [] } },
                { 'restrictions.activeRestrictions': { $exists: true, $ne: [] } }
            ]
        }).toArray();
        
        console.log(`\nEncontrados ${clubsWithRestrictions.length} clubes con restricciones`);
        
        for (const club of clubsWithRestrictions) {
            console.log(`\n=== CLUB: ${club.name} ===`);
            console.log('Estructura de restricciones:', Object.keys(club.restrictions || {}));
            
            // Verificar restricciones activas (campo nuevo)
            if (club.restrictions?.activeRestrictions) {
                console.log(`\nRestricciones activas (activeRestrictions): ${club.restrictions.activeRestrictions.length}`);
                club.restrictions.activeRestrictions.forEach((restriction, index) => {
                    console.log(`\n--- Restricción activa ${index} ---`);
                    console.log('Tipo:', restriction.type);
                    console.log('Razón:', restriction.reason);
                    console.log('appliedBy:', restriction.appliedBy);
                    console.log('appliedDate:', restriction.appliedDate);
                    console.log('Campos presentes:', Object.keys(restriction));
                    
                    // Verificar campos requeridos específicamente
                    const requiredFields = ['type', 'reason', 'appliedBy'];
                    const missing = requiredFields.filter(field => {
                        const value = restriction[field];
                        return !value || value === undefined || value === null || value === '';
                    });
                    
                    if (missing.length > 0) {
                        console.log('❌ CAMPOS FALTANTES:', missing);
                    } else {
                        console.log('✅ Todos los campos requeridos presentes');
                    }
                });
            }
            
            // Verificar restricciones activas (campo viejo)
            if (club.restrictions?.active) {
                console.log(`\nRestricciones activas (active): ${club.restrictions.active.length}`);
                club.restrictions.active.forEach((restriction, index) => {
                    console.log(`\n--- Restricción active ${index} ---`);
                    console.log('Tipo:', restriction.type);
                    console.log('Razón:', restriction.reason);
                    console.log('appliedBy:', restriction.appliedBy);
                    console.log('appliedDate:', restriction.appliedDate);
                    console.log('Campos presentes:', Object.keys(restriction));
                });
            }
            
            // Verificar historial
            if (club.restrictions?.restrictionsHistory) {
                console.log(`\nHistorial de restricciones: ${club.restrictions.restrictionsHistory.length}`);
                club.restrictions.restrictionsHistory.forEach((restriction, index) => {
                    console.log(`\n--- Historial ${index} ---`);
                    console.log('Tipo:', restriction.type);
                    console.log('Razón:', restriction.reason);
                    console.log('appliedBy:', restriction.appliedBy);
                    console.log('isActive:', restriction.isActive);
                    console.log('Campos presentes:', Object.keys(restriction));
                    
                    // Verificar campos requeridos para historial
                    const requiredFields = ['type', 'reason', 'appliedBy'];
                    const missing = requiredFields.filter(field => {
                        const value = restriction[field];
                        return !value || value === undefined || value === null || value === '';
                    });
                    
                    if (missing.length > 0) {
                        console.log('❌ HISTORIAL - CAMPOS FALTANTES:', missing);
                    } else {
                        console.log('✅ Historial - Todos los campos requeridos presentes');
                    }
                });
            }
        }
        
        // Si no hay restricciones, mostrar estructura de clubs disponibles
        if (clubsWithRestrictions.length === 0) {
            console.log('\nNo hay clubes con restricciones. Mostrando clubes disponibles:');
            const allClubs = await clubsCollection.find({}).limit(3).toArray();
            allClubs.forEach(club => {
                console.log(`- ${club.name}: ${club.restrictions ? 'Con estructura restrictions' : 'Sin restrictions'}`);
                if (club.restrictions) {
                    console.log(`  Campos: ${Object.keys(club.restrictions).join(', ')}`);
                }
            });
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

debugRestriccioesReales();
