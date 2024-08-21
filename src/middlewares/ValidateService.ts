import { NextFunction, Request, Response } from 'express';
import { EmployeeService } from '../interfaces/IServiceModel';

export default class ValidateService {
  static validateInsertService(req: Request, res: Response, next: NextFunction) {
    const { clientId, totalService, date, itens, employeeServices, paymentStatus,
      principalEmployeeId,
    } = req.body;
    const currentDate = new Date();
    if (!clientId || !totalService || !date || !employeeServices
      || paymentStatus === undefined || !itens || !principalEmployeeId) {
      return res.status(400).json({ message: 'dados do serviço incompleto.' });
    }
    if (!Array.isArray(employeeServices) || !Array.isArray(itens)) {
      return res.status(400).json({ message: '"employeeService" e "itens" em formato incorreto' });
    }
    if (employeeServices.length === 0 && itens.length === 0) {
      return res.status(400).json({ message: '"employeeService" ou "itens" precisam ter dados' });
    }
    const serviceDate = new Date(date);
    if (serviceDate > currentDate) {
      return res.status(400).json({ message: 'o "date" não pode ser maior que a data atual' });
    }

    next();
  }

  static validateInsertEmployeeServices(req: Request, res: Response, next: NextFunction) {
    const { employeeServices } = req.body;
    let result = {} as { status: number, data?: { message: string } };
    if (employeeServices.length > 0) {
      employeeServices.forEach((service: EmployeeService) => {
        if (!service.employeeId || service.description === undefined
          || service.labor === undefined) {
          result = { status: 400,
            data:
            { message: 'Algum campo do serviço do funcionário esta incorreto' } };
        } else if (typeof service.description !== 'string' && service.description !== null) {
          result = { status: 400,
            data: { message: 'description precisa ser uma string ou nulo' },
          };
        } else if ((typeof service.labor !== 'number' && service.labor !== null)
            || typeof service.employeeId !== 'number') {
          result = { status: 400,
            data:
          { message: 'labor precisa ser um número ou nulo e employeeId precisa ser um número' } };
        } else {
          result = { status: 200 };
        }
      });
    } else {
      result = { status: 200 };
    }
    if (result.status !== 200) {
      return res.status(result.status).json(result.data);
    }

    next();
  }

  static validateInsertItensServices(req: Request, res: Response, next: NextFunction) {
    const { itens } = req.body;
    let result = {} as { status: number, data?: { message: string } };
    if (itens.length > 0) {
      itens.forEach((item: { itemId: number; qtdUnit: number; priceUnit: number }) => {
        if (!item.itemId || !item.priceUnit || !item.qtdUnit) {
          result = { status: 400,
            data: { message: 'itemId, qtdUnit e priceUnit são obrigatórios' } };
        } else if (typeof item.itemId !== 'number' || typeof item.qtdUnit !== 'number'
        || typeof item.priceUnit !== 'number') {
          result = { status: 400,
            data: { message: 'itemId, qtdUnit e priceUnit precisam ser números' } };
        } else {
          result = { status: 200 };
        }
      });
    } else {
      result = { status: 200 };
    }
    if (result.status !== 200) {
      return res.status(result.status).json(result.data);
    }

    next();
  }

  static validateUpdateStatusService(req: Request, res: Response, next: NextFunction) {
    const { paymentStatus } = req.body;
    if (paymentStatus === undefined) {
      return res.status(400).json({ message: '"paymentStatus" é requirido.' });
    }
    if (typeof paymentStatus !== 'boolean') {
      return res.status(400).json({ message: '"paymentStatus" precisa ser um booleano.' });
    }
    next();
  }

  static validateDateService(req: Request, res: Response, next: NextFunction) {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const { dateInitial, dateFinal } = req.body;
    if (!dateFinal || !dateInitial) {
      return res.status(400).json({ message: 'dateFinal e dateInitial são obrigatórios' });
    }
    if (!dateInitial.match(dateRegex) || !dateFinal.match(dateRegex)) {
      return res.status(400).json({ message: 'formato inválido de alguma das datas.' });
    }
    const [yearInitial, monthInitial, dayInitial] = dateInitial.split('-').map(Number);
    const dateObjIntial = new Date(yearInitial, monthInitial - 1, dayInitial); // Ajuste do mês

    const [yearFinal, monthFinal, dayFinal] = dateFinal.split('-').map(Number);
    const dateObjFinal = new Date(yearFinal, monthFinal - 1, dayFinal);
    if (dateInitial > dateFinal) {
      return res.status(400).json(
        { message: 'dateInitial não pode ser uma data após a dateFinal' },
      );
    }
    if (dateObjIntial.getFullYear() !== yearInitial || dateObjIntial.getMonth() !== monthInitial - 1 // Verificação do mês ajustado
    || dateObjIntial.getDate() !== dayInitial
    ) {
      return res.status(400).json({ message: 'Mês inicial inexistente.' });
    }
    if (dateObjFinal.getFullYear() !== yearFinal || dateObjFinal.getMonth() !== monthFinal - 1 // Verificação do mês ajustado
    || dateObjFinal.getDate() !== dayFinal
    ) {
      return res.status(400).json({ message: 'Mês final inexistente.' });
    }

    next();
  }
}
