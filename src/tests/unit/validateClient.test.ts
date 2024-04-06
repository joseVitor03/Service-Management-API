import chai from 'chai';
import chaiHttp = require('chai-http');
import sinon from 'sinon';
// @ts-check
import jwt from 'jsonwebtoken';
import App from '../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';
describe('testando validateFindClient e validateUpdateClient', function () {
  afterEach(() => {
    sinon.restore();
  });
  it('testando validateFindClient. caso não tenha name e plate', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/clients/findClient')
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: '"name" e "plate" são obrigatórios.' });
  });

  it('testando validateUpdateClient. com a plate em formato inválido', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/clients').send({
      id: 1,
      name: 'Vitor',
      carId: 1,
      plate: 'MCHA23',
      phone: '61998227449',
      color: 'PRATA',
    })
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: 'Algum dos dados enviados estão estão com o formato incorreto.' });
  });

  it('testando validateUpdateClient. sem o id', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).patch('/clients').send({
      name: 'Vitor',
      carId: 1,
      plate: 'MCH1A23',
      phone: '61998227449',
      color: 'PRATA',
    })
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: '"id", "name", "phone", "plate", "carId", "color" são obrigatórios.' });
  });

  it('testando validateInsertClient. com a plate em formato inválido', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/clients').send({
      name: 'Vitor',
      carId: 1,
      plate: 'MCHA23',
      phone: '61998227449',
      color: 'PRATA',
    })
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: 'Algum dos dados enviados estão estão com o formato incorreto.' });
  });

  it('testando validateInsertClient. sem name', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).post('/clients').send({
      carId: 1,
      plate: 'MCH1A23',
      phone: '61998227449',
      color: 'PRATA',
    })
      .set('Authorization', bearer);

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({
      message: '"name", "phone", "plate", "carId", "color" são obrigatórios.' });
  });
});
