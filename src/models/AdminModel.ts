import { IAdminModel } from '../interfaces/IAdminModel';
import SequelizeAdmin from '../database/models/SequelizeAdmin';
import { IAdmin } from '../interfaces/databaseModels/IAdmin';

export default class AdminModel implements IAdminModel {
  constructor(private model = SequelizeAdmin) {}

  async insertAdmin({ email, password }: Omit<IAdmin, 'id'>): Promise<IAdmin> {
    const result = await this.model.create({ email, password });
    return result;
  }
}
