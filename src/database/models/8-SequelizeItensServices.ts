import { Model, InferAttributes, InferCreationAttributes,
  DataTypes } from 'sequelize';
import db from '.';
import SequelizeServices from './6-SequelizeServices';
import SequelizeItens from './5-SequelizeItens';

class SequelizeItensServices extends Model<InferAttributes<SequelizeItensServices>,
InferCreationAttributes<SequelizeItensServices>> {
  declare serviceId: number;

  declare itemId: number;

  declare qtdUnit: number;

  declare priceUnit: number;
}

SequelizeItensServices.init({
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'service_id',
    references: {
      model: 'services',
      key: 'id',
    },
  },
  qtdUnit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'qtd_unit',
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    field: 'item_id',
    references: {
      model: 'itens',
      key: 'id',
    },
  },
  priceUnit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'price_unit',
  },
}, {
  timestamps: false,
  sequelize: db,
  tableName: 'itens_services',
  modelName: 'itensServices',
});

SequelizeItensServices.belongsTo(SequelizeItens, {
  foreignKey: 'itemId',
  targetKey: 'id',
  as: 'itemName',
});

SequelizeItensServices.belongsTo(SequelizeServices, {
  foreignKey: 'serviceId',
  targetKey: 'id',
  as: 'service',
});

export default SequelizeItensServices;
