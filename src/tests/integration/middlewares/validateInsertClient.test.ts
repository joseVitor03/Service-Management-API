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

describe('validateInsertClient Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando caso não tenha algum dos campos obrigatórios', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/clients')
      .set('Authorization', bearer).send({
        name: 'vitor',
        phone: '12345678910',
        carId: 3,
        carColor: 'azul',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: '"name", "phone", "plate", "carId", "carColor" são obrigatórios.',
    });
  });

  it('testando se os campos estão no formato correto', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/clients')
      .set('Authorization', bearer).send({
        name: 'vitor',
        phone: '1234567891',
        plate: 'ABC1D23',
        carId: 3,
        carColor: 'azul',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: 'Algum dos dados enviados estão estão com o formato incorreto.',
    });
  });
});
