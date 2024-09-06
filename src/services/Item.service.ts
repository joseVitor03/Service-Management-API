import { IItens } from '../interfaces/databaseModels/IItens';
import ItensModel from '../models/ItensModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';

export default class ItemService {
  constructor(private itemModel = new ItensModel()) {}

  async listItens(): Promise<ServiceResponse<IItens[]>> {
    const result = await this.itemModel.listItens();
    return { status: 'SUCCESSFUL', data: result };
  }

  async findItem(name: string): Promise<ServiceResponse<IItens[]>> {
    const result = await this.itemModel.findItem(name.toUpperCase());

    return { status: 'SUCCESSFUL', data: result };
  }

  async insertItem(name: string): Promise<ServiceResponse<IItens>> {
    const result = await this.itemModel.insertItem(name.toUpperCase());

    return { status: 'CREATED', data: result };
  }

  async deleteItem(id: number): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.itemModel.deleteItem(id);
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Item não encontrado' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Item excluído com sucesso.' } };
  }

  async updateItem({ id, name }: { id: number, name: string }): Promise<ServiceResponse<IItens>> {
    const result = await this.itemModel.updateItem({ id, name: name.toUpperCase() });
    if (result === 0) {
      return { status: 'NOT_FOUND',
        data: { message: `Item não encontrado ou
      já possuí este item na base de dados` } };
    }
    return { status: 'SUCCESSFUL', data: { id, name } };
  }
}
