import SequelizeEmployeeServices from '../database/models/7-SequelizeEmployeeServices';
import { EmployeeProductivityType, TypedEmployeeProductivity } from '../interfaces/IEmployeeModel';
import IEmployee from '../interfaces/databaseModels/IEmployee';
import EmployeeModel from '../models/EmployeeModel';
import { ServiceResponse } from '../utils/mapStatusHTTP';
import simplifyProductivityByDate from '../utils/simplifyProductivityByDate';

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

  async updateEmployee({ id, name }: Omit<IEmployee, 'active'>):
  Promise<ServiceResponse<Omit<IEmployee, 'active'>>> {
    const result = await this.employeeModel.updateEmployee({ id, name });
    if (result === 0) {
      return { status: 'NOT_FOUND', data: { message: 'funcionário não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: { id, name } };
  }

  async employeeProductivityByDate(data: { dateInitial: string; dateFinal: string; id: string }):
  Promise<ServiceResponse<EmployeeProductivityType[]>> {
    const result = await this.employeeModel.employeeProductivityByDate(data);
    if (result.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'nenhum serviço' } };
    }
    const resultFinal = simplifyProductivityByDate(result as
      unknown as TypedEmployeeProductivity[]);
    return { status: 'SUCCESSFUL', data: resultFinal };
  }

  async listServicesByEmployee(id: number): Promise<ServiceResponse<SequelizeEmployeeServices[]>> {
    const result = await this.employeeModel.listServicesByEmployee(id);
    return { status: 'SUCCESSFUL', data: result };
  }
}
