import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import jwt from 'jsonwebtoken';
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';
describe('testando validatePiece', function () {
  afterEach(() => {
    sinon.restore();
  });
  it('testando caso id e name não estejam no body', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'a' } as any);

    const { status, body } = await chai.request(app).patch('/pieces').set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"id" e "name" são obrigatórios' });
  });

  it(
    'testando caso name não tenha pelo menos 4 caracteres',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/pieces').send({
        id: 2, name: 'asd',
      }).set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.eqls({
        message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' });
    },
  );
});
