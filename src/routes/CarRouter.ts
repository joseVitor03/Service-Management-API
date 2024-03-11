import { Request, Response, Router } from 'express';
import CarController from '../controller/Car.controller';

const carsRouter = Router();
const carController = new CarController();

carsRouter.get('/cars', (req: Request, res: Response) => carController.listFilms(req, res));
// filmsRouter.get('/films/:id', (req: Request, res: Response) => filmController.findFilm(req, res));

export default carsRouter;
