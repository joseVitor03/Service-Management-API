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

describe('validateItens Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando se a requisição PATCH cai na validação de campos obrigatórios', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/itens/2').set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" é obrigatório' });
  });

  it(
    'testando se a requisição PATCH cai na validação de caso "name" seja menor que 4 caracteres',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/itens/2')
        .set('Authorization', bearer)
        .send({
          name: 'car',
        });

      expect(status).to.be.equal(400);
      expect(body).to.be.eqls(
        { message: 'Para cadastrar um novo item precisa ter pelo menos 4 caracteres' },
      );
    },
  );
});
