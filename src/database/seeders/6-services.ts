import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('services', [
      {
        client_id: 1,
        car_id: 3,
        plate: 'ASD-1Q23',
        car_color: 'preto',
        total_service: 750.00,
        date: new Date(2024, 4, 19),
        payment_status: true,
        principal_employee_id: 2,
      },
      {
        client_id: 2,
        car_id: 55,
        plate: 'ASD-1Q24',
        car_color: 'vermelho',
        total_service: 1750.00,
        date: new Date('2024-04-20'),
        payment_status: false,
        principal_employee_id: 1,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('services', {});
  },
};
