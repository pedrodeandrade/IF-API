import ListOpenContractsUseCaseMock from '@/tests/presentation/mocks/use-cases/contract/list-open-contracts';
import ListOpenContractsController from '@/presentation/controllers/contract/list-open-contracts';

type SutTypes = {
  sut: ListOpenContractsController,
  useCaseSpy: jest.SpyInstance
}
function makeSut() : SutTypes {
  const useCase = new ListOpenContractsUseCaseMock();

  return {
    sut: new ListOpenContractsController(useCase),
    useCaseSpy: jest.spyOn(useCase, 'handle'),
  };
}

describe('ListOpenContracts controller', () => {
  test('it should return 200 on success', async () => {
    const { sut } = makeSut();

    const result = await sut.handle();

    expect(result.statusCode).toStrictEqual(200);
    expect(result.success).toBeTruthy();
  });

  test('it should return 500 if useCase throws', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle()).resolves.toMatchObject({
      success: false,
      statusCode: 500,
    });
  });
});
