import SequelizeEmployeeServices from '../database/models/SequelizeEmployeeServices';
import IPieceServices from './databaseModels/IPiecesServices';
import IServices from './databaseModels/IServices';
import SequelizeServices from '../database/models/SequelizeServices';
import SequelizePiecesServices from '../database/models/SequelizePiecesServices';

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
  pieces: SequelizePiecesServices[];
  employeeServices: SequelizeEmployeeServices[];

}

export interface IServiceResult {
  dataService: IPieceServices[] | IServices[],
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

export interface Pieces {
  qtdUnit: number,
  priceUnit: string,
  pieceName: {
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
    pieceName: {
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
  pieces: Pieces[],
  basicServiceData: BasicDataService
};

export type TypeInsertService = {
  employeeServices: EmployeeService[],
  totalService: number;
  date: string;
  clientId: number;
  paymentStatus: boolean
  pieces: {
    pieceId: number;
    qtdUnit: number;
    priceUnit: number
  }[]
};
