import Planets from '@/domain/enums/planet';
import TravelDestinationRepository from '@/infra/db/repositories/travel-destination';

function makeSut() : TravelDestinationRepository {
  return new TravelDestinationRepository();
}

describe('Travel destination repository', () => {
  test('it should return the right travel destination', () => {
    const sut = makeSut();

    const travelDestination = sut.get(Planets.Andvari, Planets.Demeter);

    expect(travelDestination.originPlanet).toStrictEqual(Planets.Andvari);
    expect(travelDestination.destinationPlanet).toStrictEqual(Planets.Demeter);
  });
});
