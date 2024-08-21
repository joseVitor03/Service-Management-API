import { Model, DataTypes, QueryInterface } from 'sequelize';
import IEmployeeServices from '../../interfaces/databaseModels/IEmployeeServices';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IEmployeeServices>>('employee_services', {
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
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'employee_id',
        references: {
          model: 'employees',
          key: 'id',
        },
      },
      labor: {
        allowNull: true,
        type: DataTypes.DECIMAL(10, 2),
      },
      description: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('employee_services');
  },
};
