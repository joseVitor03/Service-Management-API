import IEmployee from './databaseModels/IEmployee';

export default interface IEmployeeModel {
  insertEmployee(name: string): Promise<IEmployee>;
  removeEmployee(id: number): Promise<number>;
  listEmployees(): Promise<IEmployee[]>;
  updateEmployee(employee: IEmployee): Promise<number>
}
