import { AcceptContractMock } from '@/tests/presentation/mocks/use-cases/contract/accept-contract';
import AcceptContractController from '@/presentation/controllers/contract/accept-contract';
import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';

type SutTypes = {
  sut: AcceptContractController
  useCaseSpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const useCase = new AcceptContractMock();

  return {
    useCaseSpy: jest.spyOn(useCase, 'handle'),
    sut: new AcceptContractController(useCase),
  };
}

const controllerData = {
  pilotId: 1,
  contractId: 1,
};

describe('AcceptContract controller', () => {
  test('it should call AcceptContractController with correct values', async () => {
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
