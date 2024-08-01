import { IAdminModel } from '../interfaces/IAdminModel';
import SequelizeAdmin from '../database/models/1-SequelizeAdmin';
import { IAdmin } from '../interfaces/databaseModels/IAdmin';

export default class AdminModel implements IAdminModel {
  constructor(private model = SequelizeAdmin) {}
  async findAdmin({ email }: { email: string; }): Promise<IAdmin | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }

  async deleteAdmin({ email }: { email: string; }): Promise<number> {
    const result = await this.model.destroy({ where: { email } });
    return result;
  }

  async loginAdmin({ email }: { email: string }): Promise<IAdmin | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }

  async insertAdmin({ email, password }: Omit<IAdmin, 'id'>): Promise<IAdmin> {
    const result = await this.model.create({ email, password });
    return result;
  }
}
