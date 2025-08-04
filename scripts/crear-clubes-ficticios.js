const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

const clubesFicticios = [
  {
    name: 'Club Pádel Elite Madrid',
    description: 'El club de pádel más exclusivo de Madrid con instalaciones de primera clase.',
    logo: 'https://example.com/logos/elite-madrid.jpg',
    images: ['https://example.com/images/elite1.jpg', 'https://example.com/images/elite2.jpg'],
    contact: {
      email: 'info@padelelitemadrid.com',
      phone: '+34 91 123 4567',
      website: 'https://padelelitemadrid.com',
      socialMedia: {
        facebook: 'https://facebook.com/padelelitemadrid',
        instagram: 'https://instagram.com/padelelitemadrid'
      }
    },
    location: {
      address: 'Calle Serrano 123',
      city: 'Madrid',
      province: 'Madrid',
      postalCode: '28006',
      coordinates: [-3.6879, 40.4297]
    },
    pricing: {
      courtPricePerHour: 45,
      memberDiscount: 20
    },
    totalCourts: 8,
    availableCourts: 3,
    operatingHours: {
      monday: { open: '07:00', close: '23:00' },
      tuesday: { open: '07:00', close: '23:00' },
      wednesday: { open: '07:00', close: '23:00' },
      thursday: { open: '07:00', close: '23:00' },
      friday: { open: '07:00', close: '23:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    // Métricas en tiempo real
    currentOpenMatches: 12,
    currentActiveTournaments: 3,
    currentNationalRanking: 15,
    currentOccupiedCourts: 5,
    occupancyPercentage: 62,
    newMembersThisMonth: 18,
    todayReservations: 24,
    monthlyRevenue: 18500,
    avgDailyReservations: 22.5,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Pádel Barcelona Center',
    description: 'Club urbano en el centro de Barcelona, perfecto para profesionales.',
    logo: 'https://example.com/logos/bcn-center.jpg',
    contact: {
      email: 'contacto@padelbarcelonacenter.com',
      phone: '+34 93 987 6543',
      website: 'https://padelbarcelonacenter.com'
    },
    location: {
      address: 'Passeig de Gràcia 85',
      city: 'Barcelona',
      province: 'Barcelona',
      postalCode: '08008'
    },
    pricing: {
      courtPricePerHour: 38,
      memberDiscount: 15
    },
    totalCourts: 6,
    availableCourts: 1,
    operatingHours: {
      monday: { open: '06:30', close: '23:30' },
      tuesday: { open: '06:30', close: '23:30' },
      wednesday: { open: '06:30', close: '23:30' },
      thursday: { open: '06:30', close: '23:30' },
      friday: { open: '06:30', close: '23:30' },
      saturday: { open: '08:00', close: '23:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    currentOpenMatches: 8,
    currentActiveTournaments: 2,
    currentNationalRanking: 42,
    currentOccupiedCourts: 5,
    occupancyPercentage: 83,
    newMembersThisMonth: 12,
    todayReservations: 18,
    monthlyRevenue: 14200,
    avgDailyReservations: 19.3,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Club Deportivo Sevilla Sur',
    description: 'Complejo deportivo familiar con excelentes instalaciones de pádel.',
    contact: {
      email: 'info@clubsevilla.com',
      phone: '+34 95 444 5555'
    },
    location: {
      address: 'Avenida de Andalucía 456',
      city: 'Sevilla',
      province: 'Sevilla',
      postalCode: '41013'
    },
    pricing: {
      courtPricePerHour: 28,
      memberDiscount: 25
    },
    totalCourts: 4,
    availableCourts: 2,
    operatingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '09:00', close: '21:00' },
      sunday: { open: '09:00', close: '21:00' }
    },
    currentOpenMatches: 3,
    currentActiveTournaments: 1,
    currentNationalRanking: 156,
    currentOccupiedCourts: 2,
    occupancyPercentage: 50,
    newMembersThisMonth: 7,
    todayReservations: 11,
    monthlyRevenue: 8900,
    avgDailyReservations: 12.4,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Valencia Pádel Premium',
    description: 'El destino premium para el pádel en Valencia con tecnología de vanguardia.',
    logo: 'https://example.com/logos/valencia-premium.jpg',
    contact: {
      email: 'reservas@valenciapremium.com',
      phone: '+34 96 333 2222',
      website: 'https://valenciapremium.com',
      socialMedia: {
        instagram: 'https://instagram.com/valenciapremium',
        twitter: 'https://twitter.com/valenciapremium'
      }
    },
    location: {
      address: 'Ciudad de las Artes y las Ciencias, 12',
      city: 'Valencia',
      province: 'Valencia',
      postalCode: '46013'
    },
    pricing: {
      courtPricePerHour: 42,
      memberDiscount: 18
    },
    totalCourts: 10,
    availableCourts: 7,
    operatingHours: {
      monday: { open: '07:00', close: '23:00' },
      tuesday: { open: '07:00', close: '23:00' },
      wednesday: { open: '07:00', close: '23:00' },
      thursday: { open: '07:00', close: '23:00' },
      friday: { open: '07:00', close: '23:00' },
      saturday: { open: '08:00', close: '22:00' },
      sunday: { open: '08:00', close: '22:00' }
    },
    currentOpenMatches: 15,
    currentActiveTournaments: 4,
    currentNationalRanking: 8,
    currentOccupiedCourts: 3,
    occupancyPercentage: 30,
    newMembersThisMonth: 25,
    todayReservations: 28,
    monthlyRevenue: 22400,
    avgDailyReservations: 26.8,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Bilbao Sports Club',
    description: 'Club histórico con tradición deportiva en el corazón del País Vasco.',
    contact: {
      email: 'info@bilbaosports.com',
      phone: '+34 94 888 7777'
    },
    location: {
      address: 'Gran Vía 789',
      city: 'Bilbao',
      province: 'Vizcaya',
      postalCode: '48001'
    },
    pricing: {
      courtPricePerHour: 35,
      memberDiscount: 22
    },
    totalCourts: 5,
    availableCourts: 5,
    operatingHours: {
      monday: { open: '09:00', close: '21:00' },
      tuesday: { open: '09:00', close: '21:00' },
      wednesday: { open: '09:00', close: '21:00' },
      thursday: { open: '09:00', close: '21:00' },
      friday: { open: '09:00', close: '21:00' },
      saturday: { open: '10:00', close: '20:00' },
      sunday: { open: '10:00', close: '20:00' }
    },
    currentOpenMatches: 2,
    currentActiveTournaments: 0,
    currentNationalRanking: null, // Sin ranking
    currentOccupiedCourts: 0,
    occupancyPercentage: 0,
    newMembersThisMonth: 3,
    todayReservations: 6,
    monthlyRevenue: 5200,
    avgDailyReservations: 8.1,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Málaga Beach Pádel',
    description: 'Pádel junto al mar con vistas espectaculares a la Costa del Sol.',
    logo: 'https://example.com/logos/malaga-beach.jpg',
    images: ['https://example.com/images/beach1.jpg'],
    contact: {
      email: 'beach@malagapadel.com',
      phone: '+34 95 222 1111',
      website: 'https://malagabeachpadel.com'
    },
    location: {
      address: 'Paseo Marítimo Pablo Ruiz Picasso, 30',
      city: 'Málaga',
      province: 'Málaga',
      postalCode: '29016'
    },
    pricing: {
      courtPricePerHour: 32,
      memberDiscount: 12
    },
    totalCourts: 6,
    availableCourts: 4,
    operatingHours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '22:00' },
      saturday: { open: '09:00', close: '23:00' },
      sunday: { open: '09:00', close: '22:00' }
    },
    currentOpenMatches: 6,
    currentActiveTournaments: 1,
    currentNationalRanking: 78,
    currentOccupiedCourts: 2,
    occupancyPercentage: 33,
    newMembersThisMonth: 14,
    todayReservations: 16,
    monthlyRevenue: 11800,
    avgDailyReservations: 15.7,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function insertarClubesFicticios() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('clubs');
    
    // Limpiar clubes existentes (opcional)
    console.log('Limpiando clubes existentes...');
    await collection.deleteMany({});
    
    // Insertar clubes ficticios
    console.log('Insertando clubes ficticios...');
    const result = await collection.insertMany(clubesFicticios);
    
    console.log(`✅ Se insertaron ${result.insertedCount} clubes ficticios exitosamente`);
    console.log('IDs insertados:', Object.values(result.insertedIds));
    
    // Verificar inserción
    const count = await collection.countDocuments();
    console.log(`📊 Total de clubes en la base de datos: ${count}`);
    
  } catch (error) {
    console.error('❌ Error al insertar clubes ficticios:', error);
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar el script
insertarClubesFicticios();
