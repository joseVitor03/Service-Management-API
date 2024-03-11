import { ICar } from '../interfaces/ICar';
import CarModel from '../models/CarModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';

export default class CarService {
  constructor(private filmModel = new CarModel()) {
    this.filmModel = filmModel;
  }

  async listCars(): Promise<ServiceResponse<ICar[]>> {
    const result = await this.filmModel.listCars();
    return { status: 'SUCCESSFUL', data: result };
  }
}
