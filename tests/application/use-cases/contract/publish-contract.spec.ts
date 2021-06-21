import PublishContractUseCase from '@/application/use-cases/contract/publish-contract';
import Contract from '@/domain/entities/contract';
import ContractResource from '@/domain/entities/contract-resource';
import Planets from '@/domain/enums/planet';
import Resource from '@/domain/enums/resouce';
import { PublishContractRepositoryMock } from '@/tests/application/mocks/repositories/contract';
import { AddContractResourcesRepositoryMock } from '@/tests/application/mocks/repositories/contract-resources';

type SutTypes = {
  sut : PublishContractUseCase,
  publishContractRepositorySpy : jest.SpyInstance,
  addContractResourcesRepositorySpy : jest.SpyInstance
}

function makeSut() : SutTypes {
  const publishContractRepository = new PublishContractRepositoryMock();
  const addContractResourcesRepository = new AddContractResourcesRepositoryMock();

  const sut = new PublishContractUseCase(publishContractRepository, addContractResourcesRepository);

  return {
    sut,
    publishContractRepositorySpy: jest.spyOn(publishContractRepository, 'publish'),
    addContractResourcesRepositorySpy: jest.spyOn(addContractResourcesRepository, 'add'),
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

function mockContractPayload() : ContractResource[] {
  const resource = new ContractResource({
    id: 1,
    name: Resource.water,
    weight: 10,
    contract: mockContract(),
  });

  return [resource];
}

describe('PublishContract use case', () => {
  test('it should call PublishContractRepository and AddContractResourceRepositories with correct values', async () => {
    const {
      addContractResourcesRepositorySpy,
      publishContractRepositorySpy,
      sut,
    } = makeSut();

    const sutParams = {
      ...mockContract(),
      resources: mockContractPayload(),
    };

    await sut.handle(sutParams);

    expect(publishContractRepositorySpy).toHaveBeenCalledTimes(1);
    expect(publishContractRepositorySpy).toHaveBeenCalledWith(mockContract());

    expect(addContractResourcesRepositorySpy).toHaveBeenCalledTimes(1);
    expect(addContractResourcesRepositorySpy).toHaveBeenCalledWith(mockContractPayload());
  });

  test('it should return contract id on success', async () => {
    const {
      sut,
    } = makeSut();

    const contract = mockContract();

    const sutParams = {
      ...contract,
      resources: mockContractPayload(),
    };

    const contractId = await sut.handle(sutParams);

    expect(contractId).toStrictEqual(contract.id);
  });

  test('it should throws if PublishContractRepository throws', async () => {
    const {
      publishContractRepositorySpy,
      sut,
    } = makeSut();

    const sutParams = {
      ...mockContract(),
      resources: mockContractPayload(),
    };

    publishContractRepositorySpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(sutParams)).rejects.toThrow();
  });

  test('it should throws if AddContractResourcesRepository throws', async () => {
    const {
      addContractResourcesRepositorySpy,
      sut,
    } = makeSut();

    const sutParams = {
      ...mockContract(),
      resources: mockContractPayload(),
    };

    addContractResourcesRepositorySpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(sutParams)).rejects.toThrow();
  });
});
