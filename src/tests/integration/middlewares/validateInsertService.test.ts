import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';

describe('validateInsertService Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando caso não tenha algum dos campos obrigatórios', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services').set('Authorization', bearer)
      .send({
        clientId: 2,
        totalService: 500,
        date: '2024-05-20',
        paymentStatus: false,
        principalEmployeeId: 1,
        employeeServices: [{
          employeeId: 1,
          labor: null,
          description: null,
        }],
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'dados do serviço incompleto.' });
  });

  it('testando caso pieces e employee não sejam arrays', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services').set('Authorization', bearer)
      .send({
        clientId: 1,
        totalService: 200,
        date: '2024-05-20',
        pieces: {},
        principalEmployeeId: 1,
        employeeServices: {
          labo: 200,
          employeeId: 1,
          description: null,
        },
        paymentStatus: false,
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"employeeService" e "pieces" em formato incorreto' });
  });

  it('testando caso date seja maior que a data atual', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services').set('Authorization', bearer)
      .send({
        clientId: 1,
        totalService: 200,
        date: '3100-05-20',
        pieces: [{}],
        principalEmployeeId: 1,
        employeeServices: [{
          labo: 200,
          employeeId: 1,
          description: null,
        }],
        paymentStatus: false,
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'o "date" não pode ser maior que a data atual' });
  });
});
