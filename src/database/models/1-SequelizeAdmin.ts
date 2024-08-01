import { Model, InferAttributes, InferCreationAttributes,
  DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizeAdmin extends Model<InferAttributes<SequelizeAdmin>,
InferCreationAttributes<SequelizeAdmin>> {
  declare id: CreationOptional<number>;

  declare email: string;

  declare password: string;
}

SequelizeAdmin.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'admin',
  tableName: 'admins',
  timestamps: false,
});

export default SequelizeAdmin;
