import { IClient } from '../interfaces/databaseModels/IClient';
import ClientModel from '../models/ClientModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';
import CarModel from '../models/CarModel';

export default class ClientService {
  constructor(private clientModel = new ClientModel(), private carModel = new CarModel()) {}

  async listClients(): Promise<ServiceResponse<IClient[]>> {
    const result = await this.clientModel.listClient();
    return { status: 'SUCCESSFUL', data: result };
  }

  async findClient({ name, plate }: { name: string, plate: string }):
  Promise<ServiceResponse<IClient[]>> {
    const result = await this.clientModel.findClient({ name, plate });
    if (!result) {
      return { status: 'NOT_FOUND', data: { message: 'cliente não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: result };
  }

  async deleteClient(id: number): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.clientModel.deleteClient(id);
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'cliente não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'cliente excluído' } };
  }

  async updateClient(client: IClient): Promise<ServiceResponse<IClient>> {
    const { id, name, phone, plate, carId, color } = client;
    const car = await this.carModel.listCars();
    if (!car.find((c) => c.id === carId)) {
      return { status: 'NOT_FOUND', data: { message: 'carro inexistente' } };
    }
    const foundClient = await this.findClient({ name, plate });
    if (foundClient.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND', data: foundClient.data };
    }
    await this.clientModel.updateClient({ id, name, phone, plate, carId, color });
    return { status: 'SUCCESSFUL', data: client };
  }

  async insertClient(client: Omit<IClient, 'id'>): Promise<ServiceResponse<IClient>> {
    const result = await this.clientModel.insertClient(client);
    return { status: 'CREATED', data: result };
  }
}
