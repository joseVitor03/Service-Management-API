import { Model, CreationOptional, DataTypes,
  InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '.';
import SequelizeCar from './SequelizeCar';

class SequelizeClient extends Model<InferAttributes<SequelizeClient>,
InferCreationAttributes<SequelizeClient>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare phone: string;

  declare carId: number;

  declare color: string;

  declare plate: string;
}

SequelizeClient.init({
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
}, {
  modelName: 'clients',
  tableName: 'clients',
  sequelize: db,
  timestamps: false,
});

SequelizeClient.belongsTo(SequelizeCar, {
  foreignKey: 'carId',
  targetKey: 'id',
  as: 'car',
});

export default SequelizeClient;
