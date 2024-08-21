import SequelizeEmployeeServices from '../database/models/7-SequelizeEmployeeServices';
import IItensServices from './databaseModels/IItensServices';
import IServices from './databaseModels/IServices';
import SequelizeServices from '../database/models/6-SequelizeServices';
import SequelizeItensServices from '../database/models/8-SequelizeItensServices';

export default interface IServiceModel {
  findAllServicesPaymentStatusFalse(): Promise<IServices[]>;
  findAllServicesPaymentStatusTrue(): Promise<IServices[]>;
  findService(id: number): Promise<IServiceResult>;
  insertService(data: TypeInsertService): Promise<InsertService>;
  deleteService(id: number): Promise<number>;
  updateStatusService({ id, paymentStatus }: { id: number,
    paymentStatus: boolean }): Promise<number>;
  servicesByClient(clientId: number): Promise<IServices[]>
  servicesByDatesInterval(data: { dateInitial: string, dateFinal: string }): Promise<IServices[]>
}

export interface InsertService {
  service: SequelizeServices;
  pieces: SequelizeItensServices[];
  employeeServices: SequelizeEmployeeServices[];

}

export interface IServiceResult {
  dataService: IItensServices[] | IServices[],
  employeesOfService: SequelizeEmployeeServices[]
}

interface Car {
  id: number;
  name: string;
  year: number;
  brand: string;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  carColor: string;
  plate: string;
  car: Car;
}

interface Service {
  id: number;
  totalService: string;
  date: string;
  client: { dataValues: Client };
}

export interface Employee {
  id: number;
  name: string;
}

export interface Itens {
  qtdUnit: number,
  priceUnit: string,
  itemName: {
    id: number,
    name: string
  }
}

export type EmployeeService = {
  labor: number,
  employeeId: number,
  description: string | null
};

export interface BasicDataService {
  id: number,
  totalService: string,
  date: string,
  paymentStatus: boolean,
  principalEmployee: Employee,
  client: {
    id: number,
    name: string,
    phone: string,
    carColor: string,
    plate: string,
    car: {
      id: number,
      name: string,
      year: number,
      brand: string
    }
  }
}

export interface TypedData {
  dataService: {
    qtdUnit: number,
    priceUnit: string,
    itemName: {
      id: number,
      name: string
    },
    service: Service
  }[],
  employeesOfService: {
    dataValues: {
      labor: string,
      description: string
      employee: Employee
    }
  }[]
}

export type SimplifyFindServiceType = {
  employees: {
    employee: Employee
    labor: string,
    description: string
  }[],
  itens: Itens[],
  basicServiceData: BasicDataService
};

export type TypeInsertService = {
  employeeServices: EmployeeService[],
  totalService: number;
  date: string;
  clientId: number;
  paymentStatus: boolean,
  principalEmployeeId: number,
  itens: {
    itemId: number;
    qtdUnit: number;
    priceUnit: number
  }[]
};
