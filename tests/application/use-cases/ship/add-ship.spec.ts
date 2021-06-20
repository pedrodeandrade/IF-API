import AddShipUseCase from '@/application/use-cases/ship/add-ship';
import Ship from '@/domain/entities/ship';
import NotFoundError from '@/shared/errors/not-found-error';
import { GetPilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';
import { AddShipRepositoryMock } from '@/tests/application/mocks/repositories/ship';

type SutTypes = {
  sut : AddShipUseCase,
  addShipRepositorySpy: jest.SpyInstance,
  getPilotRepository : GetPilotRepositoryMock
}

function makeSut() : SutTypes {
  const getPilotRepository = new GetPilotRepositoryMock();

  const addShipRepository = new AddShipRepositoryMock();

  const sut = new AddShipUseCase(getPilotRepository, addShipRepository);

  const addShipRepositorySpy = jest.spyOn(addShipRepository, 'add');

  return {
    sut,
    addShipRepositorySpy,
    getPilotRepository,
  };
}

describe('AddShip use case', () => {
  test('it should call AddShipRepository with correct values', async () => {
    const { sut, addShipRepositorySpy, getPilotRepository } = makeSut();

    const shipData = {
      pilotId: 1,
      fuelCapacity: 100,
      weightCapacity: 10,
    };

    await sut.handle(shipData);

    const pilot = await getPilotRepository.get(shipData.pilotId);

    const ship = new Ship({
      fuelCapacity: shipData.fuelCapacity,
      weightCapacity: shipData.weightCapacity,
      pilot,
    });

    expect(addShipRepositorySpy).toHaveBeenCalledTimes(1);
    expect(addShipRepositorySpy).toHaveBeenCalledWith(ship);
  });

  test('it should throw a NotFoundError if pilot is not found', async () => {
    const { getPilotRepository, sut } = makeSut();

    getPilotRepository.get = jest.fn().mockImplementationOnce(() => null);

    const shipData = {
      pilotId: 1,
      fuelCapacity: 100,
      weightCapacity: 10,
    };

    await expect(sut.handle(shipData)).rejects.toThrow(NotFoundError);
  });
});
