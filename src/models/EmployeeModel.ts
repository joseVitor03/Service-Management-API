import { Op } from 'sequelize';
import IEmployeeModel from '../interfaces/IEmployeeModel';
import SequelizeEmployee from '../database/models/4-SequelizeEmployee';
import IEmployee from '../interfaces/databaseModels/IEmployee';
import SequelizeEmployeeServices from '../database/models/7-SequelizeEmployeeServices';
import SequelizeServices from '../database/models/6-SequelizeServices';
import SequelizeClient from '../database/models/3-SequelizeClient';
import SequelizeCar from '../database/models/2-SequelizeCar';

export default class EmployeeModel implements IEmployeeModel {
  private employeeServices = SequelizeEmployeeServices;

  constructor(private model = SequelizeEmployee) {}
  async removeEmployee(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    return result;
  }

  async listEmployees(): Promise<IEmployee[]> {
    const result = await this.model.findAll();
    return result;
  }

  async updateEmployee({ id, name }: IEmployee): Promise<number> {
    const [result] = await this.model.update({ name }, { where: { id } });
    return result;
  }

  async insertEmployee(name: string): Promise<IEmployee> {
    const [result] = await this.model.findOrCreate({ where: { name } });
    return result;
  }

  async employeeProductivityByDate(data: { dateInitial: string; dateFinal: string; id: string }):
  Promise<SequelizeEmployeeServices[]> {
    const result = await this.employeeServices.findAll({
      where: { employeeId: data.id },
      attributes: { exclude: ['employeeId', 'serviceId'] },
      include: [{ model: SequelizeServices,
        as: 'service',
        where: { date: { [Op.between]: [data.dateInitial, data.dateFinal] } },
        attributes: { exclude: ['clientId'] },
        include: [{
          model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{
            model: SequelizeCar, as: 'car',
          }],
        }],
      }, {
        model: SequelizeEmployee, as: 'employee',
      }] });
    return result;
  }

  async listServicesByEmployee(id: number): Promise<SequelizeEmployeeServices[]> {
    const result = await this.employeeServices.findAll({ where: { employeeId: id },
      attributes: { exclude: ['employeeId', 'serviceId'] },
      include: { model: SequelizeServices,
        as: 'service',
        attributes: { exclude: ['clientId'] },
        include: [{ model: SequelizeClient,
          as: 'client',
          attributes: { exclude: ['carId'] },
          include: [{ model: SequelizeCar, as: 'car' }],
        },
        ],
      },
      limit: 100,
      order: [['serviceId', 'DESC']] });
    return result;
  }
}
