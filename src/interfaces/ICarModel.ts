import { ICar } from './databaseModels/ICar';

export interface ICarModel {
  listCars(): Promise<ICar[]>;
  insertCar({ name, brand, year }: { name: string, brand: string, year: number }): Promise<ICar>;
  removeCar({ name, brand, year }: Omit<ICar, 'id'>): Promise<number>;
  findCar(name: string): Promise<ICar[]>;
  findCarByBrand(brand: string): Promise<ICar[]>
  updateCar({ id, name, brand, year }: ICar): Promise<number>;
}
