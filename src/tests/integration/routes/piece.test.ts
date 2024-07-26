import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizePiece from '../../../database/models/SequelizePieces';
import { findAll, findPieces } from '../../mocks/pieceMocks';
// @ts-check
import App from '../../../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const bearer = 'Bearer any';

describe('testando rota de peças', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('testando lista de peças', async function () {
    sinon.stub(SequelizePiece, 'findAll').resolves(findAll as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/pieces')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(findAll);
  });

  it('testando lista de peças, mas sem token', async function () {
    sinon.stub(SequelizePiece, 'findAll').resolves(findAll as any);
    sinon.stub(jwt, 'verify').throws({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/pieces')
      .set('Authorization', 'Bearer');

    expect(status).to.be.equal(403);
    expect(body).to.be.eqls({ message: 'Token incorreto ou expirado' });
  });

  it('testando rota GET pieces/findPieces', async function () {
    sinon.stub(SequelizePiece, 'findAll').resolves(findPieces as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/pieces/findPieces?name=fi')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(findPieces);
  });

  it(
    'testando rota GET pieces/findPieces caso não tenha nada na query name',
    async function () {
      sinon.stub(SequelizePiece, 'findAll').resolves(findPieces as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).get('/pieces/findPieces')
        .set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Requisição com dados inválidos' });
    },
  );

  it(
    'testando rota POST /pieces',
    async function () {
      sinon.stub(SequelizePiece, 'findOrCreate').resolves([{ id: 3, name: 'CABEÇOTE' }] as any);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/pieces').send({ name: 'cabeçote' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal({ id: 3, name: 'CABEÇOTE' });
    },
  );

  it(
    'testando rota POST /pieces, mas sem o name no corpo da requisição',
    async function () {
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).post('/pieces')
        .set('Authorization', bearer);

      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal(
        { message: 'Para cadastrar uma nova peça precisa ter pelo menos 4 caracteres' },
      );
    },
  );

  it(
    'testando rota DELETE /pieces',
    async function () {
      sinon.stub(SequelizePiece, 'destroy').resolves(1 as number);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).delete('/pieces/1')
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'Peça excluída com sucesso.' });
    },
  );

  it(
    'testando rota DELETE /pieces, mas com peça inexistente',
    async function () {
      sinon.stub(SequelizePiece, 'destroy').resolves(0 as number);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).delete('/pieces/1')
        .set('Authorization', bearer);

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Peça não encontrada' });
    },
  );

  it(
    'testando rota PATCH /pieces',
    async function () {
      sinon.stub(SequelizePiece, 'update').resolves([1] as [number]);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/pieces')
        .send({ id: 2, name: 'cabeçote' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ id: 2, name: 'cabeçote' });
    },
  );
  it(
    'testando rota PATCH /pieces, mas com peça inexistente',
    async function () {
      sinon.stub(SequelizePiece, 'update').resolves([0] as [number]);
      sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

      const { status, body } = await chai.request(app).patch('/pieces')
        .send({ id: 2, name: 'filtro de oleo' })
        .set('Authorization', bearer);

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'Peça não encontrada' });
    },
  );
});
