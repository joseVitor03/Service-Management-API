import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('clients', [
      {
        name: 'Fulano',
        phone: '12345-6789',
        car_id: 1,
        car_color: 'Azul',
        plate: 'ABC-1B23',
      },
      {
        name: 'Ciclano',
        phone: '98765-4321',
        car_id: 2,
        car_color: 'Vermelho',
        plate: 'XYZ-9A87',
      },
      // Adicione mais registros conforme necessário
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('clients', {});
  },
};
