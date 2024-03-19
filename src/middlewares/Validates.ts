import { NextFunction, Request, Response } from 'express';
import brandCars from '../utils/brandCars';

export default class Validate {
  static validateCar(req: Request, res: Response, next: NextFunction) {
    const { name, brand, year } = req.body;
    const currentYear = new Date().getFullYear();
    if (!name || !brand || !year) {
      return res.status(400).json({ message: 'Informação incompleta.' });
    }
    if (name.length < 2 || !brandCars.includes(brand) || year > currentYear) {
      console.log(!brandCars.includes(brand));

      return res.status(400).json({ message: 'Dados incorretos.' });
    }
    next();
  }

  static validatePiece(req: Request, res: Response, next:NextFunction) {
    const { id, name } = req.body;
    if (!id || !name || typeof name !== 'string' || name.length < 4) {
      return res.status(400).json(
        { message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' },
      );
    }
    next();
  }
}
