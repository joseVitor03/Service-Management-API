import { Request, Response } from 'express';
import EmployeeService from '../services/Employee.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class EmployeeController {
  constructor(private employeeService = new EmployeeService()) {}

  async insertEmployee(req: Request, res: Response) {
    const { name } = req.body;
    const { status, data } = await this.employeeService.insertEmployee(name);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async removeEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.employeeService.removeEmployee(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async listEmployees(_req: Request, res: Response) {
    const { status, data } = await this.employeeService.listEmployees();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateEmployee(req: Request, res: Response) {
    const { id, name } = req.body;
    const { status, data } = await this.employeeService.updateEmployee({ id, name });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
