import { Request, Response, Router } from 'express';
import CarController from '../controller/Car.controller';
import Validate from '../middlewares/Validates';

const carsRouter = Router();
const carController = new CarController();

carsRouter.get(
  '/cars',
  Validate.validateToken,
  (req: Request, res: Response) => carController.listCars(req, res),
);

carsRouter.get(
  '/cars/findCars',
  Validate.validateToken,
  (req: Request, res: Response) => carController.findCar(req, res),
);

carsRouter.post(
  '/cars',
  Validate.validateCar,
  Validate.validateToken,
  (req: Request, res: Response) => carController.insertCar(req, res),
);

carsRouter.patch(
  '/cars',
  Validate.validateCar,
  Validate.validateToken,
  (req: Request, res: Response) => carController.updateCar(req, res),
);

carsRouter.delete(
  '/cars',
  Validate.validateCar,
  Validate.validateToken,
  (req: Request, res: Response) => carController.removeCar(req, res),
);

export default carsRouter;
