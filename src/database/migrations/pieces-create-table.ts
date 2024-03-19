import { QueryInterface, Model, DataTypes } from 'sequelize';
import { IPieces } from '../../interfaces/databaseModels/IPieces';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IPieces>>('pieces', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('pieces');
  },
};
