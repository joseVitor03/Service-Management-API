import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import brandCars from '../utils/brandCars';

const REGEXEMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEXPASS = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#]).*$/;
const KEY = process.env.TOKEN;

export default class Validate {
  static validateCar(req: Request, res: Response, next: NextFunction) {
    const { name, brand, year } = req.body;
    const currentYear = new Date().getFullYear();
    if (!name || !brand || !year) {
      return res.status(400).json({ message: '"name", "brand" e "year" são obrigatórios.' });
    }
    if (name.length < 2 || !brandCars.includes(brand) || year > currentYear) {
      return res.status(400).json({ message: 'Dados incorretos.' });
    }
    next();
  }

  static validatePiece(req: Request, res: Response, next:NextFunction) {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ message: '"id" e "name" são obrigatórios' });
    }
    if (typeof name !== 'string' || name.length < 4) {
      return res.status(400).json(
        { message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' },
      );
    }
    next();
  }

  static ValidateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: '"email" são obrigatórios' });
    }

    if (!email.match(REGEXEMAIL)) {
      return res.status(400).json({ message: 'O formato do email é inválido' });
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

  static validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.header('Authorization');
      if (!authorization) {
        return res.status(401).json({ message: 'É necessário um token' });
      }
      const [, token] = authorization.split(' ');
      jwt.verify(token, KEY as string);
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token incorreto ou expirado' });
    }
  }

  static validateInsertEmployee(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: ' "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: '"name" precisa ter pelo menos 3 caracteres' });
    }
    next();
  }

  static validateUpdateEmployee(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ message: '"id" e "name" são obrigatórios' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: '"name" precisa ter pelo menos 3 caracteres' });
    }

    next();
  }

  static validateFindClient(req: Request, res: Response, next: NextFunction) {
    const { name, plate } = req.body;
    if (!name || !plate) {
      return res.status(400).json({ message: '"name" e "plate" são obrigatórios.' });
    }
    next();
  }

  static validateUpdateClient(req: Request, res: Response, next: NextFunction) {
    const REGEXPLATE = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/g;

    const { id, name, phone, plate, carId, color } = req.body;
    if (!id || !name || !phone || !plate || !carId || !color) {
      return res.status(400).json({
        message: '"id", "name", "phone", "plate", "carId", "color" são obrigatórios.',
      });
    }
    if (name.length < 3 || !plate.match(REGEXPLATE) || phone.length !== 11 || color.length < 4) {
      return res.status(400).json({
        message: 'Algum dos dados enviados estão estão com o formato incorreto.',
      });
    }
    next();
  }

  static validateInsertClient(req: Request, res: Response, next: NextFunction) {
    const REGEXPLATE = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/g;

    const { name, phone, plate, carId, color } = req.body;
    if (!name || !phone || !plate || !carId || !color) {
      return res.status(400).json({
        message: '"name", "phone", "plate", "carId", "color" são obrigatórios.',
      });
    }
    if (name.length < 3 || !plate.match(REGEXPLATE) || phone.length !== 11 || color.length < 4) {
      return res.status(400).json({
        message: 'Algum dos dados enviados estão estão com o formato incorreto.',
      });
    }
    next();
  }
}
