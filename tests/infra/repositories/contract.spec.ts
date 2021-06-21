import Contract from '@/domain/entities/contract';
import ContractRepository from '@/infra/db/repositories/contracts';
import { getConnection, getRepository } from 'typeorm';
import ContractMapping from '@/infra/db/mappings/contract';
import Planets from '@/domain/enums/planet';
import DbConnectionOptionsTesting from '@/tests/config/db/connection';
import { typeOrmConnectionFactory } from '@/infra/db/config';
import ContractStatus from '@/domain/enums/contract-status';

type SutTypes = {
  sut: ContractRepository,
  ormRepositorySpy: jest.SpyInstance
}

function makeSut(spyMethod?) : SutTypes {
  const ormRepository = getRepository<Contract>(ContractMapping);

  const sut = new ContractRepository(ormRepository);

  return {
    sut,
    ormRepositorySpy: jest.spyOn(ormRepository, spyMethod || 'constructor'),
  };
}

function mockContract() : Contract {
  return new Contract({
    description: 'testing contract use case',
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Calas,
    value: 30,
  });
}

beforeAll(async () => {
  await typeOrmConnectionFactory(DbConnectionOptionsTesting);

  await getConnection().synchronize(true);
});
afterAll(async () => {
  await getConnection().close();
});

afterEach(() => getRepository<Contract>(ContractMapping).clear());

describe('Contract repository', () => {
  describe('publish()', () => {
    test('it should publish a new contract and return contract id', async () => {
      const { sut } = makeSut('insert');

      const contract = mockContract();

      const contractId = await sut.publish(contract);

      expect(contractId).toStrictEqual(contract.id);
    });

    test('it should throws if repository fails to publish contract', async () => {
      const { sut, ormRepositorySpy } = makeSut('insert');

      ormRepositorySpy.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.publish(mockContract())).rejects.toThrow();
    });
  });

  describe('listOpenContracts()', () => {
    test('it should return a list of open contracts', async () => {
      const { sut } = makeSut();

      const contract = mockContract();

      await sut.publish(contract);

      const openContracts = await sut.listOpenContracts();

      expect(openContracts.length).toStrictEqual(1);
    });

    test('it should return a empty list of open contracts if there are no open contracts', async () => {
      const { sut } = makeSut();

      const contract = { ...mockContract(), status: ContractStatus.InExecution };

      await sut.publish(contract);

      const openContracts = await sut.listOpenContracts();

      expect(openContracts.length).toStrictEqual(0);
    });
  });
});
