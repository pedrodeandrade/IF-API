import { mockPilot } from '@/tests/domain/entities/mocks/pilot';
import FuelShipUseCase from '@/application/use-cases/ship/fuel-ship';
import { UpdatePilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';
import { GetShipRepositoryMock, UpdateShipRepositoryMock } from '@/tests/application/mocks/repositories/ship';
import NotFoundError from '@/shared/errors/not-found-error';
import BusinessError from '@/shared/errors/business-error';

type SutTypes = {
  sut: FuelShipUseCase,
  updateShipRepository: UpdateShipRepositoryMock,
  getShipRepository: GetShipRepositoryMock,
  updatePilotRepository: UpdatePilotRepositoryMock,
  updateShipRepositorySpy: jest.SpyInstance,
  getShipRepositorySpy: jest.SpyInstance,
  updatePilotRepositorySpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const updateShipRepository = new UpdateShipRepositoryMock();

  const getShipRepository = new GetShipRepositoryMock();

  const updatePilotRepository = new UpdatePilotRepositoryMock();

  const sut = new FuelShipUseCase(
    updateShipRepository,
    getShipRepository,
    updatePilotRepository,
  );

  return {
    updatePilotRepository,
    getShipRepository,
    updateShipRepository,
    updateShipRepositorySpy: jest.spyOn(updateShipRepository, ('update')),
    getShipRepositorySpy: jest.spyOn(getShipRepository, 'get'),
    updatePilotRepositorySpy: jest.spyOn(updatePilotRepository, 'update'),
    sut,
  };
}

describe('FuelShip use case', () => {
  test('it should call repository spies with correct values', async () => {
    const pilot = mockPilot();
    pilot.credits = 1000;

    const {
      sut,
      getShipRepositorySpy,
      updateShipRepositorySpy,
      updatePilotRepositorySpy,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(0);

    const sutData = { shipId: 1, fuelAmount: 10 };

    await sut.handle(sutData);

    expect(getShipRepositorySpy).toBeCalledTimes(1);
    expect(getShipRepositorySpy).toHaveBeenCalledWith(sutData.shipId);

    expect(updateShipRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateShipRepositorySpy).toHaveBeenCalledWith(getShipRepository.ship);

    expect(updatePilotRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updatePilotRepositorySpy).toHaveBeenCalledWith(pilot);
  });

  test('it should throw if pilot does not have enough credits to pay the fuel', async () => {
    const pilot = mockPilot();
    pilot.credits = 0;

    const {
      sut,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(0);

    const sutData = { shipId: 1, fuelAmount: 10 };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });

  test('ship fuelLevel should be equal fuelCapacity if a value bigger than fuelCapacity is given to fuel the ship', async () => {
    const pilot = mockPilot();
    pilot.credits = 1000;

    const {
      sut,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(0);

    const sutData = { shipId: 1, fuelAmount: Number.MAX_SAFE_INTEGER };

    await sut.handle(sutData);

    const { ship } = getShipRepository;

    expect(ship.fuelLevel).toBeLessThan(Number.MAX_SAFE_INTEGER);

    expect(ship.fuelLevel).toStrictEqual(ship.fuelCapacity);
  });

  test('pilot credits should be charged correctly if a value bigger than fuelCapacity is given to fuel the ship', async () => {
    const pilot = mockPilot();
    pilot.credits = 70;

    const {
      sut,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(0);

    const sutData = { shipId: 1, fuelAmount: Number.MAX_SAFE_INTEGER };

    await sut.handle(sutData);

    expect(pilot.credits).toStrictEqual(0);
  });

  test('ship fuelLevel should be equals fuelLevel + fuelAmount if fuelAmount is less or equals fuel capacity', async () => {
    const pilot = mockPilot();
    pilot.credits = 1000;

    const {
      sut,
      getShipRepository,
    } = makeSut();

    const fuelLevelBeforeFuelShip = 5;

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(fuelLevelBeforeFuelShip);

    const sutData = { shipId: 1, fuelAmount: 5 };

    await sut.handle(sutData);

    const { ship } = getShipRepository;

    expect(ship.fuelLevel).toStrictEqual(fuelLevelBeforeFuelShip + sutData.fuelAmount);
  });

  test('it should throw NotFoundError if ship is not found', async () => {
    const pilot = mockPilot();
    pilot.credits = 0;

    const {
      sut,
      getShipRepositorySpy,
    } = makeSut();

    getShipRepositorySpy.mockImplementationOnce(() => null);

    const sutData = { shipId: 1, fuelAmount: 10 };

    await expect(sut.handle(sutData)).rejects.toThrow(NotFoundError);
  });

  test('it should throw if fails to update ship', async () => {
    const pilot = mockPilot();
    pilot.credits = 0;

    const {
      sut,
      updateShipRepositorySpy,
    } = makeSut();

    updateShipRepositorySpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const sutData = { shipId: 1, fuelAmount: 10 };

    await expect(sut.handle(sutData)).rejects.toThrow();
  });

  test('it should throw if fails to update pilot', async () => {
    const pilot = mockPilot();
    pilot.credits = 0;

    const {
      sut,
      updatePilotRepositorySpy,
    } = makeSut();

    updatePilotRepositorySpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const sutData = { shipId: 1, fuelAmount: 10 };

    await expect(sut.handle(sutData)).rejects.toThrow();
  });
});
