import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando validateToken', function () {
  it('testando caso não possua token', async function () {
    const { status, body } = await chai.request(app).get('/cars');

    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({ message: 'É necessário um token' });
  });

  it('testando caso o token seja incorreto', async function () {
    sinon.stub(jwt, 'verify').throws();
    const { status, body } = await chai.request(app).get('/cars')
      .set('Authorization', 'Bearer any');

    expect(status).to.be.equal(403);
    expect(body).to.be.eqls({ message: 'Token incorreto ou expirado' });
  });
});
