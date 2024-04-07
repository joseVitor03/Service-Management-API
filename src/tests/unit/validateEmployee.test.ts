import chai from 'chai';
import chaiHttp = require('chai-http');
// @ts-check
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';
describe('testando validateInsertEmployee e validateUpdateEmployee', function () {
  this.afterEach(() => {
    sinon.restore();
  });
  it('testando validateInsertEmployee. se não possui name', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/employee').set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: ' "name" é obrigatório' });
  });

  it('testando validateInsertEmployee. se name ter menos de 3 caracteres', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/employee').send({
      name: 'as',
    }).set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" precisa ter pelo menos 3 caracteres' });
  });

  it('testando validateUpdateEmployee. caso não tenha id e name', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employee')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"id" e "name" são obrigatórios' });
  });

  it('testando validateUpdateEmployee. caso name tenha menos de 3 caracteres', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employee').send({
      id: 2,
      name: 'ab',
    }).set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" precisa ter pelo menos 3 caracteres' });
  });
});
