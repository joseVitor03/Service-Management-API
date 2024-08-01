import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeServices from '../../../database/models/6-SequelizeServices';
import { finalFindServiceResult,
  findServiceMockEmployee,
  findServiceMockPieceService, listServiceFalseMock, insertServiceCompleteMock,
  listServiceTrueMock,
  servicesByClientMock } from '../../mocks/serviceMock';
import SequelizeEmployeeServices from '../../../database/models/7-SequelizeEmployeeServices';
import SequelizePiecesServices from '../../../database/models/8-SequelizePiecesServices';
import App from '../../../app';
import servicesByDatesMock from '../../mocks/serviceMock2';

const { app } = new App();
const { expect } = chai;

chai.use(chaiHttp);
const bearer = 'Bearer any';

describe('testando rota de services', async function () {
  afterEach(() => {
    sinon.restore();
  });
  it(
    'testando rota GET para listagem de serviços com o status de pagamento false',
    async function () {
      sinon.stub(SequelizeServices, 'findAll').resolves(listServiceFalseMock as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).get('/services/paymentStatusFalse')
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.eqls(listServiceFalseMock);
    },
  );

  it(
    'testando rota GET para listagem de serviços com o status de pagamento true',
    async function () {
      sinon.stub(SequelizeServices, 'findAll').resolves(listServiceTrueMock as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).get('/services/paymentStatusTrue')
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.eqls(listServiceTrueMock);
    },
  );

  it('testando rota GET para encontrar um serviço com detalhes', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    sinon.stub(SequelizePiecesServices, 'findAll')
      .resolves(findServiceMockPieceService as any);

    sinon.stub(SequelizeEmployeeServices, 'findAll')
      .resolves(findServiceMockEmployee as any);

    const { status, body } = await chai.request(app).get('/services/findService/2')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(finalFindServiceResult);
  });

  it(
    'testando rota GET /services/findService/:id, mas não encontra nenhum serviço',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
      sinon.stub(SequelizeServices, 'findAll').resolves([]);
      sinon.stub(SequelizePiecesServices, 'findAll')
        .resolves([] as any);

      sinon.stub(SequelizeEmployeeServices, 'findAll')
        .resolves([] as any);

      const { status, body } = await chai.request(app).get('/services/findService/2')
        .set('Authorization', bearer);

      expect(status).to.be.equal(404);
      expect(body).to.be.eqls({ message: 'serviço não encontrado.' });
    },
  );

  it('testando rota GET /services/findService/:id, mas o id não é um numero', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findAll').resolves([]);
    sinon.stub(SequelizePiecesServices, 'findAll')
      .resolves([] as any);

    sinon.stub(SequelizeEmployeeServices, 'findAll')
      .resolves([] as any);

    const { status, body } = await chai.request(app).get('/services/findService/b')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"id" precisa ser um número' });
  });

  it('testando rota PATCH /services para atualizar o status de pagamento', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'update').resolves([1]);

    const { status, body } = await chai.request(app).patch('/services/5')
      .set('Authorization', bearer).send({
        paymentStatus: true,
      });

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({ message: 'status do serviço atualizado.' });
  });

  it(`testando rota PATCH /services para atualizar o status de pagamento, 
    mas com status é igual o do BD`, async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'update').resolves([0]);

    const { status, body } = await chai.request(app).patch('/services/1')
      .set('Authorization', bearer).send({
        paymentStatus: true,
      });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'serviço não encontrado ou mesmo status.' });
  });

  it('testando rota POST /services', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findOrCreate').resolves([{
      id: 3,
      clientId: 2,
      totalService: 800,
      date: '2024-05-09',
      paymentStatus: false,
      principalEmployeeId: 2,
    }] as any);

    sinon.stub(SequelizeEmployeeServices, 'findOrCreate').resolves([{
      serviceId: 3, employeeId: 2, labor: 600.00, description: 'aloo',
    }] as any);

    sinon.stub(SequelizePiecesServices, 'findOrCreate').resolves([{
      serviceId: 3, qtdUnit: 2, pieceId: 2, priceUnit: 100,
    }] as any);

    const { status, body } = await chai.request(app).post('/services')
      .set('Authorization', bearer).send(insertServiceCompleteMock);

    expect(status).to.be.equal(201);
    expect(body).to.be.eqls({ message: 'serviço registrado.' });
  });

  it('testando rota GET /services/client/:id', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findAll').resolves(servicesByClientMock as any);

    const { status, body } = await chai.request(app).get('/services/client/2')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(servicesByClientMock);
  });

  it('testando rota GET /services/client/:id, mas sem encontrar nehum serviço', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findAll').resolves([] as any);

    const { status, body } = await chai.request(app).get('/services/client/2')
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'nenhum serviço encontrado deste cliente.' });
  });

  it('testando rota GET /services/client/:id, mas o id não é um numero', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/services/client/m')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"clientId" precisa ser um número' });
  });

  it('testando rota GET /services/dates', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findAll').resolves(servicesByDatesMock as any);

    const { status, body } = await chai.request(app).get('/services/dates')
      .set('Authorization', bearer).send({ dateInitial: '2024-04-01',
        dateFinal: '2024-05-14',
      });

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(servicesByDatesMock);
  });

  it('testando rota GET /services/dates, mas sem serviços entre essas datas', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'findAll').resolves([] as any);

    const { status, body } = await chai.request(app).get('/services/dates')
      .set('Authorization', bearer).send({
        dateInitial: '2024-04-01',
        dateFinal: '2024-05-14',
      });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'Não possuí serviços nesse intervalo de datas.' });
  });

  it('testando rota DELETE /services/:id', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'destroy').resolves(1 as any);
    sinon.stub(SequelizePiecesServices, 'destroy').resolves(1 as any);
    sinon.stub(SequelizeEmployeeServices, 'destroy').resolves(1 as any);

    const { status, body } = await chai.request(app).delete('/services/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({ message: 'serviço deletado.' });
  });

  it('testando rota DELETE /services/:id, mas não possui servico', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeServices, 'destroy').resolves(0 as any);
    sinon.stub(SequelizePiecesServices, 'destroy').resolves(0 as any);
    sinon.stub(SequelizeEmployeeServices, 'destroy').resolves(0 as any);

    const { status, body } = await chai.request(app).delete('/services/2')
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'serviço não encontrado.' });
  });
});
