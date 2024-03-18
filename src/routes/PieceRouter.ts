import { Router, Request, Response } from 'express';
import PieceController from '../controller/Piece.controller';

const pieceRouter = Router();
const pieceController = new PieceController();
pieceRouter.get('/pieces', (req: Request, res: Response) => pieceController.listPiece(req, res));

pieceRouter.get(
  '/pieces/findPieces',
  (req: Request, res: Response) => pieceController.findPieces(req, res),
);

pieceRouter.post('/pieces', (req: Request, res: Response) => pieceController.insertPiece(req, res));

export default pieceRouter;
