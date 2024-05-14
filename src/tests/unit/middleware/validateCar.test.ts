import chai from 'chai';
import chaiHttp = require('chai-http');
import sinon from 'sinon';
// @ts-check
import jwt from 'jsonwebtoken';
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';
describe('testando validateCar', function () {
  afterEach(() => {
    sinon.restore();
  });

  it(
    'testando se caso não possua name ou brand ou year irá retornar status 400',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/cars').send({
        name: '',
        brand: '',
      }).set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: '"name", "brand" e "year" são obrigatórios.' });
    },
  );

  it('testando se caso brand esteja incorreto. se retornará status 400', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/cars').send({
      name: 'joao',
      brand: 'Qualquer',
      year: 2022,
    }).set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: 'Dados incorretos.' });
  });
});
