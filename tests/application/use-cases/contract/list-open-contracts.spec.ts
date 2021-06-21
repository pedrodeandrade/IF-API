import { ListOpenContractsRepositoryMock } from '@/tests/application/mocks/repositories/contract';
import ListOpenContractsUseCase from '@/application/use-cases/contract/list-open-contracts';
import Contract from '@/domain/entities/contract';
import Planets from '@/domain/enums/planet';
import ContractStatus from '@/domain/enums/contract-status';

type SutTypes = {
  sut : ListOpenContractsUseCase,
  repository : ListOpenContractsRepositoryMock
}

function makeSut() : SutTypes {
  const repository = new ListOpenContractsRepositoryMock();

  return {
    sut: new ListOpenContractsUseCase(repository),
    repository,
  };
}

describe('ListOpenContract use case', () => {
  test('it should return open contracts if they exist', async () => {
    const { repository, sut } = makeSut();

    const contractsToList = [
      new Contract({
        description: 'Travel from Andvari to Demeter',
        originPlanet: Planets.Andvari,
        destinationPlanet: Planets.Demeter,
        value: 10,
        status: ContractStatus.Open,
      }),
      new Contract({
        description: 'Travel from Demeter to Andvari',
        originPlanet: Planets.Demeter,
        destinationPlanet: Planets.Andvari,
        value: 10,
        status: ContractStatus.InExecution,
      }),
    ];

    repository.setContractsToList(contractsToList);

    const openContracts = await sut.handle();

    expect(openContracts.length).toStrictEqual(1);

    expect(openContracts[0].status).toStrictEqual(ContractStatus.Open);
  });

  test('it should return no open contracts if they dont exist', async () => {
    const { repository, sut } = makeSut();

    const contractsToList = [
      new Contract({
        description: 'Travel from Andvari to Demeter',
        originPlanet: Planets.Andvari,
        destinationPlanet: Planets.Demeter,
        value: 10,
        status: ContractStatus.InExecution,
      }),
    ];

    repository.setContractsToList(contractsToList);

    const openContracts = await sut.handle();

    expect(openContracts.length).toStrictEqual(0);
  });
});
