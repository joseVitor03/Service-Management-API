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

describe('validateToken Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando validação caso não tenha token', async function () {
    const { status, body } = await chai.request(app).get('/pieces');

    expect(status).to.be.equal(401);
    expect(body).to.be.eqls({ message: 'É necessário um token' });
  });

  it('testando validação de token incorreto', async function () {
    sinon.stub(jwt, 'verify').throws();

    const { status, body } = await chai.request(app).get('/pieces').set('Authorization', bearer);

    expect(status).to.be.equal(403);
    expect(body).to.be.eqls({ message: 'Token incorreto ou expirado' });
  });
});
