import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('employee_services', [
      {
        service_id: 2,
        employee_id: 1,
        labor: 500.00,
      },
      {
        service_id: 1,
        employee_id: 2,
        labor: 250.00,
        description: 'alinhamento de cabeçote',
      },
      {
        service_id: 1,
        employee_id: 1,
        labor: 250.00,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('employee_services', {});
  },
};
