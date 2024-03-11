import { Request, Response } from 'express';
import CarService from '../services/Car.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class CarController {
  constructor(private filmService = new CarService()) {}

  async listFilms(_req: Request, res: Response) {
    const { status, data } = await this.filmService.listCars();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
