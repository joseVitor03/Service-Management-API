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

describe('validateUpdateStatusService Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando não possua o paymentStatus no corpo da requisição', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/services/2')
      .set('Authorization', bearer)
      .send({});

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"paymentStatus" é requirido.' });
  });

  it('testando caso o paymentStatus não seja um booleano', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/services/2')
      .set('Authorization', bearer)
      .send({ paymentStatus: 'a' });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"paymentStatus" precisa ser um booleano.' });
  });
});
