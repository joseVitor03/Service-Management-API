import { Op } from 'sequelize';
import IServiceModel, { IServiceResult,
  InsertService, TypeInsertService } from '../interfaces/IServiceModel';
import SequelizeServices from '../database/models/SequelizeServices';
import SequelizeClient from '../database/models/SequelizeClient';
import SequelizePiecesServices from '../database/models/SequelizePiecesServices';
import SequelizeEmployeeServices from '../database/models/SequelizeEmployeeServices';
import SequelizeCar from '../database/models/SequelizeCar';
import SequelizeEmployee from '../database/models/SequelizeEmployee';
import SequelizePiece from '../database/models/SequelizePieces';
import IServices from '../interfaces/databaseModels/IServices';
import IPieceServices from '../interfaces/databaseModels/IPiecesServices';
import IEmployeeServices from '../interfaces/databaseModels/IEmployeeServices';

export default class ServiceModel implements IServiceModel {
  private employeeService = SequelizeEmployeeServices;
  private piecesServices = SequelizePiecesServices;
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
      }],
      attributes: { exclude: ['clientId'] }, // Exclua clientId do resultado principal
    });
    return result;
  }

  async deleteService(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    await this.employeeService.destroy({ where: { serviceId: id } });
    await this.piecesServices.destroy({ where: { serviceId: id } });

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
      }],
      attributes: { exclude: ['clientId'] }, // Exclua clientId do resultado principal
    });
    return result;
  }

  async findService(id: number): Promise<IServiceResult> {
    const dataService = await this.piecesServices.findAll({ where: { serviceId: id },
      attributes: { exclude: ['serviceId', 'pieceId'] },
      include: [{ model: SequelizePiece, as: 'pieceName' }, {
        model: SequelizeServices,
        as: 'service',
        attributes: { exclude: ['clientId'] },
        include: [{
          model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{ model: SequelizeCar, as: 'car' }] }] }] });

    const employeesOfService = await this.employeeService.findAll({ where: { serviceId: id },
      attributes: { exclude: ['serviceId', 'employeeId'] },
      include: { model: SequelizeEmployee, as: 'employee' } });

    if (dataService.length === 0) {
      const service = await this.model.findAll({ where: { id },
        attributes: { exclude: ['clientId'] },
        include: [{
          model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{
            model: SequelizeCar, as: 'car' }] }] });
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
        paymentStatus: data.paymentStatus },
    });

    const pieces = await Promise
      .all(data.pieces.map(async (piece: Omit<IPieceServices, 'serviceId'>) => {
        const [responsePieces] = await this.piecesServices.findOrCreate({
          where: { serviceId: service.id,
            pieceId: piece.pieceId,
            qtdUnit: piece.qtdUnit,
            priceUnit: piece.priceUnit },
        });
        return responsePieces;
      }));

    const employeeServices = await Promise
      .all(data.employeeServices
        .map(async ({ labor, employeeId, description }:
        Omit<IEmployeeServices, 'serviceId'>) => {
          const [result] = await this.employeeService.findOrCreate({ where: {
            serviceId: service.id, employeeId, labor, description,
          } });
          // console.log(result);

          return result;
        }));

    const resultFinal = { service, pieces, employeeServices };

    return resultFinal;
  }

  async servicesByClient(clientId: number): Promise<IServices[]> {
    const result = await this.model.findAll({ where: { clientId },
      attributes: { exclude: ['clientId'] },
      include: {
        model: SequelizeClient, as: 'client',
      } });
    return result;
  }

  async servicesByDatesInterval(data: { dateInitial: string; dateFinal: string; }):
  Promise<IServices[]> {
    const result = await this.model.findAll({ where: {
      date: { [Op.between]: [data.dateInitial, data.dateFinal] } } });
    return result;
  }
}
