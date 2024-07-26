import { expect } from 'chai';
import sinon from 'sinon';
import SequelizeClient from '../../../database/models/SequelizeClient';
import { mockFindClient, mockInsertClient, mockListClients } from '../../mocks/clientMocks';
import ClientService from '../../../services/Client.service';

const CLIENTSERVICE = new ClientService();
describe('teste Unitário de Client.service', function () {
  afterEach(() => {
    sinon.restore();
  });

  it(
    'testando se função a findClient retorna um objeto com status: SUCCESSFUL',
    async function () {
      const builtClients = mockFindClient.map((client) => {
        const builtClient = SequelizeClient.build(client as any);
        const plainClient = builtClient.get({ plain: true }) as any;
        plainClient.car = client.car; // Adiciona manualmente os dados do carro
        return plainClient;
      });

      sinon.stub(SequelizeClient, 'findAll').resolves(builtClients as any);

      const { status, data } = await CLIENTSERVICE.findClient({ name: 'any', plate: '' });

      expect(status).to.be.equal('SUCCESSFUL');
      expect(data).to.be.deep.equal(mockFindClient);
    },
  );

  it(
    'testando se a função findClient retorna um objeto com status: NOT FOUND',
    async function () {
      sinon.stub(SequelizeClient, 'findAll').resolves([]);

      const { status, data } = await CLIENTSERVICE.findClient({ name: 'any', plate: '' });

      expect(status).to.be.equal('NOT_FOUND');
      expect(data).to.be.deep.equal({ message: 'cliente não encontrado.' });
    },
  );

  it(
    'testando se função listClients esta retornando status: SUCCESSFULL e uma lista de clients',
    async function () {
      const builtClients = mockListClients.map((client) => {
        const builtClient = SequelizeClient.build(client as any);
        const plainClient = builtClient.get({ plain: true }) as any;
        plainClient.car = client.car;
        return plainClient;
      });
      sinon.stub(SequelizeClient, 'findAll').resolves(builtClients);

      const { status, data } = await CLIENTSERVICE.listClients();

      expect(status).to.be.equal('SUCCESSFUL');
      expect(data).to.be.eqls(mockListClients);
    },
  );

  it(
    'testando se a função insertCLient esta retornando status: CREATED, e os dados do client',
    async function () {
      const builtClient = SequelizeClient.build(mockInsertClient as any);
      const plainClient = builtClient.get({ plain: true }) as any;
      plainClient.car = mockInsertClient.car;
      sinon.stub(SequelizeClient, 'findOrCreate').resolves([plainClient] as any);

      const { status, data } = await CLIENTSERVICE.insertClient({ name: mockInsertClient.name,
        carId: mockInsertClient.car.id,
        phone: mockInsertClient.phone,
        plate: mockInsertClient.plate,
        carColor: mockInsertClient.carColor,
      });

      expect(status).to.be.equal('CREATED');
      expect(data).to.be.eqls(mockInsertClient);
    },
  );
});
