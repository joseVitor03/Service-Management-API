import { Router, Request, Response } from 'express';
import PieceController from '../controller/Piece.controller';
import Validate from '../middlewares/Validates';

const pieceRouter = Router();
const pieceController = new PieceController();
pieceRouter.get('/pieces', (req: Request, res: Response) => pieceController.listPiece(req, res));

pieceRouter.get(
  '/pieces/findPieces',
  (req: Request, res: Response) => pieceController.findPieces(req, res),
);

pieceRouter.post(
  '/pieces',
  (req: Request, res: Response) => pieceController.insertPiece(req, res),
);
pieceRouter.delete(
  '/pieces/:id',
  (req: Request, res: Response) => pieceController.deletePiece(req, res),
);

pieceRouter.patch(
  '/pieces',
  Validate.validatePiece,
  (req: Request, res: Response) => pieceController.updatePiece(req, res),
);
export default pieceRouter;
