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

  async deletePiece(id: number): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.pieceModel.deletePiece(id);
    if (result === 0) {
      return { status: 'INVALID_DATA', data: { message: 'Peça não encontrada' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Peça excluída com sucesso.' } };
  }

  async updatePiece({ id, name }: { id: number, name: string }): Promise<ServiceResponse<IPieces>> {
    const result = await this.pieceModel.updatePiece({ id, name: name.toUpperCase() });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Peça não encontrada' } };
    }
    return { status: 'SUCCESSFUL', data: { id, name } };
  }
}
