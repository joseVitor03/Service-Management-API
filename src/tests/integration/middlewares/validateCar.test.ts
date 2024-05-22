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
describe('validateCars Test', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('testando se a requisição cai na validação de campos obrigatórios', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/cars')
      .set('Authorization', bearer).send({
        name: 'Camaro',
        year: 2020,
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name", "brand" e "year" são obrigatórios.' });
  });

  it('testando se a requisição cai na validação de campos inconsistente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/cars')
      .set('Authorization', bearer).send({
        name: 'Camaro',
        brand: 'CHEVROLET',
        year: 3100,
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'Dados incorretos.' });
  });
});
