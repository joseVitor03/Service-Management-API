import { ICar } from './ICar';

export interface ICarModel {
  listCars(): Promise<ICar[]>
}
