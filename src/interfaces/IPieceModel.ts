import { IPieces } from './databaseModels/IPieces';

export interface IPieceModel {
  listPieces(): Promise<IPieces[]>;
  findPieces(name: string): Promise<IPieces[]>;
  insertPiece(name: string): Promise<IPieces>;
  deletePiece(id: number): Promise<number>;
  updatePiece({ id, name }: { id: number, name: string }): Promise<number>
}
