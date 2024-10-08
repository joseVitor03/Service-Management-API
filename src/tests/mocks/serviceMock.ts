const FONE_EXAMPLE = '98765-4321';
const DATE_EXAMPLE = '2024-04-20';

export const servicesByClientMock = [{
  id: 2,
  client: {
    id: 2,
    name: 'Ciclano',
    phone: '98765-4321',
    carId: 2,
    carColor: 'Vermelho',
    plate: 'XYZ-9A87',
  },
  totalService: '1750.00',
  date: '2024-04-20',
  paymentStatus: false,
}];

export const insertServiceCompleteMock = {
  clientId: 2,
  totalService: 800,
  plate: 'ABC-1D23',
  carId: 33,
  carColor: 'azul',
  date: '2024-05-09',
  paymentStatus: false,
  principalEmployeeId: 2,
  itens: [{
    itemId: 2,
    qtdUnit: 2,
    priceUnit: 100,
  }],
  employeeServices: [{
    labor: 600,
    employeeId: 2,
    description: 'null',
  }] };

export const insertServiceFailedMock = {
  clientId: 2,
  totalService: 800,
  date: '2024-05-09',
  paymentStatus: false,
  pieces: [],
  employeeServices: [],
};

export const listServiceFalseMock = [{
  id: 1,
  totalService: '750.00',
  date: '2024-05-19',
  paymentStatus: false,
  client: {
    id: 1,
    name: 'Fulano',
    phone: '12345-6789',
  },
  carColor: 'Azul',
  plate: 'ABC-1B23',
  car: {
    id: 1,
    name: 'HONDA CIVIC',
    year: 2020,
    brand: 'HONDA',
  },
},
{
  id: 2,
  totalService: '1750.00',
  date: '2024-04-22',
  paymentStatus: false,
  client: {
    id: 2,
    name: 'Ciclano',
    phone: FONE_EXAMPLE,
  },
  carColor: 'Vermelho',
  plate: 'XYZ-9A87',
  car: {
    id: 2,
    name: 'PALIO',
    year: 2015,
    brand: 'FIAT',
  },
},
];

export const listServiceTrueMock = [{
  id: 1,
  totalService: '750.00',
  date: '2024-05-19',
  paymentStatus: true,
  client: {
    id: 1,
    name: 'Fulano',
    phone: '12345-6789',
  },
  carColor: 'Azul',
  plate: 'ABC-1B23',
  car: {
    id: 1,
    name: 'HONDA CIVIC',
    year: 2020,
    brand: 'HONDA',
  },
},
{
  id: 2,
  totalService: '1750.00',
  date: '2024-04-21',
  paymentStatus: true,
  client: {
    id: 2,
    name: 'Ciclano',
    phone: FONE_EXAMPLE,
  },
  carColor: 'Vermelho',
  plate: 'XYZ-9A87',
  car: {
    id: 2,
    name: 'PALIO',
    year: 2015,
    brand: 'FIAT',
  },
},
];

export const findServiceMockDataService = [
  {
    id: 2,
    totalService: '1750.00',
    date: '2024-04-21',
    paymentStatus: false,
    principalEmployee: { id: 1, name: 'FABIO' },
    client: {
      id: 2,
      name: 'Ciclano',
      phone: FONE_EXAMPLE,
    },
    carColor: 'Vermelho',
    plate: 'XYZ-9A87',
    car: { id: 2, name: 'PALIO', year: 2015, brand: 'FIAT' },
  },
];

export const findServiceMockItemService = [
  {
    qtdUnit: 2,
    priceUnit: '125.00',
    itemName: { dataValues: { id: 1, name: 'PASTILHA DE FREIO',
    } },
    service: { dataValues: {
      id: 3,
      totalService: '1750.00',
      date: DATE_EXAMPLE,
      paymentStatus: false,
      client: {
        id: 2,
        name: 'Ciclano',
        phone: FONE_EXAMPLE,
      },
      car: {
        id: 2,
        name: 'PALIO',
        year: 2015,
        brand: 'FIAT',
      },
      plate: 'XYZ-9A87',
      carColor: 'Vermelho',
      principalEmployee: { id: 1, name: 'FABIO' },
    } },
  },
  {
    qtdUnit: 4,
    priceUnit: '250.00',
    itemName: { dataValues: { id: 2, name: 'DISCO DE FREIO',
    } },
    service: {
      id: 3,
      totalService: '1750.00',
      date: DATE_EXAMPLE,
      paymentStatus: false,
      client: {
        id: 2,
        name: 'Ciclano',
        phone: FONE_EXAMPLE,
      },
      carColor: 'Vermelho',
      plate: 'XYZ-9A87',
      car: {
        id: 2,
        name: 'PALIO',
        year: 2015,
        brand: 'FIAT',
      },
      principalEmployee: {
        id: 1,
        name: 'FABIO',
      } } },
];

export const findServiceMockEmployee = [
  { dataValues: {
    labor: '500.00',
    description: 'MÃO DE OBRA',
    employee: {
      id: 1,
      name: 'FABIO' } } },
];
export const finalFindServiceResult = {
  employees: [{
    labor: '500.00',
    description: 'MÃO DE OBRA',
    employee: {
      id: 1,
      name: 'FABIO',
    },
  },
  ],
  itens: [{
    id: 1,
    name: 'PASTILHA DE FREIO',
    qtdUnit: 2,
    priceUnit: '125.00',
  },
  {
    id: 2, name: 'DISCO DE FREIO', qtdUnit: 4, priceUnit: '250.00',
  },
  ],
  basicServiceData: {
    id: 3,
    totalService: '1750.00',
    date: DATE_EXAMPLE,
    paymentStatus: false,
    client: {
      id: 2,
      name: 'Ciclano',
      phone: FONE_EXAMPLE,
    },
    carColor: 'Vermelho',
    plate: 'XYZ-9A87',
    principalEmployee: { id: 1, name: 'FABIO' },
    car: { id: 2, name: 'PALIO', year: 2015, brand: 'FIAT' } },
};
