import { Op } from 'sequelize';
import SequelizePiece from '../database/models/SequelizePieces';
import { IPieceModel } from '../interfaces/IPieceModel';
import { IPieces } from '../interfaces/databaseModels/IPieces';

export default class PieceModel implements IPieceModel {
  constructor(private model = SequelizePiece) {}
  async deletePiece(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    return result;
  }

  async updatePiece({ id, name }: { id: number; name: string; }): Promise<number> {
    const [result] = await this.model.update({ name }, { where: { id } });
    return result;
  }

  async insertPiece(name: string): Promise<IPieces> {
    const [result] = await this.model.findOrCreate({ where: { name } });
    return result;
  }

  async findPieces(name: string): Promise<IPieces[]> {
    const result = await this.model.findAll({ where: { name: {
      [Op.like]: `%${name}%`,
    } },
    order: [['id', 'ASC']] });
    return result;
  }

  async listPieces(): Promise<IPieces[]> {
    const result = await this.model.findAll({ order: [['id', 'ASC']] });
    return result;
  }
}
