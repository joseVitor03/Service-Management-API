import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('employees', [
      {
        name: 'FABIO',
      },
      {
        name: 'LEANDRO',
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('employees', {});
  },
};
