import IEmployee from '../interfaces/databaseModels/IEmployee';
import EmployeeModel from '../models/EmployeeModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';

export default class EmployeeService {
  constructor(private employeeModel = new EmployeeModel()) {}

  async insertEmployee(name: string): Promise<ServiceResponse<IEmployee>> {
    const result = await this.employeeModel.insertEmployee(name);
    return { status: 'CREATED', data: result };
  }

  async removeEmployee(id: number): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.employeeModel.removeEmployee(id);
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'funcionário não encontrado' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'funcionário excluído.' } };
  }

  async listEmployees(): Promise<ServiceResponse<IEmployee[]>> {
    const result = await this.employeeModel.listEmployees();
    return { status: 'SUCCESSFUL', data: result };
  }

  async updateEmployee({ id, name }: IEmployee): Promise<ServiceResponse<IEmployee>> {
    const result = await this.employeeModel.updateEmployee({ id, name });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'funcionário não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: { id, name } };
  }
}
