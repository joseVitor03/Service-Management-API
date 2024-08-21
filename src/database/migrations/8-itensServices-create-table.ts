import { Model, DataTypes, QueryInterface } from 'sequelize';
import IItensServices from '../../interfaces/databaseModels/IItensServices';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IItensServices>>('itens_services', {
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'service_id',
        references: {
          model: 'services',
          key: 'id',
        },
      },
      qtdUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'qtd_unit',
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        field: 'item_id',
        references: {
          model: 'itens',
          key: 'id',
        },
      },
      priceUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'price_unit',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('itens_services');
  },
};
