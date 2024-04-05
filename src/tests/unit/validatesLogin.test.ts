import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando as validações da rota /login', function () {
  it('testando com email com formato incorreto.', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: 'jvgmail.con',
      password: 'senhaA@12',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'O formato do email é inválido' });
  });
  it('testando com email em formato correto, mas sem senha', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: 'jv@gmail.com',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"email" ou "senha" são obrigatórios' });
  });

  it('testando com email em formato correto, mas senha menor que 8 caracteres', async function () {
    const { status, body } = await chai.request(app).post('/login').send({
      email: 'jv@gmail.com',
      password: '1234567',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'A senha deve ter pelo menos 8 caracteres' });
  });

  it(
    'testando com email em formato correto, mas senha não tenha letra maiúscula',
    async function () {
      const { status, body } = await chai.request(app).post('/login').send({
        email: 'jv1@gmail.com',
        password: '1234567@a',
      });

      expect(status).to.be.equal(400);
      expect(body).to.be.eqls({ message: `A senha deve conter pelo menos uma letra maiúscula,
      uma letra minúscula e um caractere especial` });
    },
  );
});
