import { Op } from 'sequelize';
import { IClientModel } from '../interfaces/IClientModel';
import SequelizeClient from '../database/models/SequelizeClient';
import SequelizeCar from '../database/models/SequelizeCar';
import { IClient } from '../interfaces/databaseModels/IClient';

export default class ClientModel implements IClientModel {
  constructor(private model = SequelizeClient) {}

  async insertClient({ name, phone, plate, color, carId }: Omit<IClient, 'id'>): Promise<IClient> {
    const [result] = await this.model.findOrCreate({ where: {
      name,
      phone,
      plate,
      carId,
      color } });
    return result;
  }

  async findClient({ name, plate }: { name: string, plate: string }): Promise<IClient[]> {
    const result = await this.model.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        plate: {
          [Op.like]: `%${plate}%`,
        },
      },
    });
    return result;
  }

  async deleteClient(id: number): Promise<number> {
    const result = await this.model.destroy({ where: { id } });
    return result;
  }

  async updateClient(client: IClient): Promise<[number]> {
    const { id, name, phone, plate, carId, color } = client;
    const result = await this.model.update({ name, phone, plate, carId, color }, { where: { id } });
    return result;
  }

  async listClient(): Promise<IClient[]> {
    const result = await this.model.findAll({
      include: { model: SequelizeCar, as: 'car' },
      attributes: { exclude: ['carId'] },
    });

    return result;
  }
}
