import sinon from 'sinon';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');
import SequelizeServices from '../../database/models/SequelizeServices';
import { finalFindServiceResult, findServiceMockDataService,
  findServiceMockEmployee,
  findServiceMockPieceService, listServiceMock } from '../mocks/serviceMock';
import SequelizeEmployeeServices from '../../database/models/SequelizeEmployeeServices';
import SequelizePiecesServices from '../../database/models/SequelizePiecesServices';
import App from '../../app';

const { app } = new App();
const { expect } = chai;

chai.use(chaiHttp);
const bearer = 'Bearer any';

describe('testando rota de services', function () {
  afterEach(() => {
    sinon.restore();
  });
  it('testando rota GET para listagem de serviços', async function () {
    sinon.stub(SequelizeServices, 'findAll').resolves(listServiceMock as any);
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    const { status, body } = await chai.request(app).get('/services').set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(body);
  });

  it('testando rota GET para encontrar um serviço com detalhes', async function () {
    sinon.stub(jwt, 'verify').returns({ name: 'any' } as any);

    sinon.stub(SequelizePiecesServices, 'findAll')
      .resolves(findServiceMockPieceService as any);

    // sinon.stub(SequelizeServices, 'findAll').resolves(findServiceMockDataService as any);

    sinon.stub(SequelizeEmployeeServices, 'findAll')
      .resolves(findServiceMockEmployee as any);

    const { status, body } = await chai.request(app).get('/services/2')
      .set('Authorization', bearer);

    expect(status).to.be.equal(200);
    expect(body).to.be.eqls(finalFindServiceResult);
  });
});
