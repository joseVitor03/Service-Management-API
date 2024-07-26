import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('cars', [
      {
        name: 'HONDA CIVIC',
        year: 2020,
        brand: 'HONDA',
      },
      {
        name: 'PALIO',
        year: 2015,
        brand: 'FIAT',
      },
      {
        name: 'VOLKSWAGEN GOL',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN POLO',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN GOLF',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN JETTA',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN T-CROSS',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN TIGUAN',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN VOYAGE',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN SAVEIRO',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN VIRTUS',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'VOLKSWAGEN AMAROK',
        year: 2024,
        brand: 'VOLKSWAGEN',
      },
      {
        name: 'CHEVROLET ONIX',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET PRISMA',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET TRACKER',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET CRUZE',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET S10',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET SPIN',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET MONTANA',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET TRAILBLAZER',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET COBALT',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'CHEVROLET CAPTIVA',
        year: 2024,
        brand: 'CHEVROLET',
      },
      {
        name: 'FIAT UNO',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT PALIO',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT STRADA',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT TORO',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT MOBI',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT ARGO',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT CRONOS',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT FIORINO',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT PULSE',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FIAT 500',
        year: 2024,
        brand: 'FIAT',
      },
      {
        name: 'FORD KA',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD FIESTA',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD ECOSPORT',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD RANGER',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD FOCUS',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD FUSION',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD TERRITORY',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD EDGE',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD MUSTANG',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'FORD MAVERICK',
        year: 2024,
        brand: 'FORD',
      },
      {
        name: 'TOYOTA COROLLA',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA HILUX',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA YARIS',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA ETIOS',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA RAV4',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA SW4',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA CAMRY',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA PRIUS',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA CH-R',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'TOYOTA SUPRA',
        year: 2024,
        brand: 'TOYOTA',
      },
      {
        name: 'HYUNDAI HB20',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI CRETA',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI TUCSON',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI SANTA FE',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI ELANTRA',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI i30',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI AZERA',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI VELOSTER',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI SONATA',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HYUNDAI ix35',
        year: 2024,
        brand: 'HYUNDAI',
      },
      {
        name: 'HONDA CIVIC',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA FIT',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA HR-V',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA CITY',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA ACCORD',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA CR-V',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA WR-V',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA BR-V',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA PILOT',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'HONDA ODYSSEY',
        year: 2024,
        brand: 'HONDA',
      },
      {
        name: 'RENAULT KWID',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT SANDERO',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT LOGAN',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT DUSTER',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT CAPTUR',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT OROCH',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT CLIO',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT MEGANE',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT SCENIC',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'RENAULT ZOE',
        year: 2024,
        brand: 'RENAULT',
      },
      {
        name: 'NISSAN KICKS',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN MARCH',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN VERSA',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN SENTRA',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN FRONTIER',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN LEAF',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN MURANO',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN PATHFINDER',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN ALTIMA',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'NISSAN GT-R',
        year: 2024,
        brand: 'NISSAN',
      },
      {
        name: 'JEEP RENEGADE',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP COMPASS',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP GRAND CHEROKEE',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP WRANGLER',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP CHEROKEE',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP GLADIATOR',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP PATRIOT',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP COMMANDER',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP WAGONEER',
        year: 2024,
        brand: 'JEEP',
      },
      {
        name: 'JEEP LIBERTY',
        year: 2024,
        brand: 'JEEP',
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('cars', {});
  },
};
