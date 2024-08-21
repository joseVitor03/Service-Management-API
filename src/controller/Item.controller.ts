import { Request, Response } from 'express';
import ItemService from '../services/Item.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ItemController {
  constructor(private pieceService = new ItemService()) {}

  async listItem(_req: Request, res: Response) {
    const { status, data } = await this.pieceService.listItens();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async findItem(req: Request, res: Response) {
    const { name } = req.query;
    if (typeof name !== 'string' || name.length === 0) {
      return res.status(400).json({ message: 'Requisição com dados inválidos' });
    }
    const { status, data } = await this.pieceService.findItem(name);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async insertItem(req: Request, res: Response) {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.length < 4) {
      return res.status(400).json(
        { message: 'Para cadastrar um novo item precisa ter pelo menos 4 caracteres' },
      );
    }
    const { status, data } = await this.pieceService.insertItem(name);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteItem(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.pieceService.deleteItem(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateItem(req: Request, res: Response) {
    const { id, name } = req.body;
    const { status, data } = await this.pieceService.updateItem({ id, name });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
