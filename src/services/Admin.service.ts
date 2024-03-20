import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/AdminModel';
import { IAdmin } from '../interfaces/databaseModels/IAdmin';
import { ServiceResponse } from '../utils/mapStatusHTTP';

const SALTS = process.env.SALT_ROUNDS;
const KEY = process.env.TOKEN;

export default class AdminService {
  constructor(private adminModel = new AdminModel()) {}

  async insertAdmin({ email, password }: { email: string, password: string }):
  Promise<ServiceResponse<IAdmin>> {
    const hashedPassword = bcrypt.hashSync(password, Number(SALTS));
    const admin = await this.adminModel.findAdmin({ email });
    if (admin) {
      return { status: 'CONFLICT', data: { message: 'Admin já registrado' } };
    }
    const result = await this.adminModel.insertAdmin({ email, password: hashedPassword });
    return { status: 'CREATED', data: result };
  }

  async loginAdmin({ email, password }: Omit<IAdmin, 'id'>):
  Promise<ServiceResponse<{ token: string }>> {
    const result = await this.adminModel.loginAdmin({ email });
    if (!result) {
      return { status: 'UNAUTHORIZED', data: { message: 'Email ou Senha incorretos.' } };
    }
    const resultPass = await bcrypt.compare(password, result.password);
    if (!resultPass) {
      return { status: 'UNAUTHORIZED', data: { message: 'Email ou Senha incorretos.' } };
    }
    const token = jwt.sign({ email, password }, KEY as string, { expiresIn: '1d' });
    console.log(result);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  async deleteAdmin({ email }: { email: string }): Promise<ServiceResponse<{ message: string }>> {
    const result = await this.adminModel.deleteAdmin({ email });
    if (result === 0) {
      return { status: 'INVALID_DATA', data: { message: 'Admin não encontrado.' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Admin removido do sucesso' } };
  }
}
