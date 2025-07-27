const http = require('http');

// Datos exactos que está enviando el frontend
const clubData = {
  name: "Test Script",
  description: "test de club desde script",
  logo: undefined,
  totalCourts: 1,
  contact: {
    email: "test@test.com",
    phone: "666666666",
    website: undefined
  },
  location: {
    address: "calle a",
    city: "madrid",
    province: "madrid",
    postalCode: "28001"
  },
  pricing: {
    courtPricePerHour: 10,
    memberDiscount: undefined,
    allowNonMembers: true
  },
  allowTournaments: true,
  allowExternalPlayers: true,
  requireMembershipApproval: true
};

function makeRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ status: res.statusCode, data: parsedData });
          } else {
            reject({ status: res.statusCode, data: parsedData });
          }
        } catch (error) {
          reject({ status: res.statusCode, data: responseData, parseError: error });
        }
      });
    });

    req.on('error', (error) => {
      reject({ error: error });
    });

    req.write(postData);
    req.end();
  });
}

async function testCrearClub() {
  console.log('🧪 Iniciando test de creación de club...');
  console.log('📋 Datos a enviar:', JSON.stringify(clubData, null, 2));

  try {
    // Test 1: Endpoint sin autenticación
    console.log('\n🔧 Test 1: Endpoint de test básico...');
    const testResponse = await makeRequest('/api/clubs/test', clubData);
    console.log('✅ Test básico exitoso:', testResponse.data);

    // Test 2: Endpoint real sin autenticación (que acabamos de quitar la auth)
    console.log('\n🏟️ Test 2: Endpoint real sin autenticación...');
    const realResponse = await makeRequest('/api/clubs', clubData);
    console.log('✅ Creación real exitosa:', realResponse.data);

  } catch (error) {
    console.error('\n❌ Error en el test:');
    console.error('Status:', error.status);
    console.error('Data:', error.data);
    
    if (error.data?.message) {
      console.error('Mensaje del servidor:', error.data.message);
    }
    
    if (error.error) {
      console.error('Error de conexión:', error.error.message);
    }
    
    if (error.parseError) {
      console.error('Error de parsing:', error.parseError.message);
      console.error('Raw response:', error.data);
    }
  }
}

// Ejecutar el test
testCrearClub();
