import { Request, Response, Router } from 'express';
import EmployeeController from '../controller/Employee.controller';
import Validate from '../middlewares/Validates';

const employeeRouter = Router();
const employeeController = new EmployeeController();

employeeRouter.post(
  '/employee',
  Validate.validateToken,
  Validate.validateInsertEmployee,
  (req: Request, res: Response) => employeeController.insertEmployee(req, res),
);

employeeRouter.get(
  '/employee',
  Validate.validateToken,
  (req: Request, res: Response) => employeeController.listEmployees(req, res),
);

employeeRouter.delete(
  '/employee/:id',
  Validate.validateToken,
  (req: Request, res: Response) => employeeController.removeEmployee(req, res),
);

employeeRouter.patch(
  '/employee',
  Validate.validateToken,
  Validate.validateUpdateEmployee,
  (req: Request, res: Response) => employeeController.removeEmployee(req, res),
);

export default employeeRouter;
