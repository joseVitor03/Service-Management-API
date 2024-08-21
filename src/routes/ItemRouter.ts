import { Router, Request, Response } from 'express';
import ItemController from '../controller/Item.controller';
import Validate from '../middlewares/Validates';

const itemRouter = Router();
const itemController = new ItemController();
itemRouter.get(
  '/itens',
  Validate.validateToken,
  (req: Request, res: Response) => itemController.listItem(req, res),
);

itemRouter.get(
  '/itens/findItens',
  Validate.validateToken,
  (req: Request, res: Response) => itemController.findItem(req, res),
);

itemRouter.post(
  '/itens',
  Validate.validateToken,
  (req: Request, res: Response) => itemController.insertItem(req, res),
);
itemRouter.delete(
  '/itens/:id',
  Validate.validateToken,
  (req: Request, res: Response) => itemController.deleteItem(req, res),
);

itemRouter.patch(
  '/itens',
  Validate.validateToken,
  Validate.validateItem,
  (req: Request, res: Response) => itemController.updateItem(req, res),
);
export default itemRouter;
