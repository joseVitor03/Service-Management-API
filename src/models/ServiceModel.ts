import { Op } from 'sequelize';
import IServiceModel, { IServiceResult,
  InsertService, TypeInsertService } from '../interfaces/IServiceModel';
import SequelizeServices from '../database/models/6-SequelizeServices';
import SequelizeClient from '../database/models/3-SequelizeClient';
import SequelizeItensServices from '../database/models/8-SequelizeItensServices';
import SequelizeEmployeeServices from '../database/models/7-SequelizeEmployeeServices';
import SequelizeCar from '../database/models/2-SequelizeCar';
import SequelizeEmployee from '../database/models/4-SequelizeEmployee';
import SequelizeItens from '../database/models/5-SequelizeItens';
import IServices from '../interfaces/databaseModels/IServices';
import IItensServices from '../interfaces/databaseModels/IItensServices';
import IEmployeeServices from '../interfaces/databaseModels/IEmployeeServices';

export default class ServiceModel implements IServiceModel {
  private employeeService = SequelizeEmployeeServices;
  private itensServices = SequelizeItensServices;
  constructor(private model = SequelizeServices) {}

  async updateStatusService({ id, paymentStatus }: { id: number; paymentStatus: boolean }):
  Promise<number> {
    const [result] = await this.model.update({ paymentStatus }, { where: { id } });
    return result;
  }

  async findAllServicesPaymentStatusTrue(): Promise<IServices[]> {
    const result = await this.model.findAll({
      where: { paymentStatus: true },
      include: [{
        model: SequelizeClient,
        as: 'client',
        attributes: { exclude: ['carId'] }, // Exclua o atributo carId do cliente
        include: [{
          model: SequelizeCar,
          as: 'car',
        }],
      }, {
        model: SequelizeEmployee, as: 'principalEmployee',
      }],
      order: [['date', 'DESC']],
      attributes: { exclude: ['clientId', 'principalEmployeeId'] }, // Exclua clientId do resultado principal
    });
    return result;
  }

  async deleteService(id: number): Promise<number> {
    await this.employeeService.destroy({ where: { serviceId: id } });
    await this.itensServices.destroy({ where: { serviceId: id } });
    const result = await this.model.destroy({ where: { id } });

    return result;
  }

  async findAllServicesPaymentStatusFalse(): Promise<IServices[]> {
    const result = await this.model.findAll({
      where: { paymentStatus: false },
      include: [{
        model: SequelizeClient,
        as: 'client',
        attributes: { exclude: ['carId'] }, // Exclua o atributo carId do cliente
        include: [{
          model: SequelizeCar,
          as: 'car',
        }],
      }, {
        model: SequelizeEmployee, as: 'principalEmployee',
      }],
      order: [['date', 'DESC']],
      attributes: { exclude: ['clientId', 'principalEmployeeId'] }, // Exclua clientId do resultado principal
    });
    return result;
  }

  async findService(id: number): Promise<IServiceResult> {
    const dataService = await this.itensServices.findAll({ where: { serviceId: id },
      attributes: { exclude: ['serviceId', 'itemId'] },
      include: [{ model: SequelizeItens, as: 'itemName' }, {
        model: SequelizeServices,
        as: 'service',
        attributes: { exclude: ['clientId', 'principalEmployeeId'] },
        include: [{
          model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{ model: SequelizeCar, as: 'car' }] }, {
          model: SequelizeEmployee, as: 'principalEmployee',
        }] }] });

    const employeesOfService = await this.employeeService.findAll({ where: { serviceId: id },
      attributes: { exclude: ['serviceId', 'employeeId'] },
      include: { model: SequelizeEmployee, as: 'employee' } });

    if (dataService.length === 0) {
      const service = await this.model.findAll({ where: { id },
        attributes: { exclude: ['clientId', 'principalEmployeeId'] },
        include: [{
          model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{
            model: SequelizeCar, as: 'car' }] },
        { model: SequelizeEmployee, as: 'principalEmployee' }] });
      return { dataService: service, employeesOfService };
    }

    const finalResult : IServiceResult = { dataService, employeesOfService };

    return finalResult;
  }

  async insertService(data: TypeInsertService): Promise<InsertService> {
    const [service] = await this.model.findOrCreate({
      where: { totalService: data.totalService,
        clientId: data.clientId,
        date: data.date,
        paymentStatus: data.paymentStatus,
        principalEmployeeId: data.principalEmployeeId },
    });

    const pieces = await Promise
      .all(data.itens.map(async (item: Omit<IItensServices, 'serviceId'>) => {
        const [responsePieces] = await this.itensServices.findOrCreate({
          where: { serviceId: service.id,
            itemId: item.itemId,
            qtdUnit: item.qtdUnit,
            priceUnit: item.priceUnit },
        });
        return responsePieces;
      }));

    const employeeServices = await Promise.all(data.employeeServices
      .map(async ({ labor, employeeId, description }:
      Omit<IEmployeeServices, 'serviceId'>) => {
        const [result] = await this.employeeService.findOrCreate({ where: {
          serviceId: service.id, employeeId, labor, description,
        } });
        console.log(result);

        return result;
      }));

    const resultFinal = { service, pieces, employeeServices };

    return resultFinal;
  }

  async servicesByClient(clientId: number): Promise<IServices[]> {
    const result = await this.model.findAll({ where: { clientId },
      attributes: { exclude: ['clientId', 'principalEmployeeId'] },
      include: [{
        model: SequelizeClient, as: 'client',
      }, { model: SequelizeEmployee, as: 'principalEmployee' }] });
    return result;
  }

  async servicesByDatesInterval(data: { dateInitial: string; dateFinal: string; }):
  Promise<IServices[]> {
    const result = await this.model.findAll({ where: {
      date: { [Op.between]: [data.dateInitial, data.dateFinal] } } });
    return result;
  }
}
