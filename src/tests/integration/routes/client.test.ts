import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeClient from '../../../database/models/SequelizeClient';
import SequelizeCar from '../../../database/models/SequelizeCar';
// @ts-check
import App from '../../../app';
import { mockListClients, mockFindClient,
  mockInsertClient, mockUpdateClient,
  findClientById } from '../../mocks/clientMocks';
import { mockCars } from '../../mocks/carMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';
const phone = '77 12345-6789';
describe('testando rotas client', function () {
  this.afterEach(() => {
    sinon.restore();
  });
  it('GET /clients, listando clients', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findAll').resolves(mockListClients as any);

    const { status, body } = await chai.request(app).get('/clients').set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(mockListClients);
  });

  it('POST /clients/findClient, encontrando clients', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findAll').resolves(mockFindClient as any);

    const { status, body } = await chai.request(app).post('/clients/findClient')
      .set('Authorization', bearer)
      .send({
        name: 'f',
        plate: '',
      });

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(mockFindClient);
  });

  it('POST /clients/findClient, caso não encontre nenhum client', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findAll').resolves([]);

    const { status, body } = await chai.request(app).post('/clients/findClient')
      .set('Authorization', bearer)
      .send({
        name: 'f',
        plate: '',
      });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'cliente não encontrado.' });
  });

  it('POST /clients, inserindo client', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findOrCreate').resolves([mockInsertClient] as any);

    const { status, body } = await chai.request(app).post('/clients')
      .set('Authorization', bearer)
      .send({
        name: 'Vitor',
        carId: 1,
        plate: 'MCH-1B23',
        phone,
        carColor: 'PRATA',
      });

    expect(status).to.be.equal(201);
    expect(body).to.be.eqls(mockInsertClient);
  });

  it('PUT /clients, atualizando client', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'update').resolves([1] as any);
    sinon.stub(SequelizeCar, 'findAll').resolves(mockCars as any);

    const { status, body } = await chai.request(app).put('/clients/2')
      .set('Authorization', bearer)
      .send({
        name: 'Fbio',
        carId: 1,
        plate: 'MCH-1A24',
        phone,
        carColor: 'PRATA',
      });

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(mockUpdateClient);
  });

  it('PUT /clients, caso não exista o carId', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'update').resolves([1] as any);
    sinon.stub(SequelizeCar, 'findAll').resolves([]);

    const { status, body } = await chai.request(app).put('/clients/3')
      .set('Authorization', bearer)
      .send({
        name: 'Fbio',
        carId: 6,
        plate: 'MCH-1A24',
        phone,
        carColor: 'PRATA',
      });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'carro inexistente' });
  });

  it('PUT /clients, caso não exista o cliente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'update').resolves([0] as any);
    sinon.stub(SequelizeCar, 'findAll').resolves(mockCars as any);

    const { status, body } = await chai.request(app).put('/clients/2')
      .set('Authorization', bearer)
      .send({
        name: 'Fbio',
        carId: 1,
        plate: 'MCH-1A24',
        phone,
        carColor: 'PRATA',
      });

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'cliente inexistente.' });
  });

  it('DELETE /clients, deletando cliente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'destroy').resolves(1 as any);

    const { status, body } = await chai.request(app).delete('/clients/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls({ message: 'cliente excluído' });
  });

  it('DELETE /clients, caso não encontre cliente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'destroy').resolves(0 as any);

    const { status, body } = await chai.request(app).delete('/clients/1')
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'cliente não encontrado.' });
  });
  it('GET /clients/:id, encontrando cliente pelo id', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findOne').resolves(findClientById as any);

    const { status, body } = await chai.request(app).get('/clients/3')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(findClientById);
  });

  it('GET /clients/:id, caso não encontre o cliente pelo id', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);
    sinon.stub(SequelizeClient, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/clients/300')
      .set('Authorization', bearer);

    expect(status).to.be.equal(404);
    expect(body).to.be.eqls({ message: 'cliente não encontrado' });
  });
});
