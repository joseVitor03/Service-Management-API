import IEmployeeModel from '../interfaces/IEmployeeModel';
import SequelizeEmployee from '../database/models/SequelizeEmployee';
import IEmployee from '../interfaces/databaseModels/IEmployee';

export default class EmployeeModel implements IEmployeeModel {
  constructor(private model = SequelizeEmployee) {}
  async removeEmployee(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    return result;
  }

  async listEmployees(): Promise<IEmployee[]> {
    const result = await this.model.findAll();
    return result;
  }

  async updateEmployee(employee: IEmployee): Promise<number> {
    const { id, name } = employee;
    const [result] = await this.model.update({ name }, { where: { id } });
    return result;
  }

  async insertEmployee(name: string): Promise<IEmployee> {
    const [result] = await this.model.findOrCreate({ where: { name } });
    return result;
  }
}
