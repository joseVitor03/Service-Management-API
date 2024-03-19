import { NextFunction, Request, Response } from 'express';
import brandCars from '../utils/brandCars';

const REGEXEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEXPASS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#]).*$/;

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

  static ValidateEmailAndPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '"email" ou "senha" são obrigatórios' });
    }

    if (!email.match(REGEXEMAIL)) {
      return res.status(400).json({ message: 'O formato do email é inválido' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres' });
    }

    if (!password.match(REGEXPASS)) {
      return res.status(400).json({ message: `A senha deve conter pelo menos uma letra maiúscula,
      uma letra minúscula e um caractere especial` });
    }
    next();
  }
}
