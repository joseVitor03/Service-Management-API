import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando validateCar', function () {
  it(
    'testando se caso não possua name ou brand ou year irá retornar status 400',
    async function () {
      const { status, body } = await chai.request(app).post('/cars').send({
        name: '',
        brand: '',
      });
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: '"name", "brand" e "year" são obrigatórios.' });
    },
  );

  it(
    'testando se caso brand esteja incorreto. se retornará status 400',
    async function () {
      const { status, body } = await chai.request(app).post('/cars').send({
        name: 'joao',
        brand: 'Qualquer',
        year: 2022,
      });
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Dados incorretos.' });
    },
  );
});
