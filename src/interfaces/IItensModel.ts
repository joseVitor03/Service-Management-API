import { IItens } from './databaseModels/IItens';

export interface IItensModel {
  listItens(): Promise<IItens[]>;
  findItem(name: string): Promise<IItens[]>;
  insertItem(name: string): Promise<IItens>;
  deleteItem(id: number): Promise<number>;
  updateItem({ id, name }: { id: number, name: string }): Promise<number>
}
