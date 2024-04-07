import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IClient } from '../../interfaces/databaseModels/IClient';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IClient>>('clients', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      carId: {
        type: DataTypes.INTEGER,
        field: 'car_id',
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('clients');
  },
};
