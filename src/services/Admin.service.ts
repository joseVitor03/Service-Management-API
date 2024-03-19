import bcrypt from 'bcryptjs';
import AdminModel from '../models/AdminModel';
import { IAdmin } from '../interfaces/databaseModels/IAdmin';
import { ServiceResponse } from '../utils/mapStatusHTTP';

const SALTS = process.env.SALT_ROUNDS;
export default class AdminService {
  constructor(private adminModel = new AdminModel()) {}

  async insertAdmin({ email, password }: { email: string, password: string }):
  Promise<ServiceResponse<IAdmin>> {
    console.log(2);

    const hashedPassword = bcrypt.hashSync(password, Number(SALTS));
    console.log(3);

    const result = await this.adminModel.insertAdmin({ email, password: hashedPassword });
    return { status: 'CREATED', data: result };
  }
}
