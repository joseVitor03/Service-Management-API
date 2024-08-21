import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('itens_services', [
      {
        service_id: 1,
        item_id: 1,
        qtd_unit: 2,
        price_unit: 125,
      },
      {
        service_id: 2,
        item_id: 2,
        qtd_unit: 4,
        price_unit: 250,
      },
      {
        service_id: 2,
        item_id: 1,
        qtd_unit: 2,
        price_unit: 125,
      },
    ], {});
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('itens_services', {});
  },
};
