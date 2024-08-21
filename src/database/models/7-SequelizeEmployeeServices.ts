import { Model, InferAttributes, InferCreationAttributes,
  DataTypes } from 'sequelize';
import db from '.';
import SequelizeServices from './6-SequelizeServices';
import SequelizeEmployee from './4-SequelizeEmployee';

class SequelizeEmployeeServices extends Model<InferAttributes<SequelizeEmployeeServices>,
InferCreationAttributes<SequelizeEmployeeServices>> {
  declare serviceId: number;
  declare employeeId: number;
  declare labor: number | null;
  declare description: string | null;
}

SequelizeEmployeeServices.init({
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
    // references: {
    //   model: 'employees',
    //   key: 'id',
    // },
  },
  labor: {
    allowNull: true,
    type: DataTypes.DECIMAL(10, 2),
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
}, {
  sequelize: db,
  modelName: 'employeeServices',
  tableName: 'employee_services',
  timestamps: false,
});

SequelizeEmployeeServices.belongsTo(SequelizeServices, {
  foreignKey: 'serviceId',
  targetKey: 'id',
  as: 'service',
});

SequelizeEmployeeServices.belongsTo(SequelizeEmployee, {
  foreignKey: 'employeeId',
  targetKey: 'id',
  as: 'employee',
});

export default SequelizeEmployeeServices;
