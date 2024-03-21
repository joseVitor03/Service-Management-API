import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import chaiHttp = require('chai-http');
import SequelizeAdmin from '../../database/models/SequelizeAdmin';
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';

describe('testando rotas de admin', function () {
  this.afterEach(() => {
    sinon.restore();
  });

  it('testando rota POST /login', async function () {
    sinon.stub(SequelizeAdmin, 'findOne').resolves({
      id: 1,
      email: 'jv681033@gmail.com',
      password: 'senha',
    } as any);
    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').returns('any' as any);
    const { status, body } = await chai.request(app).post('/login').send(
      { email: 'any', password: 'senha' },
    );

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ token: 'any' });
  });

  it('testando rota POST /admin', async function () {
    sinon.stub(SequelizeAdmin, 'findOne').resolves(null);
    sinon.stub(SequelizeAdmin, 'create').resolves({ id: 1, email: 'any', password: 'any' } as any);
    sinon.stub(bcrypt, 'hashSync').returns('any');
    sinon.stub(jwt, 'sign').returns('any' as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/admin').send(
      { email: 'email@gmail.com', password: 'aJ98112@' },
    ).set('Authorization', bearer);

    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal({ id: 1, email: 'any', password: 'any' });
  });

  it('testando rota DELETE /admin', async function () {
    sinon.stub(SequelizeAdmin, 'destroy').resolves(1 as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/admin').send(
      { email: 'email@gmail.com' },
    ).set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Admin removido do sucesso' });
  });
});