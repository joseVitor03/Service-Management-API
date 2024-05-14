import { Model, QueryInterface, DataTypes } from 'sequelize';
import IServices from '../../interfaces/databaseModels/IServices';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable <Model<IServices>>('services', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'client_id',
      },
      totalService: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'total_service',
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'payment_status',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('services');
  },
};
