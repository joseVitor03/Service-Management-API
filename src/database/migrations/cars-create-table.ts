import { Model, QueryInterface, DataTypes } from 'sequelize';
import { ICar } from '../../interfaces/ICar';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ICar>>('cars', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('cars');
  },
};
