import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
const bearer = 'Bearer any';
const path = '/services/dates';
describe('validateDateService Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('testando caso alguma das datas não estejam na requisição', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get(path)
      .set('Authorization', bearer).send({
        initialDate: '12-01-1990',
        finalDate: '20-01-1990',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'dateFinal e dateInitial são obrigatórios' });
  });

  it('testando caso alguma das datas estejam com em formato inválido', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get(path)
      .set('Authorization', bearer).send({
        dateInitial: '12-01-1990',
        dateFinal: '20-01-1990',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'formato inválido de alguma das datas.' });
  });

  it('testando caso a dateInital seja inexistente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get(path)
      .set('Authorization', bearer).send({
        dateInitial: '2023-02-29',
        dateFinal: '2023-03-10',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'Mês inicial inexistente.' });
  });

  it('testando caso a dateInital seja uma data após dateFinal', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get(path)
      .set('Authorization', bearer).send({
        dateInitial: '2023-03-29',
        dateFinal: '2023-03-10',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'dateInitial não pode ser uma data após a dateFinal' });
  });

  it('testando caso a dateFinal seja inexistente', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get(path)
      .set('Authorization', bearer).send({
        dateInitial: '2023-02-10',
        dateFinal: '2023-02-30',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.eqls({ message: 'Mês final inexistente.' });
  });
});
