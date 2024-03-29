import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeEmployee from '../../database/models/SequelizeEmployee';
import { mockFindAll, mockInsert } from '../mocks/employeeMocks';
// @ts-check
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';

describe('testando rotas de employee', function () {
  this.afterEach(() => {
    sinon.restore();
  });

  it('testando rota GET, listagem de funcionários', async function () {
    sinon.stub(SequelizeEmployee, 'findAll').resolves(mockFindAll as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/employee').set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockFindAll);
  });

  it('testando rota POST, inserindo funcionário', async function () {
    sinon.stub(SequelizeEmployee, 'findOrCreate').resolves([mockInsert] as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/employee').send({
      name: 'Leonardo',
    }).set('Authorization', bearer);

    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(mockInsert);
  });

  it('testando rota DELETE, deletando funcionário', async function () {
    sinon.stub(SequelizeEmployee, 'destroy').resolves(1 as number);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/employee/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({ message: 'funcionário excluído.' });
  });

  it('testando rota DELETE, deletando funcionário inexistente', async function () {
    sinon.stub(SequelizeEmployee, 'destroy').resolves(0 as number);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).delete('/employee/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'funcionário não encontrado' });
  });

  it('testando rota PATCH, atualizando funcionário', async function () {
    sinon.stub(SequelizeEmployee, 'update').resolves([1] as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employee')
      .send({ id: 1, name: 'Fabio' })
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({ id: 1, name: 'Fabio' });
  });

  it('testando rota PATCH, atualizando funcionário inexistente', async function () {
    sinon.stub(SequelizeEmployee, 'update').resolves([0] as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/employee')
      .send({ id: 1, name: 'Fabio' })
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'funcionário não encontrado.' });
  });
});
