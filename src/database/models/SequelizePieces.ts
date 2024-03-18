import { Model, InferAttributes, InferCreationAttributes,
  DataTypes, CreationOptional } from 'sequelize';
import db from '.';

class SequelizePiece extends Model<InferAttributes<SequelizePiece>,
InferCreationAttributes<SequelizePiece>> {
  declare id: CreationOptional<number>;

  declare name: string;
}

SequelizePiece.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  tableName: 'pieces',
  timestamps: false,
  modelName: 'pieces',
});

export default SequelizePiece;
