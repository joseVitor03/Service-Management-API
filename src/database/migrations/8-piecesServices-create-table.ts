import { Model, DataTypes, QueryInterface } from 'sequelize';
import IPieceServices from '../../interfaces/databaseModels/IPiecesServices';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IPieceServices>>('pieces_services', {
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
      pieceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        field: 'piece_id',
        references: {
          model: 'pieces',
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
    return queryInterface.dropTable('pieces_services');
  },
};
