import { Model, InferAttributes, InferCreationAttributes,
  DataTypes } from 'sequelize';
import db from '.';
import SequelizeServices from './SequelizeServices';
import SequelizePiece from './SequelizePieces';

class SequelizePiecesServices extends Model<InferAttributes<SequelizePiecesServices>,
InferCreationAttributes<SequelizePiecesServices>> {
  declare serviceId: number;

  declare pieceId: number;

  declare qtdUnit: number;

  declare priceUnit: number;
}

SequelizePiecesServices.init({
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'service_id',
  },
  qtdUnit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'qtd_unit',
  },
  pieceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    field: 'piece_id',
  },
  priceUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'price_unit',
  },
}, {
  timestamps: false,
  sequelize: db,
  tableName: 'pieces_services',
  modelName: 'piecesServices',
});

SequelizePiecesServices.belongsTo(SequelizePiece, {
  foreignKey: 'pieceId',
  targetKey: 'id',
  as: 'pieceName',
});

SequelizePiecesServices.belongsTo(SequelizeServices, {
  foreignKey: 'serviceId',
  targetKey: 'id',
  as: 'service',
});

export default SequelizePiecesServices;
