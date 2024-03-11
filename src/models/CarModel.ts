import SequelizeCar from '../database/models/SequelizeCar';
import { ICar } from '../interfaces/ICar';
import { ICarModel } from '../interfaces/ICarModel';

export default class CarModel implements ICarModel {
  private model = SequelizeCar;

  async listCars(): Promise<ICar[]> {
    const result = await this.model.findAll();
    return result;
  }
}
