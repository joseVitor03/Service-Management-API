const honda = 'HONDA CIVIC';

export const mockListClients = [
  {
    id: 1,
    name: 'Fulano',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: honda,
      year: 2020,
      brand: 'HONDA',
    },
  },
  {
    id: 2,
    name: 'Ciclano',
    phone: '98765-4321',
    carColor: 'Vermelho',
    plate: 'XYZ-9A87',
    car: null,
  },
];

export const mockFindClient = [
  {
    id: 1,
    name: 'Fulano',
    phone: '12345-6789',
    carColor: 'Azul',
    plate: 'ABC-1B23',
    car: {
      id: 1,
      name: honda,
      year: 2020,
      brand: 'HONDA',
    },
  },
];

export const mockInsertClient = {
  id: 3,
  name: 'Vitor',
  phone: '61998227449',
  carColor: 'PRATA',
  plate: 'MCH1B23',
  car: {
    id: 1,
    name: honda,
    year: 2020,
    brand: 'HONDA',
  },
};

export const mockUpdateClient = {
  id: 2,
  name: 'Fbio',
  phone: '61998227449',
  plate: 'MCH1A24',
  carId: 1,
  carColor: 'PRATA',
};
