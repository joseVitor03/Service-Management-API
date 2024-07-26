import { ICar } from '../interfaces/databaseModels/ICar';
import CarModel from '../models/CarModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';

export default class CarService {
  constructor(private carModel = new CarModel()) {}

  async listCars(): Promise<ServiceResponse<ICar[]>> {
    const result = await this.carModel.listCars();
    return { status: 'SUCCESSFUL', data: result };
  }

  async insertCar({ name, brand, year }: Omit<ICar, 'id'>): Promise<ServiceResponse<ICar>> {
    const result = await this.carModel.insertCar({ name: name.toUpperCase(), brand, year });
    return { status: 'CREATED', data: result };
  }

  async removeCar({ name, brand, year }: Omit<ICar, 'id'>):
  Promise<ServiceResponse<Omit<ICar, 'id'>>> {
    const result = await this.carModel.removeCar({ name, year, brand });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'carro não encontrado' } };
    }

    return { status: 'SUCCESSFUL', data: { name, brand, year } };
  }

  async findCar(name: string): Promise<ServiceResponse<ICar[]>> {
    const result = await this.carModel.findCar(name);
    return { status: 'SUCCESSFUL', data: result };
  }

  async findCarByBrand(brand: string): Promise<ServiceResponse<ICar[]>> {
    const result = await this.carModel.findCarByBrand(brand);
    return { status: 'SUCCESSFUL', data: result };
  }

  async updateCar({ id, name, brand, year }: ICar): Promise<ServiceResponse<ICar>> {
    await this.carModel.updateCar({ id, name: name.toUpperCase(), brand, year });

    return { status: 'SUCCESSFUL', data: { id, name: name.toUpperCase(), brand, year } };
  }
}
