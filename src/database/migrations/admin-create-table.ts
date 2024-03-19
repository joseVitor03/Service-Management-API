import { DataTypes, QueryInterface, Model } from 'sequelize';
import { IAdmin } from '../../interfaces/databaseModels/IAdmin';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IAdmin>>('admins', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('admins');
  },
};
