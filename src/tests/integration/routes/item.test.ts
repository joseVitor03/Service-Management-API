import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeItens from '../../../database/models/5-SequelizeItens';
import { findAll, findItens } from '../../mocks/pieceMocks';
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';

describe('testando rota de items', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('testando lista de itens', async function () {
    sinon.stub(SequelizeItens, 'findAll').resolves(findAll as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/itens')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(findAll);
  });

  it('testando lista de itens, mas sem token', async function () {
    sinon.stub(SequelizeItens, 'findAll').resolves(findAll as any);
    sinon.stub(jwt, 'verify').throws({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/itens')
      .set('Authorization', 'Bearer');

    expect(status).to.be.equal(403);
    expect(body).to.be.eqls({ message: 'Token incorreto ou expirado' });
  });

  it('testando rota GET itens/finditens', async function () {
    sinon.stub(SequelizeItens, 'findAll').resolves(findItens as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/itens/findItens?name=fi')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(findItens);
  });

  it(
    'testando rota GET itens/findItens caso não tenha nada na query name',
    async function () {
      sinon.stub(SequelizeItens, 'findAll').resolves(findItens as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).get('/itens/findItens')
        .set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Requisição com dados inválidos' });
    },
  );

  it(
    'testando rota POST /itens',
    async function () {
      sinon.stub(SequelizeItens, 'findOrCreate').resolves([{ id: 3, name: 'CABEÇOTE' }] as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/itens').send({ name: 'cabeçote' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal({ id: 3, name: 'CABEÇOTE' });
    },
  );

  it(
    'testando rota POST /itens, mas sem o name no corpo da requisição',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/itens')
        .set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(
        { message: 'Para cadastrar um novo item precisa ter pelo menos 4 caracteres' },
      );
    },
  );

  it(
    'testando rota DELETE /itens',
    async function () {
      sinon.stub(SequelizeItens, 'destroy').resolves(1 as number);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).delete('/itens/1')
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'Item excluído com sucesso.' });
    },
  );

  it(
    'testando rota DELETE /itens, mas com item inexistente',
    async function () {
      sinon.stub(SequelizeItens, 'destroy').resolves(0 as number);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).delete('/itens/1')
        .set('Authorization', bearer);

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Item não encontrado' });
    },
  );

  it(
    'testando rota PATCH /itens',
    async function () {
      sinon.stub(SequelizeItens, 'update').resolves([1] as [number]);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/itens')
        .send({ id: 2, name: 'cabeçote' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ id: 2, name: 'cabeçote' });
    },
  );
  it(
    'testando rota PATCH /itens, mas com item inexistente',
    async function () {
      sinon.stub(SequelizeItens, 'update').resolves([0] as [number]);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/itens')
        .send({ id: 2, name: 'filtro de oleo' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Item não encontrado' });
    },
  );
});
