import express from 'express';
import cors from 'cors';
import carsRouter from './routes/CarRouter';
import itemRouter from './routes/ItemRouter';
import adminRouter from './routes/AdminRouter';
import employeeRouter from './routes/EmployeeRouter';
import clientRouter from './routes/ClientRouter';
import serviceRouter from './routes/ServiceRouter';

class App {
  public app: express.Express;
  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    const frontend = [process.env.FRONT_OFICINA] || ['http://localhost:3000'];

    this.app.use(cors({ origin(origin, callback) {
      if (frontend.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    } }));
    this.app.use(express.json());
    this.app.use(accessControl);
    this.routes();
  }

  private routes() {
    this.app.use(carsRouter);
    this.app.use(itemRouter);
    this.app.use(adminRouter);
    this.app.use(employeeRouter);
    this.app.use(clientRouter);
    this.app.use(serviceRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
