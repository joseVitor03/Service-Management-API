import { Request, Response } from 'express';
import ClientService from '../services/Client.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ClientController {
  constructor(private clientService = new ClientService()) {}

  async listClients(req: Request, res: Response) {
    const { status, data } = await this.clientService.listClients();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async clientById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.clientService.clientById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findClient(req: Request, res: Response) {
    const { name, plate } = req.body;
    const { status, data } = await this.clientService.findClient({ name, plate });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteClient(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.clientService.deleteClient(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateClient(req: Request, res: Response) {
    const { id } = req.params;
    const { name, phone, plate, carId, carColor } = req.body;
    const { status, data } = await this.clientService.updateClient({ id: Number(id),
      name,
      phone,
      plate,
      carId,
      carColor });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async inserClient(req: Request, res: Response) {
    const { name, phone, plate, carId, carColor } = req.body;

    const { status, data } = await this.clientService.insertClient({ name,
      phone,
      plate,
      carId,
      carColor });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
