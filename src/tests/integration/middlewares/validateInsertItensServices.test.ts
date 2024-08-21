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

describe('validateInsertItenServices Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando caso itens seja maior que zero e não tenha todos os campos', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services')
      .set('Authorization', bearer)
      .send({
        clientId: 2,
        totalService: 700,
        date: '2024-05-21',
        paymentStatus: false,
        principalEmployeeId: 1,
        itens: [{
          itemId: 2,
        }],
        employeeServices: [{
          employeeId: 1,
          labor: 200,
          description: null,
        }] });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'itemId, qtdUnit e priceUnit são obrigatórios' });
  });

  it('testando caso itens caso algum campo de itens não seja number', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services')
      .set('Authorization', bearer)
      .send({
        clientId: 2,
        totalService: 700,
        date: '2024-05-21',
        paymentStatus: false,
        principalEmployeeId: 1,
        itens: [{
          itemId: 2,
          qtdUnit: 2,
          priceUnit: '250',
        }],
        employeeServices: [{
          employeeId: 1,
          labor: 200,
          description: null,
        }] });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'itemId, qtdUnit e priceUnit precisam ser números' });
  });
});
