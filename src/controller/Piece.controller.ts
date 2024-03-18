import { Request, Response } from 'express';
import PieceService from '../services/Piece.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class PieceController {
  constructor(private pieceService = new PieceService()) {}

  async listPiece(_req: Request, res: Response) {
    const { status, data } = await this.pieceService.listPieces();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findPieces(req: Request, res: Response) {
    const { name } = req.query;
    if (typeof name !== 'string' || name.length === 0) {
      return res.status(400).json({ message: 'Requisição com dados inválidos' });
    }
    const { status, data } = await this.pieceService.findPieces(name);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async insertPiece(req: Request, res: Response) {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.length < 4) {
      return res.status(400).json(
        { message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' },
      );
    }
    const { status, data } = await this.pieceService.insertPiece(name);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
