import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('employees', [
      {
        name: 'FABIO',
        active: true,
      },
      {
        name: 'LEANDRO',
        active: true,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('employees', {});
  },
};
