import { Model, InferAttributes, InferCreationAttributes,
  DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizeCar extends Model<InferAttributes<SequelizeCar>,
InferCreationAttributes<SequelizeCar>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare year: number;

  declare brand: string;
}

SequelizeCar.init({
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
}, {
  tableName: 'cars',
  modelName: 'cars',
  timestamps: false,
  sequelize: db,
});

export default SequelizeCar;
