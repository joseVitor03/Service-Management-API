import { Model, InferAttributes, InferCreationAttributes,
  DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizeItens extends Model<InferAttributes<SequelizeItens>,
InferCreationAttributes<SequelizeItens>> {
  declare id: CreationOptional<number>;

  declare name: string;
}

SequelizeItens.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
}, {
  sequelize: db,
  tableName: 'itens',
  timestamps: false,
  modelName: 'itens',
});

export default SequelizeItens;
