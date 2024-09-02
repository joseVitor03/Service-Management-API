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

describe('validateUpdateEmployee Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando se campo "name" é obrigatório', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employees/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'name é obrigatório' });
  });

  it('testando campo "name" precisa ter pelo menos 5 caracteres', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employees/1')
      .set('Authorization', bearer).send({
        name: 'carl',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" precisa ter pelo menos 5 caracteres' });
  });
});
