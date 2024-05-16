import SequelizeEmployeeServices from '../database/models/SequelizeEmployeeServices';
import IEmployee from './databaseModels/IEmployee';

export default interface IEmployeeModel {
  insertEmployee(name: string): Promise<IEmployee>;
  removeEmployee(id: number): Promise<number>;
  listEmployees(): Promise<IEmployee[]>;
  updateEmployee(employee: IEmployee): Promise<number>;
  employeeProductivityByDate(data: { dateInitial: string, dateFinal: string, id: string }):
  Promise<SequelizeEmployeeServices[]>
}

export type EmployeeProductivityType = {
  labor: number,
  description: string,
  service: {
    id: number,
    date: string,
    client: {
      id: number,
      name: string,
      carColor: string,
      plate: string,
      car: {
        id: number,
        name: string,
        year: number,
        brand: string
      }
    }
  },
  employee: {
    id: number,
    name: string
  }
};

export interface TypedEmployeeProductivity {
  dataValues: {
    labor: number,
    description: string,
    service: {
      dataValues: {
        id: number,
        totalService: number,
        date: string,
        paymentStatus: boolean,
        client: {
          dataValues: {
            id: number,
            name: string,
            phone: string,
            carColor: string,
            plate: string,
            car: {
              dataValues: {
                id: number,
                name: string,
                year: number,
                brand: string
              }
            }
          }
        }
      }
    }
  },
  employee: {
    dataValues: {
      id: number,
      name: string
    }
  }
}
