import { SimplifyFindServiceType, TypeInsertService, TypedData } from '../interfaces/IServiceModel';
import IServices from '../interfaces/databaseModels/IServices';
import ServiceModel from '../models/ServiceModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';
import simplifyFindService from '../utils/simplifyFindService';

export default class ServicesService {
  constructor(private serviceModel = new ServiceModel()) {}

  async listServices(): Promise<ServiceResponse<IServices[]>> {
    const result = await this.serviceModel.findAll();
    return { status: 'SUCCESSFUL', data: result };
  }

  async findService(id: number): Promise<ServiceResponse<SimplifyFindServiceType>> {
    const result = await this.serviceModel.findService(id);
    if (Object.keys(result.dataService).length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'serviço não encontrado.' } };
    }

    const finalResult = simplifyFindService(result as unknown as TypedData);
    return { status: 'SUCCESSFUL', data: finalResult };
  }

  async insertService(data: TypeInsertService): Promise<ServiceResponse<{ message: string }>> {
    await this.serviceModel.insertService(data);

    return { status: 'CREATED', data: { message: 'serviço registrado.' } };
  }

  async deleteService(id: number): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.serviceModel.deleteService(id);
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'serviço não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'serviço deletado.' } };
  }

  async updateStatusService({ id, paymentStatus }: { id: number, paymentStatus: boolean }):
  Promise<ServiceResponse<{ message: string }>> {
    const result = await this.serviceModel.updateStatusService({ id, paymentStatus });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'serviço não encontrado ou mesmo status.' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'status do serviço atualizado.' } };
  }

  async servicesByClient(clientId: number): Promise<ServiceResponse<IServices[]>> {
    const result = await this.serviceModel.servicesByClient(clientId);
    if (result.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'nenhum serviço encontrado deste cliente.' } };
    }
    return { status: 'SUCCESSFUL', data: result };
  }

  async servicesByDateInterval(data: { dateInitial: string; dateFinal: string; }):
  Promise<ServiceResponse<IServices[]>> {
    const result = await this.serviceModel.servicesByDatesInterval(data);
    if (result.length === 0) {
      return { status: 'NOT_FOUND',
        data: { message: 'Não possuí serviços nesse intervalo de datas.' } };
    }

    return { status: 'SUCCESSFUL', data: result };
  }
}
