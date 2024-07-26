import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import ServicesService from '../../../services/Service.service';
import ServiceController from '../../../controller/Service.controller';
import { finalFindServiceResult, listServiceFalseMock,
  listServiceTrueMock } from '../../mocks/serviceMock';

chai.use(sinonChai);

describe('teste Unitário de Service.controller', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  this.afterEach(() => {
    sinon.restore();
  });

  it(`testando se a função listServicesPaymentStatusFalse 
  retorna com status: 200 e um body`, async function () {
    const serviceServiceStub = sinon.createStubInstance(ServicesService);
    serviceServiceStub.listServicesPaymentStatusFalse
      .resolves({ status: 'SUCCESSFUL', data: listServiceFalseMock } as any);
    const serviceController = new ServiceController(serviceServiceStub);

    await serviceController.listServicesPaymentStatusFalse(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listServiceFalseMock);
  });

  it(`testando se a função listServicesPaymentStatusTrue
  retorna com status: 200 e um body`, async function () {
    const serviceServiceStub = sinon.createStubInstance(ServicesService);
    serviceServiceStub.listServicesPaymentStatusTrue
      .resolves({ status: 'SUCCESSFUL', data: listServiceTrueMock } as any);
    const serviceController = new ServiceController(serviceServiceStub);

    await serviceController.listServicesPaymentStatusTrue(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listServiceTrueMock);
  });

  it('testando se a função findService retorna com status: 200 e um body', async function () {
    const serviceServiceStub = sinon.createStubInstance(ServicesService);
    serviceServiceStub.findService.resolves({ status: 'SUCCESSFUL',
      data: finalFindServiceResult } as any);
    const serviceController = new ServiceController(serviceServiceStub);
    req.params = { id: '1' };

    await serviceController.findService(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.calledWith(finalFindServiceResult);
  });
});
