import { Model, CreationOptional, DataTypes,
  InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '.';
import SequelizeCar from './2-SequelizeCar';

class SequelizeClient extends Model<InferAttributes<SequelizeClient>,
InferCreationAttributes<SequelizeClient>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare phone: string;

  declare carId: number;

  declare carColor: string;

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
    references: {
      model: 'cars',
      key: 'id',
    },
    allowNull: false,
  },
  carColor: {
    type: DataTypes.STRING,
    field: 'car_color',
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
  foreignKey: 'carId', // deve ser 'carId' para alinhar com o campo em SequelizeClient
  targetKey: 'id',
  as: 'car',
});

export default SequelizeClient;
