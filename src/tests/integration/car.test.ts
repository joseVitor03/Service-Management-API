import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import SequelizeCar from '../../database/models/SequelizeCar';
// @ts-check
import App from '../../app';
import { mockCars, mockFindCar, mockInsert, updateCarMock } from '../mocks/carMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Cars Test', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('listando carros', async function () {
    sinon.stub(SequelizeCar, 'findAll').resolves(mockCars as any);

    const { status, body } = await chai.request(app).get('/cars');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockCars);
  });

  it('encontrando carros usando query', async function () {
    sinon.stub(SequelizeCar, 'findAll').resolves(mockFindCar as any);

    const { status, body } = await chai.request(app).get('/cars/findCars?name=c');
    expect(status).to.be.equal(200);
    expect(body).to.eqls(mockFindCar);
  });

  it('inserindo carro', async function () {
    sinon.stub(SequelizeCar, 'findOrCreate').resolves([mockInsert, 1] as any);
    const { status, body } = await chai.request(app).post('/cars').send({
      name: 'HB20',
      brand: 'HYUNDAI',
      year: 2020,
    });

    expect(status).to.be.equal(201);
    expect(body).to.be.deep.equal(mockInsert);
  });

  it('testando remover carro', async function () {
    sinon.stub(SequelizeCar, 'destroy').resolves(1);
    const { status, body } = await chai.request(app).delete('/cars').send({ name: 'HB20',
      year: 2020,
      brand: 'HYUNDAI' });

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ name: 'HB20',
      year: 2020,
      brand: 'HYUNDAI' });
  });

  it('testando remover carro inexistente', async function () {
    sinon.stub(SequelizeCar, 'destroy').resolves(0);
    const { status, body } = await chai.request(app).delete('/cars').send({ name: 'HB20',
      year: 2020,
      brand: 'HYUNDAI' });

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({ message: 'carro não encontrado' });
  });

  it('atualizando dados do carro', async function () {
    sinon.stub(SequelizeCar, 'update').resolves([1]);

    const { status, body } = await chai.request(app).patch('/cars').send(updateCarMock);

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(updateCarMock);
  });
});
