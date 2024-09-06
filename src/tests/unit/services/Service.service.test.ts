import { expect } from 'chai';
import sinon from 'sinon';
import SequelizeServices from '../../../database/models/6-SequelizeServices';
import ServicesService from '../../../services/Service.service';
import SequelizeItensServices from '../../../database/models/8-SequelizeItensServices';
import SequelizeEmployeeServices from '../../../database/models/7-SequelizeEmployeeServices';
import { finalFindServiceResult, findServiceMockEmployee,
  findServiceMockItemService, listServiceFalseMock,
  listServiceTrueMock } from '../../mocks/serviceMock';

describe('teste Unitário de Service.service', function () {
  const servicesService = new ServicesService();
  afterEach(function () {
    sinon.restore();
  });
  it(
    `testando se a função listServicesPaymentStatusFalse 
    retorna um objeto com status: SUCCESSFUL e um data`,
    async function () {
      const builtServices = listServiceFalseMock.map((service) => {
        const builtService = SequelizeServices.build(service as any);
        const plainService = builtService.dataValues as any;
        plainService.client = service.client;
        plainService.car = service.car;
        return plainService;
      });
      sinon.stub(SequelizeServices, 'findAll').resolves(builtServices);

      const { status, data } = await servicesService.listServicesPaymentStatusFalse();

      expect(status).to.be.equal('SUCCESSFUL');
      expect(data).to.be.eqls(listServiceFalseMock);
    },
  );

  it(
    'testando se a função listServicesPaymentStatusTrue retorna um objeto com status: SUCCESSFUL',
    async function () {
      const builtServices = listServiceTrueMock.map((service) => {
        const builtService = SequelizeServices.build(service as any);
        const plainService = builtService.get({ plain: true }) as any;
        plainService.client = service.client;
        plainService.car = service.car;
        return plainService;
      });
      sinon.stub(SequelizeServices, 'findAll').resolves(builtServices);

      const { status, data } = await servicesService.listServicesPaymentStatusTrue();

      expect(status).to.be.equal('SUCCESSFUL');
      expect(data).to.be.eqls(listServiceTrueMock);
    },
  );

  it(`testando se a função findService retorna um objeto com status: SUCCESSFUL 
  e data com dados do serviço`, async function () {
    const builtServicesPiece = findServiceMockItemService.map((data) => {
      const builtService = SequelizeItensServices.build(data as any);
      const plainService = builtService.get({ plain: true }) as any;
      plainService.itemName = data.itemName;
      plainService.service = data.service;
      return plainService;
    });
    const builtServicesEmployee = findServiceMockEmployee.map((data) => {
      const builtService = SequelizeEmployeeServices.build(data.dataValues as any);
      const plainService = builtService.get({ plain: true }) as any;
      plainService.dataValues = { ...data.dataValues };
      return plainService;
    });
    sinon.stub(SequelizeItensServices, 'findAll').resolves(builtServicesPiece);
    sinon.stub(SequelizeEmployeeServices, 'findAll').resolves(builtServicesEmployee);

    const { status, data } = await servicesService.findService(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.eqls(finalFindServiceResult);
  });
});
