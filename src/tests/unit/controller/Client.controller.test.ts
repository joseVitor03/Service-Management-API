import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import ClientService from '../../../services/Client.service';
import { mockFindClient, mockInsertClient, mockListClients } from '../../mocks/clientMocks';
import ClientController from '../../../controller/Client.controller';

chai.use(sinonChai);

describe('teste Unitário de Client.controller', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  this.afterEach(() => {
    sinon.restore();
  });

  it('testando se função findClient retorna com status: 200', async function () {
    const clientServiceStub = sinon.createStubInstance(ClientService);
    clientServiceStub.findClient.resolves({ status: 'SUCCESSFUL', data: mockFindClient } as any);
    const clientController = new ClientController(clientServiceStub);
    req.body = {
      name: 'fu',
      plate: '',
    };

    await clientController.findClient(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockFindClient);
  });

  it(
    'testando se a função listClients retorna com status: 200 e json com uma lista',
    async function () {
      const clientServiceStub = sinon.createStubInstance(ClientService);
      clientServiceStub.listClients
        .resolves({ status: 'SUCCESSFUL',
          data: mockListClients } as any);

      const clientController = new ClientController(clientServiceStub);

      await clientController.listClients(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockListClients);
    },
  );

  it('testando se a função insertClient retorna com status: CREATED', async function () {
    const clientServiceStub = sinon.createStubInstance(ClientService);
    clientServiceStub.insertClient.resolves({ status: 'CREATED',
      data: mockInsertClient } as any);
    const clientController = new ClientController(clientServiceStub);
    req.body = {
      name: 'maria',
      phone: '123456789120',
      plate: 'ABC1D23',
      carId: 2,
      carColor: 'VERDE',
    };

    await clientController.inserClient(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.calledWith(mockInsertClient);
  });
});
