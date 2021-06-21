import { GetContractRepositoryMock, UpdateContractRepositoryMock } from '@/tests/application/mocks/repositories/contract';
import { GetPilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';
import AcceptContractUseCase from '@/application/use-cases/contract/accept-contract';
import NotFoundError from '@/shared/errors/not-found-error';
import ContractStatus from '@/domain/enums/contract-status';
import BusinessError from '@/shared/errors/business-error';

type SutTypes = {
  sut : AcceptContractUseCase,
  getContractRepository : GetContractRepositoryMock,
  getPilotRepository : GetPilotRepositoryMock,
  getContractRepositorySpy: jest.SpyInstance,
  getPilotRepositorySpy: jest.SpyInstance,
  updateContractRepositorySpy: jest.SpyInstance,
}

function makeSut() : SutTypes {
  const getContractRepository = new GetContractRepositoryMock();
  const updateContractRepository = new UpdateContractRepositoryMock();

  const getPilotRepository = new GetPilotRepositoryMock();

  const sut = new AcceptContractUseCase(
    getContractRepository,
    updateContractRepository,
    getPilotRepository,
  );

  return {
    sut,
    getContractRepository,
    getPilotRepository,
    getContractRepositorySpy: jest.spyOn(getContractRepository, 'get'),
    getPilotRepositorySpy: jest.spyOn(getPilotRepository, 'get'),
    updateContractRepositorySpy: jest.spyOn(updateContractRepository, 'update'),
  };
}

describe('AcceptContract use case', () => {
  test('it should call repositories with correct values', async () => {
    const {
      sut,
      getPilotRepositorySpy,
      getContractRepositorySpy,
      updateContractRepositorySpy,
      getContractRepository,
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    await sut.handle(sutData);

    expect(getPilotRepositorySpy).toHaveBeenCalledTimes(1);
    expect(getPilotRepositorySpy).toHaveBeenCalledWith(sutData.pilotId);

    expect(getContractRepositorySpy).toHaveBeenCalledTimes(1);
    expect(getContractRepositorySpy).toHaveBeenCalledWith(sutData.contractId);

    expect(updateContractRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateContractRepositorySpy).toHaveBeenCalledWith(getContractRepository.contract);
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
    } = makeSut();

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    getPilotRepositorySpy.mockImplementationOnce(() => null);

    await expect(sut.handle(sutData)).rejects.toThrow(NotFoundError);
  });

  test('it should throws a business error if contract status is not "Open"', async () => {
    const {
      sut,
      getContractRepository,
    } = makeSut();

    getContractRepository.setContractStatus(ContractStatus.Finished);

    const sutData = {
      pilotId: 1,
      contractId: 1,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });
});
