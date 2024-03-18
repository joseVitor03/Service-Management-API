import { Op } from 'sequelize';
import SequelizePiece from '../database/models/SequelizePieces';
import { IPieceModel } from '../interfaces/IPieceModel';
import { IPieces } from '../interfaces/databaseModels/IPieces';

export default class PieceModel implements IPieceModel {
  constructor(private model = SequelizePiece) {}
  async insertPiece(name: string): Promise<IPieces> {
    const [result] = await this.model.findOrCreate({ where: { name } });
    return result;
  }

  async findPieces(name: string): Promise<IPieces[]> {
    const result = await this.model.findAll({ where: { name: {
      [Op.like]: `%${name}%`,
    } } });
    return result;
  }

  async listPieces(): Promise<IPieces[]> {
    const result = await this.model.findAll();
    return result;
  }
}
