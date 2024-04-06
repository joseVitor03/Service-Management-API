import { Router, Request, Response } from 'express';
import PieceController from '../controller/Piece.controller';
import Validate from '../middlewares/Validates';

const pieceRouter = Router();
const pieceController = new PieceController();
pieceRouter.get(
  '/pieces',
  Validate.validateToken,
  (req: Request, res: Response) => pieceController.listPiece(req, res),
);

pieceRouter.get(
  '/pieces/findPieces',
  Validate.validateToken,
  (req: Request, res: Response) => pieceController.findPieces(req, res),
);

pieceRouter.post(
  '/pieces',
  Validate.validateToken,
  (req: Request, res: Response) => pieceController.insertPiece(req, res),
);
pieceRouter.delete(
  '/pieces/:id',
  Validate.validateToken,
  (req: Request, res: Response) => pieceController.deletePiece(req, res),
);

pieceRouter.patch(
  '/pieces',
  Validate.validateToken,
  Validate.validatePiece,
  (req: Request, res: Response) => pieceController.updatePiece(req, res),
);
export default pieceRouter;
