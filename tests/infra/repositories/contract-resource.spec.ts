import DbConnectionOptionsTesting from '@/tests/config/db/connection';
import { typeOrmConnectionFactory } from '@/infra/db/config';
import Planets from '@/domain/enums/planet';
import { getConnection, getRepository, Repository } from 'typeorm';
import Contract from '@/domain/entities/contract';
import ContractMapping from '@/infra/db/mappings/contract';
import ContractResource from '@/domain/entities/contract-resource';
import ContractResourceMapping from '@/infra/db/mappings/contract-resource';
import ContractResourceRepository from '@/infra/db/repositories/contract-resouce';
import Resource from '@/domain/enums/resouce';

async function createContract() : Promise<Contract> {
  const contract = new Contract({
    description: 'testing contract resource repository ',
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Calas,
    value: 30,
  });

  await getRepository<Contract>(ContractMapping).insert(contract);

  return contract;
}

function mockContractResources(contract : Contract) : ContractResource[] {
  const resource = new ContractResource({
    name: Resource.water,
    weight: 10,
    contract,
  });

  return [resource];
}

beforeAll(async () => {
  await typeOrmConnectionFactory(DbConnectionOptionsTesting);

  await getConnection().synchronize(true);
});
afterAll(async () => {
  await getConnection().close();
});

afterEach(async () => {
  await getRepository<ContractResource>(ContractResourceMapping).clear();

  await getRepository<Contract>(ContractMapping).clear();
});

type SutTypes = {
  sut: ContractResourceRepository,
  ormRepository : Repository<ContractResource>,
  ormRepositorySpy: jest.SpyInstance
}

function makeSut(spyMethod?) : SutTypes {
  const ormRepository = getRepository<ContractResource>(ContractResourceMapping);

  return {
    sut: new ContractResourceRepository(ormRepository),
    ormRepositorySpy: jest.spyOn(ormRepository, spyMethod || 'constructor'),
    ormRepository,
  };
}

describe('ContractResource repository', () => {
  describe('add()', () => {
    test('it should create contract resources', async () => {
      const { sut, ormRepository } = makeSut();

      const contract = await createContract();

      const contractResources = mockContractResources(contract);

      await sut.add(contractResources);

      const contractResourcesCount = await ormRepository.count();

      expect(contractResourcesCount).toStrictEqual(contractResources.length);
    });

    test('it should throws if repository fails to add contract resources', async () => {
      const { sut, ormRepositorySpy } = makeSut('insert');

      const contract = await createContract();

      const contractResources = mockContractResources(contract);

      ormRepositorySpy.mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.add(contractResources)).rejects.toThrow();
    });
  });
});
