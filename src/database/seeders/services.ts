import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('services', [
      {
        client_id: 1,
        total_service: 750.00,
        date: new Date(2024, 4, 19),
        payment_status: true,
      },
      {
        client_id: 2,
        total_service: 1750.00,
        date: new Date('2024-04-20'),
        payment_status: false,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('services', {});
  },
};
