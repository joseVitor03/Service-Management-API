import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('pieces', [
      {
        name: 'PASTILHA DE FREIO',
      },
      {
        name: 'DISCO DE FREIO',
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('pieces', {});
  },
};
