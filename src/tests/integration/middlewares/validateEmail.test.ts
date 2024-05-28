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

describe('validateEmail Test', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('testando se cai na validação de "email" é obrigatório', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/admin')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"email" é obrigatório' });
  });

  it('testando se cai na validação de "email" em formato incorreto', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/admin')
      .set('Authorization', bearer).send({
        email: 'example@.com',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'O formato do email é inválido' });
  });
});
