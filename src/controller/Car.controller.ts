import { Request, Response } from 'express';
import CarService from '../services/Car.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class CarController {
  constructor(private carService = new CarService()) {}

  async listCars(_req: Request, res: Response) {
    const { status, data } = await this.carService.listCars();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async insertCar(req: Request, res: Response) {
    const { name, brand, year } = req.body;
    const { status, data } = await this.carService.insertCar({ name, year, brand });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async removeCar(req: Request, res: Response) {
    const { name, brand, year } = req.body;
    const { status, data } = await this.carService.removeCar({ name, year, brand });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findCar(req: Request, res: Response) {
    const { name } = req.query;
    if (typeof name === 'string') {
      const { status, data } = await this.carService.findCar(name);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    return res.status(400).json({ message: 'Bad Request' });
  }

  async updateCar(req: Request, res: Response) {
    const { id, name, brand, year } = req.body;
    const { status, data } = await this.carService.updateCar({ id, name, brand, year });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
