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
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
        references: {
          model: 'cars',
          key: 'id',
        },
      },
      plate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carColor: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'car_color',
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'client_id',
        references: {
          model: 'clients',
          key: 'id',
        },
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
      principalEmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'principal_employee_id',
        references: { model: 'employees', key: 'id' },
      } });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('services');
  },
};
