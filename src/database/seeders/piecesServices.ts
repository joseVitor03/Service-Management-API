import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('pieces_services', [
      {
        service_id: 1,
        piece_id: 1,
        qtd_unit: 2,
        price_unit: 125,
      },
      {
        service_id: 2,
        piece_id: 2,
        qtd_unit: 4,
        price_unit: 250,
      },
      {
        service_id: 2,
        piece_id: 1,
        qtd_unit: 2,
        price_unit: 125,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('pieces_services', {});
  },
};
