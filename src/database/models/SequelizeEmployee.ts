import { InferCreationAttributes, InferAttributes,
  Model, DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizeEmployee extends Model<InferAttributes<SequelizeEmployee>,
InferCreationAttributes<SequelizeEmployee>> {
  declare id: CreationOptional<number>;

  declare name: string;
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
}, {
  sequelize: db,
  tableName: 'employees',
  timestamps: false,
  modelName: 'employees',
});

export default SequelizeEmployee;
