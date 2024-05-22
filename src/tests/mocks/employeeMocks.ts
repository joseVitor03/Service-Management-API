export const mockFindAll = [{
  id: 1,
  name: 'Fabio',
}, {
  id: 2,
  name: 'Silvana',
}];

export const mockInsert = {
  id: 3,
  name: 'Leonardo',
};

export const employeeProductivityByDateFinalMock = [
  {
    labor: '250.00',
    description: 'MÃO DE OBRA',
    service: {
      id: 1,
      date: '2024-05-19',
      client: {
        id: 1,
        name: 'Fulano',
        carColor: 'Azul',
        plate: 'ABC-1B23',
        car: {
          id: 1,
          name: 'HONDA CIVIC',
          year: 2020,
          brand: 'HONDA',
        },
      },
    },
    employee: {
      id: 1,
      name: 'FABIO',
    },
  },
  {
    labor: '500.00',
    description: 'MÃO DE OBRA',
    service: {
      id: 2,
      date: '2024-04-20',
      client: {
        id: 2,
        name: 'Ciclano',
        carColor: 'Vermelho',
        plate: 'XYZ-9A87',
        car: {
          id: 2,
          name: 'PALIO',
          year: 2015,
          brand: 'FIAT',
        },
      },
    },
    employee: {
      id: 1,
      name: 'FABIO',
    },
  },
];

export const employeeProductivityByDateMock = [
  { dataValues: {
    labor: '250.00',
    description: null,
    service: {
      dataValues: {
        id: 1,
        totalService: '750.00',
        date: '2024-05-19',
        paymentStatus: true,
        client: {
          dataValues: {
            id: 1,
            name: 'Fulano',
            phone: '12345-6789',
            carColor: 'Azul',
            plate: 'ABC-1B23',
            car: {
              dataValues: {
                id: 1,
                name: 'HONDA CIVIC',
                year: 2020,
                brand: 'HONDA',
              },
            },
          },
        },
      },
    },
  },
  employee: {
    dataValues: {
      id: 1,
      name: 'FABIO',
    },
  },
  },
  {
    dataValues: {
      labor: '500.00',
      description: null,
      service: {
        dataValues: {
          id: 2,
          totalService: '1750.00',
          date: '2024-04-20',
          paymentStatus: false,
          client: {
            dataValues: {
              id: 2,
              name: 'Ciclano',
              phone: '98765-4321',
              carColor: 'Vermelho',
              plate: 'XYZ-9A87',
              car: {
                dataValues: {
                  id: 2,
                  name: 'PALIO',
                  year: 2015,
                  brand: 'FIAT',
                },
              },
            },
          },
        },
      },
    },
    employee: {
      dataValues: {
        id: 1,
        name: 'FABIO',
      },
    },
  },
];
