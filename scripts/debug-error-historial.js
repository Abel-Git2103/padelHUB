const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

async function debugHistorialError() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        
        const db = client.db(dbName);
        const clubsCollection = db.collection('clubs');
        
        // 1. Buscar un club con restricciones activas
        const clubWithRestrictions = await clubsCollection.findOne({
            'restrictions.active': { $exists: true, $ne: [] }
        });
        
        if (!clubWithRestrictions) {
            console.log('No hay clubes con restricciones activas');
            
            // Crear una restricción de prueba si no hay
            const anyClub = await clubsCollection.findOne({});
            if (anyClub) {
                console.log(`Agregando restricción de prueba al club: ${anyClub.name}`);
                
                const testRestriction = {
                    type: 'PAYMENT_DELAY',
                    reason: 'Prueba para debuggear error de historial',
                    appliedDate: new Date(),
                    appliedBy: '507f1f77bcf86cd799439011', // ObjectId de prueba
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 día
                    metadata: {
                        amount: 100,
                        daysOverdue: 5
                    }
                };
                
                await clubsCollection.updateOne(
                    { _id: anyClub._id },
                    { 
                        $push: { 'restrictions.active': testRestriction },
                        $set: { 'restrictions.lastModified': new Date() }
                    }
                );
                
                console.log('Restricción de prueba agregada');
                return debugHistorialError(); // Reintentar
            } else {
                console.log('No hay clubes en la base de datos');
                return;
            }
        }
        
        console.log(`Club encontrado con restricciones: ${clubWithRestrictions.name}`);
        console.log(`Restricciones activas: ${clubWithRestrictions.restrictions?.active?.length || 0}`);
        
        // 2. Examinar la primera restricción activa
        const firstRestriction = clubWithRestrictions.restrictions.active[0];
        console.log('\n=== RESTRICCIÓN A MOVER AL HISTORIAL ===');
        console.log(JSON.stringify(firstRestriction, null, 2));
        
        // 3. Validar campos requeridos
        const requiredFields = ['type', 'reason', 'appliedDate', 'appliedBy'];
        const missingFields = requiredFields.filter(field => !firstRestriction[field]);
        
        console.log('\n=== VALIDACIÓN DE CAMPOS REQUERIDOS ===');
        requiredFields.forEach(field => {
            const value = firstRestriction[field];
            console.log(`${field}: ${value ? '✓ PRESENTE' : '✗ FALTANTE'} (${typeof value}) - ${value}`);
        });
        
        if (missingFields.length > 0) {
            console.log(`\n❌ CAMPOS FALTANTES: ${missingFields.join(', ')}`);
        } else {
            console.log('\n✅ TODOS LOS CAMPOS REQUERIDOS ESTÁN PRESENTES');
        }
        
        // 4. Crear entrada de historial como lo hace el backend
        const historyEntry = {
            ...firstRestriction,
            removedDate: new Date(),
            removedBy: '507f1f77bcf86cd799439011', // ObjectId de prueba
            removalReason: 'Prueba de debugging',
            lastModified: new Date()
        };
        
        console.log('\n=== ENTRADA DE HISTORIAL GENERADA ===');
        console.log(JSON.stringify(historyEntry, null, 2));
        
        // 5. Validar entrada de historial
        const historyRequiredFields = ['type', 'reason', 'appliedDate', 'appliedBy', 'removedDate', 'removedBy', 'removalReason'];
        const historyMissingFields = historyRequiredFields.filter(field => !historyEntry[field]);
        
        console.log('\n=== VALIDACIÓN DE ENTRADA DE HISTORIAL ===');
        historyRequiredFields.forEach(field => {
            const value = historyEntry[field];
            console.log(`${field}: ${value ? '✓ PRESENTE' : '✗ FALTANTE'} (${typeof value}) - ${value}`);
        });
        
        if (historyMissingFields.length > 0) {
            console.log(`\n❌ CAMPOS FALTANTES EN HISTORIAL: ${historyMissingFields.join(', ')}`);
        } else {
            console.log('\n✅ ENTRADA DE HISTORIAL VÁLIDA');
        }
        
        // 6. Simular la operación de MongoDB que está fallando
        console.log('\n=== SIMULANDO OPERACIÓN DE MONGODB ===');
        try {
            const updateResult = await clubsCollection.updateOne(
                { _id: clubWithRestrictions._id },
                {
                    $pull: { 'restrictions.active': { type: firstRestriction.type } },
                    $push: { 'restrictions.restrictionsHistory': historyEntry },
                    $set: { 'restrictions.lastModified': new Date() }
                }
            );
            
            console.log('✅ Operación de MongoDB exitosa:', updateResult);
            
            // Verificar el resultado
            const updatedClub = await clubsCollection.findOne({ _id: clubWithRestrictions._id });
            console.log(`Restricciones activas después: ${updatedClub.restrictions?.active?.length || 0}`);
            console.log(`Entradas en historial después: ${updatedClub.restrictions?.restrictionsHistory?.length || 0}`);
            
        } catch (error) {
            console.log('❌ Error en operación de MongoDB:', error.message);
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

debugHistorialError();
