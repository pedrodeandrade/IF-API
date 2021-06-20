import { AddShipMock } from '@/tests/presentation/mocks/use-cases/ship/add-ship';
import AddShipController from '@/presentation/controllers/ship/add-ship';
import NotFoundError from '@/shared/errors/not-found-error';

type SutTypes = {
  sut: AddShipController
  useCaseSpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const useCase = new AddShipMock();

  return {
    useCaseSpy: jest.spyOn(useCase, 'handle'),
    sut: new AddShipController(useCase),
  };
}

const controllerData = {
  pilotId: 1,
  weightCapacity: 10,
  fuelCapacity: 10,
};

describe('AddShip Controller', () => {
  test('it should call AddShipController with correct values', async () => {
    const { useCaseSpy, sut } = makeSut();

    await sut.handle(controllerData);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(controllerData);
  });

  test('it should return 201 on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle(controllerData);

    expect(result.success).toBeTruthy();
    expect(result.statusCode).toStrictEqual(201);
  });

  test('it should return 404 on not found', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new NotFoundError('Pilot not found');
    });

    await expect(sut.handle(controllerData)).resolves.toMatchObject({
      success: false,
      statusCode: 404,
    });
  });

  test('it should return 500 on server error', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(controllerData)).resolves.toMatchObject({
      success: false,
      statusCode: 500,
    });
  });
});
