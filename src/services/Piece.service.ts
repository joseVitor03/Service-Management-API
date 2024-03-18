import { IPieces } from '../interfaces/databaseModels/IPieces';
import PieceModel from '../models/PieceModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';

export default class PieceService {
  constructor(private pieceModel = new PieceModel()) {}

  async listPieces(): Promise<ServiceResponse<IPieces[]>> {
    const result = await this.pieceModel.listPieces();
    return { status: 'SUCCESSFUL', data: result };
  }

  async findPieces(name: string): Promise<ServiceResponse<IPieces[]>> {
    const result = await this.pieceModel.findPieces(name.toUpperCase());
    return { status: 'SUCCESSFUL', data: result };
  }

  async insertPiece(name: string): Promise<ServiceResponse<IPieces>> {
    const result = await this.pieceModel.insertPiece(name.toUpperCase());
    return { status: 'CREATED', data: result };
  }
}
