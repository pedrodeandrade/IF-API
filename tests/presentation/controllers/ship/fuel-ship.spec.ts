import { FuelShipMock } from '@/tests/presentation/mocks/use-cases/ship/fuel-ship';
import FuelShipController from '@/presentation/controllers/ship/fuel-ship';
import BusinessError from '@/shared/errors/business-error';

type SutTypes = {
  sut: FuelShipController
  useCaseSpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const useCase = new FuelShipMock();

  return {
    useCaseSpy: jest.spyOn(useCase, 'handle'),
    sut: new FuelShipController(useCase),
  };
}

const controllerData = {
  shipId: 1,
  fuelAmount: 10,
};

describe('FuelShip controller', () => {
  test('it should call FuelShipController with correct values', async () => {
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
