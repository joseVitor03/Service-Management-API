import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';
describe('testando validateEmail', function () {
  this.afterEach(() => {
    sinon.restore();
  });
  it('testando caso não possua email no body', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/admin').set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"email" são obrigatórios' });
  });

  it('testando caso email não esteja em uma formato valido de email no body', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/admin').send({
      email: 'jv69@gmacom',
    }).set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'O formato do email é inválido' });
  });
});
