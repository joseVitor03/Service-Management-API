import { QueryInterface, Model, DataTypes } from 'sequelize';
import { IItens } from '../../interfaces/databaseModels/IItens';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IItens>>('itens', {
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
    return queryInterface.dropTable('itens');
  },
};
