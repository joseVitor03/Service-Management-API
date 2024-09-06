import { Request, Response } from 'express';
import ServicesService from '../services/Service.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ServiceController {
  constructor(private servicesService = new ServicesService()) {}

  async listServicesPaymentStatusFalse(_req: Request, res: Response) {
    const { status, data } = await this.servicesService.listServicesPaymentStatusFalse();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listServicesPaymentStatusTrue(_req: Request, res: Response) {
    const { status, data } = await this.servicesService.listServicesPaymentStatusTrue();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findService(req: Request, res: Response) {
    const { id } = req.params;
    if (!Number(id)) {
      return res.status(400).json({ message: '"id" precisa ser um número' });
    }

    const { status, data } = await this.servicesService.findService(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async insertService(req:Request, res: Response) {
    const { clientId, carColor, plate, carId, totalService, date, itens, employeeServices, paymentStatus,
      principalEmployeeId,
    } = req.body;

    const { status, data } = await this.servicesService.insertService({ clientId,
      carColor, 
      plate, 
      carId,
      totalService,
      date,
      itens,
      paymentStatus,
      employeeServices,
      principalEmployeeId,
    });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteService(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.servicesService.deleteService(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateStatusService(req: Request, res: Response) {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const { status, data } = await this.servicesService
      .updateStatusService({ id: Number(id), paymentStatus });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async servicesByClient(req: Request, res: Response) {
    const { clientId } = req.params;
    if (!Number(clientId)) {
      return res.status(400).json({ message: '"clientId" precisa ser um número' });
    }

    const { status, data } = await this.servicesService.servicesByClient(Number(clientId));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async servicesByDateInterval(req: Request, res: Response) {
    const { dateInitial, dateFinal } = req.body;
    const { status, data } = await this.servicesService
      .servicesByDateInterval({ dateInitial, dateFinal });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
