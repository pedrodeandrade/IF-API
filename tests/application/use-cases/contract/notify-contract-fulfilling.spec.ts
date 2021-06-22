import { GetContractRepositoryMock, UpdateContractRepositoryMock } from '@/tests/application/mocks/repositories/contract';
import { GetPilotRepositoryMock, UpdatePilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';
import NotifyContractFulfillingUseCase from '@/application/use-cases/contract/notify-contract-fulfilling';
import Planets from '@/domain/enums/planet';
import ContractStatus from '@/domain/enums/contract-status';
import NotFoundError from '@/shared/errors/not-found-error';
import BusinessError from '@/shared/errors/business-error';

type SutTypes = {
  sut : NotifyContractFulfillingUseCase,
  getContractRepository : GetContractRepositoryMock,
  getPilotRepository : GetPilotRepositoryMock,
  getContractRepositorySpy: jest.SpyInstance,
  getPilotRepositorySpy: jest.SpyInstance,
  updateContractRepositorySpy: jest.SpyInstance,
  updatePilotRepositorySpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const getContractRepository = new GetContractRepositoryMock();
  const updateContractRepository = new UpdateContractRepositoryMock();

  const getPilotRepository = new GetPilotRepositoryMock();
  const updatePilotRepository = new UpdatePilotRepositoryMock();

  const sut = new NotifyContractFulfillingUseCase(
    getContractRepository,
    updateContractRepository,
    getPilotRepository,
    updatePilotRepository,
  );

  return {
    sut,
    getContractRepository,
    getPilotRepository,
    getContractRepositorySpy: jest.spyOn(getContractRepository, 'get'),
    getPilotRepositorySpy: jest.spyOn(getPilotRepository, 'get'),
    updateContractRepositorySpy: jest.spyOn(updateContractRepository, 'update'),
    updatePilotRepositorySpy: jest.spyOn(updatePilotRepository, 'update'),
  };
}

describe('NotifyContractFulfilling use case', () => {
  test('it should call repositories with correct values', async () => {
    const {
      sut,
      getPilotRepositorySpy,
      getContractRepositorySpy,
      updateContractRepositorySpy,
      getContractRepository,
      updatePilotRepositorySpy,
      getPilotRepository,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    getPilotRepository.setPilotPlanet(Planets.Andvari);
    getContractRepository.setContractStatus(ContractStatus.InExecution);

    await sut.handle(sutData);

    expect(getPilotRepositorySpy).toHaveBeenCalledTimes(1);
    expect(getPilotRepositorySpy).toHaveBeenCalledWith(sutData.pilotId);

    expect(getContractRepositorySpy).toHaveBeenCalledTimes(1);
    expect(getContractRepositorySpy).toHaveBeenCalledWith(sutData.contractId);

    expect(updateContractRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateContractRepositorySpy).toHaveBeenCalledWith(getContractRepository.contract);

    expect(updatePilotRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updatePilotRepositorySpy).toHaveBeenCalledWith(getPilotRepository.pilot);
  });

  test('it should set contract status to finished on success', async () => {
    const {
      sut,
      getContractRepository,
      getPilotRepository,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    getPilotRepository.setPilotPlanet(Planets.Andvari);
    getContractRepository.setContractStatus(ContractStatus.InExecution);

    await sut.handle(sutData);

    const { contract } = getContractRepository;

    expect(contract.status).toStrictEqual(ContractStatus.Finished);
    expect(contract.id).toStrictEqual(sutData.contractId);
  });

  test('it should set pilot credits to increase the contract value on success', async () => {
    const {
      sut,
      getContractRepository,
      getPilotRepository,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    const pilotCreditsBeforeContractFulfilling = 100;
    const contractValue = 15;

    getPilotRepository.setPilotPlanet(Planets.Andvari);
    getPilotRepository.setPilotCredits(pilotCreditsBeforeContractFulfilling);

    getContractRepository.setContractStatus(ContractStatus.InExecution);
    getContractRepository.setContractValue(contractValue);

    await sut.handle(sutData);

    const { pilot } = getPilotRepository;

    expect(pilot.credits).toStrictEqual(pilotCreditsBeforeContractFulfilling + contractValue);
  });

  test('it should throws a not found error if contract does not exists', async () => {
    const {
      sut,
      getContractRepositorySpy,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    getContractRepositorySpy.mockImplementationOnce(() => null);

    await expect(sut.handle(sutData)).rejects.toThrow(NotFoundError);
  });

  test('it should throws a not found error if pilot does not exists', async () => {
    const {
      sut,
      getPilotRepositorySpy,
      getContractRepository,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    getContractRepository.setContractStatus(ContractStatus.InExecution);

    getPilotRepositorySpy.mockImplementationOnce(() => null);

    await expect(sut.handle(sutData)).rejects.toThrow(NotFoundError);
  });

  test('it should throws a business error if contract status is not "InExecution"', async () => {
    const {
      sut,
      getContractRepository,
    } = makeSut();

    getContractRepository.setContractStatus(ContractStatus.InExecution);

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });

  test('it should throws a business error if contract destination planet is different than pilot location planet', async () => {
    const {
      sut,
      getContractRepository,
      getPilotRepository,
    } = makeSut();

    getContractRepository.setContractStatus(ContractStatus.InExecution);
    getPilotRepository.setPilotPlanet(Planets.Aqua);

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });
});
