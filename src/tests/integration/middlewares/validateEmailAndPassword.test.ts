import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';

describe('validateEmailAndPassword Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando se cai na validação de "email" e "password" são obrigatórios', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: '',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"email" ou "senha" são obrigatórios' });
  });

  it('testando se cai na validação de "email" em formato incorreto', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .set('Authorization', bearer).send({
        email: 'example@.com',
        password: '12345',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'O formato do email é inválido' });
  });

  it('testando se cai na validação de "password" menor que 8 caracteres', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .set('Authorization', bearer).send({
        email: 'example@gmail.com',
        password: '1234567',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'A senha deve ter pelo menos 8 caracteres' });
  });

  it(`testando se cai na validação de "password" caso não tenha letra maiúscula
  ou letra minúscula ou caractere especial`, async function () {
    const { status, body } = await chai.request(app).post('/login')
      .set('Authorization', bearer).send({
        email: 'example@gmail.com',
        password: 'Je1234567',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: `A senha deve conter pelo menos uma letra maiúscula,
    uma letra minúscula e um caractere especial` });
  });
});
