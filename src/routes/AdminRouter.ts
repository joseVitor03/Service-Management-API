import { Request, Response, Router } from 'express';
import AdminController from '../controller/Admin.controller';
import Validate from '../middlewares/Validates';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post(
  '/admin',
  Validate.validateToken,
  Validate.ValidateEmailAndPassword,
  (req: Request, res: Response) => adminController.insertAdmin(req, res),
);

adminRouter.post('/login', (req: Request, res: Response) => adminController.loginAdmin(req, res));

adminRouter.post(
  '/admin/delete',
  Validate.validateToken,
  Validate.ValidateEmail,
  (req: Request, res: Response) => adminController.deleteAdmin(req, res),
);
export default adminRouter;
