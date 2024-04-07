import { IClient } from './databaseModels/IClient';

export interface IClientModel {
  listClient(): Promise<IClient[]>;
  findClient({ name, plate }: { name: string, plate: string }): Promise<IClient[]>;
  deleteClient(id: number): Promise<number>;
  updateClient(client: IClient): Promise<[number]>;
  insertClient(client: Omit<IClient, 'id'>): Promise<IClient>;
}
