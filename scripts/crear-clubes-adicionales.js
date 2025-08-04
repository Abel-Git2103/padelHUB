const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'padelhub';

const clubesAdicionales = [
  {
    name: 'Club Pádel Zaragoza Norte',
    description: 'Club recién inaugurado con instalaciones modernas en el norte de Zaragoza.',
    contact: {
      email: 'nuevo@padelzaragoza.com',
      phone: '+34 97 555 6666'
    },
    location: {
      address: 'Polígono Industrial Norte, 15',
      city: 'Zaragoza',
      province: 'Zaragoza',
      postalCode: '50012'
    },
    pricing: {
      courtPricePerHour: 25,
      memberDiscount: 15
    },
    totalCourts: 3,
    availableCourts: 3,
    operatingHours: {
      monday: { open: '16:00', close: '22:00' },
      tuesday: { open: '16:00', close: '22:00' },
      wednesday: { open: '16:00', close: '22:00' },
      thursday: { open: '16:00', close: '22:00' },
      friday: { open: '16:00', close: '22:00' },
      saturday: { open: '10:00', close: '21:00' },
      sunday: { open: '10:00', close: '21:00' }
    },
    // Club nuevo - pocas métricas
    currentOpenMatches: 1,
    currentActiveTournaments: 0,
    currentNationalRanking: null, // Sin ranking aún
    currentOccupiedCourts: 0,
    occupancyPercentage: 0,
    newMembersThisMonth: 8, // Nuevo, muchos miembros nuevos
    todayReservations: 3,
    monthlyRevenue: 1200, // Ingresos bajos, recién empezando
    avgDailyReservations: 4.2,
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
    name: 'Mega Club Pádel Premium',
    description: 'El complejo de pádel más grande de España con 20 pistas cubiertas y al aire libre.',
    logo: 'https://example.com/logos/mega-premium.jpg',
    images: ['https://example.com/images/mega1.jpg', 'https://example.com/images/mega2.jpg', 'https://example.com/images/mega3.jpg'],
    contact: {
      email: 'reservas@megaclubpadel.com',
      phone: '+34 91 999 8888',
      website: 'https://megaclubpadel.com',
      socialMedia: {
        facebook: 'https://facebook.com/megaclubpadel',
        instagram: 'https://instagram.com/megaclubpadel',
        twitter: 'https://twitter.com/megaclubpadel'
      }
    },
    location: {
      address: 'Parque Empresarial Las Rozas, Edificio Omega',
      city: 'Las Rozas',
      province: 'Madrid',
      postalCode: '28232'
    },
    pricing: {
      courtPricePerHour: 55, // Precio premium
      memberDiscount: 30
    },
    totalCourts: 20, // Mega club
    availableCourts: 8,
    operatingHours: {
      monday: { open: '06:00', close: '24:00' },
      tuesday: { open: '06:00', close: '24:00' },
      wednesday: { open: '06:00', close: '24:00' },
      thursday: { open: '06:00', close: '24:00' },
      friday: { open: '06:00', close: '24:00' },
      saturday: { open: '07:00', close: '24:00' },
      sunday: { open: '07:00', close: '24:00' }
    },
    // Métricas altas - club muy activo
    currentOpenMatches: 45, // Muchos partidos abiertos
    currentActiveTournaments: 8, // Muchos torneos
    currentNationalRanking: 3, // Top 3 nacional
    currentOccupiedCourts: 12,
    occupancyPercentage: 60,
    newMembersThisMonth: 35, // Muchos miembros nuevos
    todayReservations: 67, // Muchas reservas
    monthlyRevenue: 48500, // Ingresos muy altos
    avgDailyReservations: 52.3,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: true, // Club exclusivo
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Club Deportivo San Sebastián',
    description: 'Club tradicional con encanto en el centro de San Sebastián.',
    contact: {
      email: 'info@clubsansebastian.com',
      phone: '+34 94 333 4444'
    },
    location: {
      address: 'Calle Urbieta 52',
      city: 'San Sebastián',
      province: 'Guipúzcoa',
      postalCode: '20006'
    },
    pricing: {
      courtPricePerHour: 30,
      memberDiscount: 20
    },
    totalCourts: 2, // Club pequeño
    availableCourts: 0, // Todas ocupadas
    operatingHours: {
      monday: { open: '10:00', close: '20:00' },
      tuesday: { open: '10:00', close: '20:00' },
      wednesday: { open: '10:00', close: '20:00' },
      thursday: { open: '10:00', close: '20:00' },
      friday: { open: '10:00', close: '20:00' },
      saturday: { open: '11:00', close: '19:00' },
      sunday: { open: '11:00', close: '19:00' }
    },
    // Club pequeño pero muy ocupado
    currentOpenMatches: 0, // No hay partidos abiertos - todo reservado
    currentActiveTournaments: 1,
    currentNationalRanking: 234,
    currentOccupiedCourts: 2, // 100% ocupación
    occupancyPercentage: 100, // Completamente lleno
    newMembersThisMonth: 2,
    todayReservations: 12, // Muchas reservas para un club pequeño
    monthlyRevenue: 6800,
    avgDailyReservations: 11.5,
    status: 'ACTIVO',
    administrators: [],
    seasonStats: [],
    monthlySubscriptionFee: 200,
    isSubscriptionActive: true,
    requireMembershipApproval: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function insertarClubsAdicionales() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('clubs');
    
    // Insertar clubes adicionales (sin limpiar los existentes)
    console.log('Insertando clubes adicionales...');
    const result = await collection.insertMany(clubesAdicionales);
    
    console.log(`✅ Se insertaron ${result.insertedCount} clubes adicionales exitosamente`);
    
    // Verificar total
    const count = await collection.countDocuments();
    console.log(`📊 Total de clubes en la base de datos: ${count}`);
    
    // Mostrar variedad de datos
    console.log('\n📈 Resumen de variedad de datos:');
    
    const clubesConRanking = await collection.countDocuments({ currentNationalRanking: { $ne: null } });
    console.log(`- Clubes con ranking nacional: ${clubesConRanking}`);
    
    const clubesSinRanking = await collection.countDocuments({ currentNationalRanking: null });
    console.log(`- Clubes sin ranking: ${clubesSinRanking}`);
    
    const clubesOcupados = await collection.countDocuments({ occupancyPercentage: { $gt: 50 } });
    console.log(`- Clubes con >50% ocupación: ${clubesOcupados}`);
    
    const clubesConTorneos = await collection.countDocuments({ currentActiveTournaments: { $gt: 0 } });
    console.log(`- Clubes con torneos activos: ${clubesConTorneos}`);
    
  } catch (error) {
    console.error('❌ Error al insertar clubes adicionales:', error);
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar el script
insertarClubsAdicionales();
