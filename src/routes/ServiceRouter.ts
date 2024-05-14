import { Request, Response, Router } from 'express';
import ServiceController from '../controller/Service.controller';
import ValidateService from '../middlewares/ValidateService';
import Validate from '../middlewares/Validates';

const serviceRouter = Router();
const serviceController = new ServiceController();
const SERVICE_ROUTE = '/services';

serviceRouter.get(
  `${SERVICE_ROUTE}/client/:clientId`,
  Validate.validateToken,
  (req: Request, res: Response) => serviceController.servicesByClient(req, res),
);

serviceRouter.get(
  `${SERVICE_ROUTE}/findService/:id`,
  Validate.validateToken,
  (req: Request, res: Response) => serviceController.findService(req, res),
);

serviceRouter.get(
  `${SERVICE_ROUTE}/dates`,
  Validate.validateToken,
  ValidateService.validateDateService,
  (req: Request, res: Response) => serviceController.servicesByDateInterval(req, res),
);

serviceRouter.get(
  '/services',
  Validate.validateToken,
  (req: Request, res: Response) => serviceController.listServices(req, res),
);

serviceRouter.delete(
  `${SERVICE_ROUTE}/:id}`,
  Validate.validateToken,
  (req: Request, res: Response) => serviceController.deleteService(req, res),
);

serviceRouter.patch(
  `${SERVICE_ROUTE}/:id}`,
  Validate.validateToken,
  ValidateService.validateUpdateStatusService,
  (req: Request, res: Response) => serviceController.updateStatusService(req, res),
);

serviceRouter.post(
  '/services',
  Validate.validateToken,
  ValidateService.validateInsertService,
  (req: Request, res: Response) => serviceController.insertService(req, res),
);

export default serviceRouter;
