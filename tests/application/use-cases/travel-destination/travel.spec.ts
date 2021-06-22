import { UpdatePilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';
import { GetShipRepositoryMock, UpdateShipRepositoryMock } from '@/tests/application/mocks/repositories/ship';
import TravelUseCase from '@/application/use-cases/travel-destination/travel';
import { GetTravelDestinationRepositoryMock } from '@/tests/application/mocks/repositories/travel-destination';
import { mockPilot } from '@/tests/domain/entities/mocks/pilot';
import Planets from '@/domain/enums/planet';
import NotFoundError from '@/shared/errors/not-found-error';
import BusinessError from '@/shared/errors/business-error';

type SutTypes = {
  sut: TravelUseCase,
  updateShipRepository: UpdateShipRepositoryMock,
  getShipRepository: GetShipRepositoryMock,
  updatePilotRepository: UpdatePilotRepositoryMock,
  getTravelDestinationRepository : GetTravelDestinationRepositoryMock
  updateShipRepositorySpy: jest.SpyInstance,
  getShipRepositorySpy: jest.SpyInstance,
  updatePilotRepositorySpy: jest.SpyInstance,
  getTravelDestinationRepositorySpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const updateShipRepository = new UpdateShipRepositoryMock();

  const getShipRepository = new GetShipRepositoryMock();

  const updatePilotRepository = new UpdatePilotRepositoryMock();

  const getTravelDestinationRepository = new GetTravelDestinationRepositoryMock();

  const sut = new TravelUseCase(
    getShipRepository,
    updateShipRepository,
    updatePilotRepository,
    getTravelDestinationRepository,
  );

  return {
    updatePilotRepository,
    getShipRepository,
    updateShipRepository,
    getTravelDestinationRepository,
    updateShipRepositorySpy: jest.spyOn(updateShipRepository, ('update')),
    getShipRepositorySpy: jest.spyOn(getShipRepository, 'get'),
    updatePilotRepositorySpy: jest.spyOn(updatePilotRepository, 'update'),
    getTravelDestinationRepositorySpy: jest.spyOn(getTravelDestinationRepository, 'get'),
    sut,
  };
}

describe('Travel use case', () => {
  test('it should call repository spies with correct values', async () => {
    const pilot = mockPilot();

    const {
      sut,
      getShipRepositorySpy,
      updateShipRepositorySpy,
      updatePilotRepositorySpy,
      getShipRepository,
      getTravelDestinationRepository,
      getTravelDestinationRepositorySpy,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(10);

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    await sut.handle(sutData);

    expect(getShipRepositorySpy).toBeCalledTimes(1);
    expect(getShipRepositorySpy).toHaveBeenCalledWith(sutData.shipId);

    expect(updateShipRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updateShipRepositorySpy).toHaveBeenCalledWith(getShipRepository.ship);

    expect(updatePilotRepositorySpy).toHaveBeenCalledTimes(1);
    expect(updatePilotRepositorySpy).toHaveBeenCalledWith(pilot);

    expect(getTravelDestinationRepositorySpy).toBeCalledTimes(1);
    expect(getTravelDestinationRepositorySpy)
      .toHaveBeenCalledWith(
        getTravelDestinationRepository.travelDestination.originPlanet,
        getTravelDestinationRepository.travelDestination.destinationPlanet,
      );
  });

  test('it should discount the travel fuel cost of the ship fuel level on success', async () => {
    const pilot = mockPilot();

    const {
      sut,
      getTravelDestinationRepository,
      getShipRepository,
    } = makeSut();

    const fuelLevelBeforeTravel = 10;
    const travelCost = 10;

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(fuelLevelBeforeTravel);

    getTravelDestinationRepository.setFuelCost(travelCost);
    getTravelDestinationRepository.setAvailableRoute(true);

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    await sut.handle(sutData);

    const { ship } = getShipRepository;

    expect(ship.fuelLevel).toStrictEqual(fuelLevelBeforeTravel - travelCost);
  });

  test('it should set pilot location planet to travel destination planet on success', async () => {
    const pilot = mockPilot();

    const {
      sut,
      getTravelDestinationRepository,
      getShipRepository,
    } = makeSut();

    const fuelLevelBeforeTravel = 10;
    const travelCost = 10;

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(fuelLevelBeforeTravel);

    getTravelDestinationRepository.setFuelCost(travelCost);
    getTravelDestinationRepository.setAvailableRoute(true);

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    await sut.handle(sutData);

    expect(pilot.locationPlanet).toStrictEqual(sutData.destinationPlanet);
  });

  test('it should throws NotFoundError if ship is not found', async () => {
    const {
      sut,
      getShipRepositorySpy,
    } = makeSut();

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    getShipRepositorySpy.mockImplementationOnce(() => null);

    await expect(sut.handle(sutData)).rejects.toThrow(NotFoundError);
  });

  test('it should throw a BusinessError if ship fuel level is lower than travel fuel cost', async () => {
    const pilot = mockPilot();

    const {
      sut,
      getTravelDestinationRepository,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(pilot);
    getShipRepository.setFuelLevel(0);

    getTravelDestinationRepository.setFuelCost(1);
    getTravelDestinationRepository.setAvailableRoute(true);

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });

  test('it should throw a BusinessError if route is blocked', async () => {
    const {
      sut,
      getTravelDestinationRepository,
      getShipRepository,
    } = makeSut();

    getShipRepository.setPilot(mockPilot());

    getTravelDestinationRepository.setAvailableRoute(false);

    const sutData = {
      shipId: 1,
      destinationPlanet: Planets.Demeter,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });

  test('it should throw a BusinessError if pilot is trying to travel to its location planet', async () => {
    const {
      sut,
      getTravelDestinationRepository,
      getShipRepository,
    } = makeSut();
    const pilot = mockPilot();

    getShipRepository.setPilot(pilot);

    getTravelDestinationRepository.setAvailableRoute(true);

    const sutData = {
      shipId: 1,
      destinationPlanet: pilot.locationPlanet,
    };

    await expect(sut.handle(sutData)).rejects.toThrow(BusinessError);
  });
});
