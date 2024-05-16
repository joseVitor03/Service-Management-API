import { Request, Response, Router } from 'express';
import ClientController from '../controller/Client.controller';
import Validate from '../middlewares/Validates';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get(
  '/clients',
  Validate.validateToken,
  (req: Request, res: Response) => clientController.listClients(req, res),
);

clientRouter.get(
  '/clients/findClient',
  Validate.validateToken,
  Validate.validateFindClient,
  (req: Request, res: Response) => clientController.findClient(req, res),
);

clientRouter.post(
  '/clients',
  Validate.validateToken,
  Validate.validateInsertClient,
  (req: Request, res: Response) => clientController.inserClient(req, res),
);

clientRouter.delete(
  '/clients/:id',
  Validate.validateToken,
  (req: Request, res: Response) => clientController.deleteClient(req, res),
);

clientRouter.put(
  '/clients/:id',
  Validate.validateToken,
  Validate.validateUpdateClient,
  (req: Request, res: Response) => clientController.updateClient(req, res),
);

export default clientRouter;
