import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando validatePiece', function () {
  it('testando caso id e name não estejam no body', async function () {
    const { status, body } = await chai.request(app).patch('/pieces');

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"id" e "name" são obrigatórios' });
  });

  it(
    'testando caso name não tenha pelo menos 4 caracteres',
    async function () {
      const { status, body } = await chai.request(app).patch('/pieces').send({
        id: 2, name: 'asd',
      });

      expect(status).to.be.equal(400);
      expect(body).to.be.eqls({
        message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' });
    },
  );
});
