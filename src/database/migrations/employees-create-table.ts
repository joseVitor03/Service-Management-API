import { DataTypes, QueryInterface, Model } from 'sequelize';
import IEmployee from '../../interfaces/databaseModels/IEmployee';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IEmployee>>('employees', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('employees');
  },
};
