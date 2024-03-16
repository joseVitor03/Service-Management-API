import { Op } from 'sequelize';
import SequelizeCar from '../database/models/SequelizeCar';
import { ICar } from '../interfaces/databaseModels/ICar';
import { ICarModel } from '../interfaces/ICarModel';

export default class CarModel implements ICarModel {
  private model = SequelizeCar;

  async listCars(): Promise<ICar[]> {
    const result = await this.model.findAll();
    return result;
  }

  async insertCar({ name, brand, year }: { name: string; brand: string; year: number; }):
  Promise<ICar> {
    const [result] = await this.model.findOrCreate({ where: { name, brand, year } });
    return result;
  }

  async removeCar({ name, brand, year }: Omit<ICar, 'id'>): Promise<number> {
    const result = await this.model.destroy({ where: { name, brand, year } });
    return result;
  }

  async findCar(name: string): Promise<ICar[]> {
    const result = await this.model.findAll({ where: {
      name: { [Op.like]: `%${name.toUpperCase()}%` },
    } });
    return result;
  }

  async updateCar({ id, name, brand, year }: ICar): Promise<number> {
    const [result] = await this.model.update({ name, brand, year }, { where: { id } });
    return result;
  }
}
