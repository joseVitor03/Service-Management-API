import { Op } from 'sequelize';
import SequelizeItens from '../database/models/5-SequelizeItens';
import { IItensModel } from '../interfaces/IItensModel';
import { IItens } from '../interfaces/databaseModels/IItens';

export default class itensModel implements IItensModel {
  constructor(private model = SequelizeItens) {}

  async deleteItem(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    return result;
  }

  async updateItem({ id, name }: { id: number; name: string; }): Promise<number> {
    const item = await this.model.findOne({ where: { name } });
    if (item === null) {
      const [result] = await this.model.update({ name }, { where: { id } });
      return result;
    }

    return 0;
  }

  async insertItem(name: string): Promise<IItens> {
    const [result] = await this.model.findOrCreate({ where: { name } });
    return result;
  }

  async findItem(name: string): Promise<IItens[]> {
    const result = await this.model.findAll({ where: { name: {
      [Op.like]: `%${name}%`,
    } },
    order: [['id', 'ASC']] });
    return result;
  }

  async listItens(): Promise<IItens[]> {
    const result = await this.model.findAll({ order: [['id', 'ASC']] });
    return result;
  }
}
