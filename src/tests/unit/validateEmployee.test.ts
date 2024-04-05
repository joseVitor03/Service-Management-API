import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('testando validateInsertEmployee e validateUpdateEmployee', function () {
  it('testando validateInsertEmployee. se não possui name', async function () {
    const { status, body } = await chai.request(app).post('/employee');

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: ' "name" é obrigatório' });
  });

  it('testando validateInsertEmployee. se name ter menos de 3 caracteres', async function () {
    const { status, body } = await chai.request(app).post('/employee').send({
      name: 'as',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" precisa ter pelo menos 3 caracteres' });
  });

  it('testando validateUpdateEmployee. caso não tenha id e name', async function () {
    const { status, body } = await chai.request(app).patch('/employee');

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"id" e "name" são obrigatórios' });
  });

  it('testando validateUpdateEmployee. caso name tenha menos de 3 caracteres', async function () {
    const { status, body } = await chai.request(app).patch('/employee').send({
      id: 2,
      name: 'ab',
    });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" precisa ter pelo menos 3 caracteres' });
  });
});
