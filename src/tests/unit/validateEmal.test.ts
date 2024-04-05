import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando validateEmail', function () {
  it('testando caso não possua email no body', async function () {
    const { status, body } = await chai.request(app).delete('/admin');

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"email" são obrigatórios' });
  });

  it('testando caso email não esteja em uma formato valido de email no body', async function () {
    const { status, body } = await chai.request(app).delete('/admin').send({
      email: 'jv69@gmacom',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'O formato do email é inválido' });
  });
});
