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

  async clientById(id: number): Promise<ServiceResponse<IClient>> {
    const result = await this.clientModel.clientById(id);
    if (!result) {
      return { status: 'NOT_FOUND', data: { message: 'cliente não encontrado' } };
    }
    return { status: 'SUCCESSFUL', data: result };
  }

  async findClient({ name, plate }: { name: string, plate: string }):
  Promise<ServiceResponse<IClient[]>> {
    const result = await this.clientModel.findClient({
      name: name.toLocaleUpperCase(), plate: plate.toLocaleUpperCase() });

    if (result.length === 0) {
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
    const { id, name, phone, plate, carId, carColor } = client;
    const car = await this.carModel.listCars();
    if (!car.find((c) => c.id === carId)) {
      return { status: 'NOT_FOUND', data: { message: 'carro inexistente' } };
    }
    const [result] = await this.clientModel.updateClient({ id,
      name: name.toLocaleUpperCase(),
      phone,
      plate: plate.toLocaleUpperCase(),
      carId,
      carColor: carColor.toLocaleUpperCase() });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'cliente inexistente.' } };
    }
    return { status: 'SUCCESSFUL', data: client };
  }

  async insertClient(client: Omit<IClient, 'id'>): Promise<ServiceResponse<IClient>> {
    const result = await this.clientModel.insertClient({ ...client,
      name: client.name.toLocaleUpperCase(),
      plate: client.plate.toLocaleUpperCase(),
      carColor: client.carColor.toLocaleUpperCase(),
    });
    return { status: 'CREATED', data: result };
  }
}
