const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

async function corregirHistorialRestricciones() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        
        const db = client.db(dbName);
        const clubsCollection = db.collection('clubs');
        
        // Buscar clubes con historial de restricciones
        const clubsWithHistory = await clubsCollection.find({
            'restrictions.restrictionsHistory': { $exists: true, $ne: [] }
        }).toArray();
        
        console.log(`\nEncontrados ${clubsWithHistory.length} clubes con historial de restricciones`);
        
        for (const club of clubsWithHistory) {
            console.log(`\n=== PROCESANDO: ${club.name} ===`);
            
            let needsUpdate = false;
            const updatedHistory = club.restrictions.restrictionsHistory.map((item, index) => {
                console.log(`Verificando historial[${index}]:`);
                console.log(`  - type: ${item.type}`);
                console.log(`  - reason: ${item.reason}`);
                console.log(`  - appliedBy: ${item.appliedBy}`);
                console.log(`  - isActive: ${item.isActive} (tipo: ${typeof item.isActive})`);
                
                let updatedItem = { ...item };
                
                // Corregir isActive undefined
                if (item.isActive === undefined || item.isActive === null) {
                    console.log(`  ⚠️  Corrigiendo isActive: ${item.isActive} -> false`);
                    updatedItem.isActive = false;
                    needsUpdate = true;
                }
                
                // Asegurar campos requeridos
                if (!item.appliedDate) {
                    console.log(`  ⚠️  Añadiendo appliedDate faltante`);
                    updatedItem.appliedDate = new Date();
                    needsUpdate = true;
                }
                
                if (!item.lastModified) {
                    console.log(`  ⚠️  Añadiendo lastModified faltante`);
                    updatedItem.lastModified = new Date();
                    needsUpdate = true;
                }
                
                // Verificar que los campos requeridos estén presentes
                const requiredFields = ['type', 'reason', 'appliedBy'];
                const missing = requiredFields.filter(field => {
                    const value = updatedItem[field];
                    return !value || value === undefined || value === null || value === '';
                });
                
                if (missing.length > 0) {
                    console.log(`  ❌ Campos faltantes: ${missing.join(', ')}`);
                    // Para campos críticos faltantes, usar valores por defecto
                    if (!updatedItem.appliedBy) {
                        updatedItem.appliedBy = 'system';
                        needsUpdate = true;
                        console.log(`  ⚠️  Añadiendo appliedBy por defecto: system`);
                    }
                    if (!updatedItem.reason) {
                        updatedItem.reason = 'Restricción histórica';
                        needsUpdate = true;
                        console.log(`  ⚠️  Añadiendo reason por defecto`);
                    }
                }
                
                console.log(`  ✅ Historial[${index}] procesado`);
                return updatedItem;
            });
            
            if (needsUpdate) {
                console.log(`📝 Actualizando club ${club.name}...`);
                
                const updateResult = await clubsCollection.updateOne(
                    { _id: club._id },
                    { 
                        $set: { 
                            'restrictions.restrictionsHistory': updatedHistory,
                            'restrictions.lastModified': new Date()
                        } 
                    }
                );
                
                if (updateResult.modifiedCount > 0) {
                    console.log(`✅ Club ${club.name} actualizado exitosamente`);
                } else {
                    console.log(`⚠️  Club ${club.name} no fue modificado`);
                }
            } else {
                console.log(`✅ Club ${club.name} no necesita correcciones`);
            }
        }
        
        console.log('\n🎉 Proceso de corrección completado');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
    }
}

corregirHistorialRestricciones();
