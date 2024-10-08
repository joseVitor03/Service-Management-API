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

describe('validateInsertEmployeeService Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it(
    'testando caso description seja diferente de string ou nulo de employeeServices',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/services')
        .set('Authorization', bearer)
        .send({
          clientId: 2,
          totalService: 700,
          date: '2024-05-21',
          plate: 'ABC-1D23',
          carId: 33,
          carColor: 'azul',
          paymentStatus: false,
          principalEmployeeId: 1,
          itens: [{
            itemId: 2,
            qtdUnit: 2,
            priceUnit: 250,
          }],
          employeeServices: [{
            employeeId: 1,
            labor: 200,
            description: 1,
          }] });

      expect(status).to.be.equal(400);
      expect(body).to.be.eqls({ message: 'description precisa ser uma string ou nulo' });
    },
  );

  it('testando caso labor seja diferente de nulo ou number de employeeServices', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/services').set('Authorization', bearer)
      .send({
        clientId: 2,
        totalService: 700,
        plate: 'ABC-1D23',
        carId: 33,
        carColor: 'azul',
        date: '2024-05-20',
        paymentStatus: false,
        principalEmployeeId: 1,
        itens: [{
          itemId: 2,
          qtdUnit: 2,
          priceUnit: 250,
        }],
        employeeServices: [{
          employeeId: 1,
          labor: '200',
          description: null,
        }] });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls(
      { message: 'labor precisa ser um número ou nulo e employeeId precisa ser um número' },
    );
  });
});
