import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';
import { TravelMock } from '@/tests/presentation/mocks/use-cases/travel-destination/travel';
import TravelController from '@/presentation/controllers/travel-destination/travel';
import Planets from '@/domain/enums/planet';

type SutTypes = {
  sut: TravelController
  useCaseSpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const useCase = new TravelMock();

  return {
    useCaseSpy: jest.spyOn(useCase, 'handle'),
    sut: new TravelController(useCase),
  };
}

const controllerData = {
  shipId: 1,
  originPlanet: Planets.Calas,
  destinationPlanet: Planets.Andvari,
};

describe('Travel controller', () => {
  test('it should call TravelController with correct values', async () => {
    const { sut, useCaseSpy } = makeSut();

    await sut.handle(controllerData);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(controllerData);
  });

  test('it should return 200 on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(controllerData);

    expect(result.statusCode).toStrictEqual(200);
    expect(result.success).toBeTruthy();
  });

  test('it should return 400 if a BusinessError is thrown', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new BusinessError();
    });

    await expect(sut.handle(controllerData)).resolves.toMatchObject({
      statusCode: 400,
      success: false,
    });
  });

  test('it should return 404 if a NotFoundError is thrown', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new NotFoundError('error');
    });

    await expect(sut.handle(controllerData)).resolves.toMatchObject({
      statusCode: 404,
      success: false,
    });
  });

  test('it should return 500 if a Error is thrown', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(controllerData)).resolves.toMatchObject({
      statusCode: 500,
      success: false,
    });
  });
});
