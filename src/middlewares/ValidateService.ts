import { NextFunction, Request, Response } from 'express';

export default class ValidateService {
  static validateInsertService(req: Request, res: Response, next: NextFunction) {
    const { clientId, totalService, date, pieces, employeeServices, paymentStatus } = req.body;
    const currentDate = new Date();
    if (!clientId || !totalService || !date || !employeeServices || paymentStatus === undefined) {
      return res.status(400).json({ message: 'dados do serviço incompleto.' });
    }
    if (typeof employeeServices !== 'object' || typeof pieces !== 'object') {
      return res.status(400).json('"employeeServices" ou "pieces" estão no formato incorreto.');
    }
    if (employeeServices.length === 0 && pieces.length === 0) {
      return res.status(400).json({ message: `O serviço precisa ter peças 
      ou mão de obra de pelo menos um funcionário` });
    }
    const serviceDate = new Date(date);
    if (serviceDate > currentDate) {
      return res.status(400).json({ message: 'o "date" não pode ser maior que a data atual' });
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
    if (!dateInitial.match(dateRegex) || !dateFinal.match(dateRegex)) {
      return res.status(400).json({ message: 'formato inválido de alguma das datas.' });
    }

    const [yearInitial, monthInitial, dayInitial] = dateInitial.split('-').map(Number);
    const dateObjIntial = new Date(yearInitial, monthInitial - 1, dayInitial); // Ajuste do mês

    const [yearFinal, monthFinal, dayFinal] = dateInitial.split('-').map(Number);
    const dateObjFinal = new Date(yearFinal, monthFinal - 1, dayFinal);
    if (dateObjFinal.getFullYear() !== yearInitial || dateObjIntial.getMonth() !== monthInitial - 1 // Verificação do mês ajustado
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
