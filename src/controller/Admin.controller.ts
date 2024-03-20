import { Request, Response } from 'express';
import AdminService from '../services/Admin.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class AdminController {
  constructor(private adminService = new AdminService()) {}

  async insertAdmin(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.adminService.insertAdmin({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.adminService.loginAdmin({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async deleteAdmin(req: Request, res: Response) {
    const { email } = req.body;
    const { status, data } = await this.adminService.deleteAdmin({ email });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
