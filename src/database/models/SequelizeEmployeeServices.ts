import { Model, InferAttributes, InferCreationAttributes,
  DataTypes } from 'sequelize';
import db from '.';
import SequelizeServices from './SequelizeServices';
import SequelizeEmployee from './SequelizeEmployee';
import SequelizePiecesServices from './SequelizePiecesServices';

class SequelizeEmployeeServices extends Model<InferAttributes<SequelizeEmployeeServices>,
InferCreationAttributes<SequelizeEmployeeServices>> {
  declare serviceId: number;
  declare employeeId: number;
  declare labor: number;
  declare description: string;
}

SequelizeEmployeeServices.init({
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'service_id',
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'employee_id',
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

SequelizeEmployeeServices.belongsTo(SequelizePiecesServices, {
  foreignKey: 'serviceId',
  targetKey: 'serviceId',
  as: 'pieces',
});

SequelizeEmployeeServices.belongsTo(SequelizeEmployee, {
  foreignKey: 'employeeId',
  targetKey: 'id',
  as: 'employee',
});

export default SequelizeEmployeeServices;
