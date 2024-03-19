import { IAdmin } from './databaseModels/IAdmin';

export interface IAdminModel {
  insertAdmin({ email, password }: Omit<IAdmin, 'id'>): Promise<IAdmin>
}
