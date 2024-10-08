import { Request, Response, Router } from 'express';
import EmployeeController from '../controller/Employee.controller';
import Validate from '../middlewares/Validates';
import ValidateService from '../middlewares/ValidateService';

const employeeRouter = Router();
const employeeController = new EmployeeController();
const EMPLOYEE = '/employees';
employeeRouter.post(
  `${EMPLOYEE}`,
  Validate.validateToken,
  Validate.validateInsertEmployee,
  (req: Request, res: Response) => employeeController.insertEmployee(req, res),
);

employeeRouter.get(
  `${EMPLOYEE}`,
  Validate.validateToken,
  (req: Request, res: Response) => employeeController.listEmployees(req, res),
);

employeeRouter.post(
  `${EMPLOYEE}/:employeeId/services`,
  Validate.validateToken,
  ValidateService.validateDateService,
  (req: Request, res: Response) => employeeController.employeeProductivityByDate(req, res),
);

employeeRouter.get(
  `${EMPLOYEE}/:id/services`,
  Validate.validateToken,
  (req: Request, res: Response) => employeeController.listServicesByEmployee(req, res),
);

employeeRouter.delete(
  `${EMPLOYEE}/:id`,
  Validate.validateToken,
  (req: Request, res: Response) => employeeController.removeEmployee(req, res),
);

employeeRouter.patch(
  `${EMPLOYEE}/:id`,
  Validate.validateToken,
  Validate.validateUpdateEmployee,
  (req: Request, res: Response) => employeeController.updateEmployee(req, res),
);

export default employeeRouter;
