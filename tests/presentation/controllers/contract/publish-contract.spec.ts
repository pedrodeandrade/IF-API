import { PublishContractMock } from '@/tests/presentation/mocks/use-cases/contract/publish-contract';
import PublishContractController, { PublishContractRequestData } from '@/presentation/controllers/contract/publish-contract';
import Planets from '@/domain/enums/planet';
import Resource from '@/domain/enums/resouce';

type SutTypes = {
  sut: PublishContractController,
  useCase: PublishContractMock,
  useCaseSpy: jest.SpyInstance
}

function makeSut() : SutTypes {
  const useCase = new PublishContractMock();

  return {
    sut: new PublishContractController(useCase),
    useCaseSpy: jest.spyOn(useCase, 'handle'),
    useCase,
  };
}

function mockRequestData() : PublishContractRequestData {
  return {
    description: 'testing publish contract controller',
    destinationPlanet: Planets.Calas,
    originPlanet: Planets.Demeter,
    value: 10,
    resources: [
      {
        name: Resource.water,
        weight: 10,
        id: 1,
      },
    ],
  };
}

describe('Publish contract controller', () => {
  test('it should return 201 and contractId on success', async () => {
    const { sut, useCase } = makeSut();

    useCase.setReturnValue(1);

    const result = await sut.handle(mockRequestData());

    expect(result.statusCode).toStrictEqual(201);
    expect(result.body.contractId).toStrictEqual(1);
  });

  test('it should returns 500 if useCase throws', async () => {
    const { sut, useCaseSpy } = makeSut();

    useCaseSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockRequestData())).resolves.toMatchObject({
      success: false,
      statusCode: 500,
    });
  });
});
