import { InferCreationAttributes, InferAttributes,
  Model, DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizeEmployee extends Model<InferAttributes<SequelizeEmployee>,
InferCreationAttributes<SequelizeEmployee>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare active: boolean;
}

SequelizeEmployee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'employees',
  timestamps: false,
  modelName: 'employees',
});

export default SequelizeEmployee;
