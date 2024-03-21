import { IAdmin } from './databaseModels/IAdmin';

export interface IAdminModel {
  insertAdmin({ email, password }: Omit<IAdmin, 'id'>): Promise<IAdmin>;
  loginAdmin({ email }: { email: string }): Promise<IAdmin | null>;
  deleteAdmin({ email }: { email: string }): Promise<number>;
  findAdmin({ email }: { email: string }): Promise<IAdmin | null>
}
