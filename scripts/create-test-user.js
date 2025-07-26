// Script temporal para crear un usuario de prueba
const https = require('http');

const userData = {
  email: "admin@test.com",
  contraseña: "password123",
  nombre: "Admin",
  apellidos: "Test Usuario",
  rangoActual: "COBRE"
};

const postData = JSON.stringify(userData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData, 'utf8')
  }
};

console.log('Creando usuario de prueba...');
console.log('Datos:', userData);

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.setEncoding('utf8');
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Respuesta del servidor:');
    try {
      const response = JSON.parse(data);
      console.log(JSON.stringify(response, null, 2));
      
      if (res.statusCode === 201) {
        console.log('\n✅ Usuario creado exitosamente!');
        console.log('Credenciales para iniciar sesión:');
        console.log('Email:', userData.email);
        console.log('Contraseña:', userData.contraseña);
      }
    } catch (error) {
      console.log('Respuesta sin formato JSON:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(postData);
req.end();
