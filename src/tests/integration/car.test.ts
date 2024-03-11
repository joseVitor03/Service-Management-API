import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import SequelizeCar from '../../database/models/SequelizeCar';
// @ts-check
import App from '../../app';
import mockCars from '../mocks/carMocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Films Test', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('listando filmes', async function () {
    sinon.stub(SequelizeCar, 'findAll').resolves(mockCars as any);

    const { status, body } = await chai.request(app).get('/cars');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockCars);
  });
});
