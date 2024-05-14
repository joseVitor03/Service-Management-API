import { Model, InferAttributes, InferCreationAttributes,
  DataTypes, CreationOptional } from 'sequelize';
import db from '.';
import SequelizeClient from './SequelizeClient';

class SequelizeServices extends Model<InferAttributes<SequelizeServices>,
InferCreationAttributes<SequelizeServices>> {
  declare id: CreationOptional<number>;

  declare clientId: number;

  declare totalService: number;

  declare date: string;

  declare paymentStatus: boolean;
}

SequelizeServices.init({
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
}, {
  timestamps: false,
  sequelize: db,
  tableName: 'services',
  modelName: 'services',
});

SequelizeServices.belongsTo(SequelizeClient, {
  foreignKey: 'clientId',
  targetKey: 'id',
  as: 'client',
});

export default SequelizeServices;
