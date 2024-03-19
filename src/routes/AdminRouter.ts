import { Request, Response, Router } from 'express';
import AdminController from '../controller/Admin.controller';
import Validate from '../middlewares/Validates';

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post(
  '/admin',
  Validate.ValidateEmailAndPassword,
  (req: Request, res: Response) => adminController.insertAdmin(req, res),
);

export default adminRouter;
