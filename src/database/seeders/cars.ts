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
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('cars', {});
  },
};
