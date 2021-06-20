import AddPilotController, { AddPilotRequestBody } from '@/presentation/controllers/pilot/add-pilot';
import OperationResult from '@/shared/responses/operation-result';
import { AddPilotMock } from '@/tests/presentation/mocks/use-cases/pilot/add-pilot';

type SutType = {
  sut: AddPilotController,
  useCaseSpy : jest.SpyInstance,
  useCase : AddPilotMock
}

function makeSut() : SutType {
  const useCase : AddPilotMock = new AddPilotMock();

  const useCaseSpy = jest.spyOn(useCase, 'handle');

  const sut = new AddPilotController(useCase);

  return {
    sut,
    useCaseSpy,
    useCase,
  };
}

const requestData : AddPilotRequestBody = {
  age: 18,
  certification: '1234567',
  name: 'Pedro',
};

describe(('AddPilot Controller'), () => {
  test('it should call AddPilot with correct values', async () => {
    const { sut, useCase, useCaseSpy } = makeSut();

    useCase.setOperationResult(new OperationResult<string>(true));

    await sut.handle(requestData);

    expect(useCaseSpy).toHaveBeenCalledTimes(1);
    expect(useCaseSpy).toHaveBeenCalledWith(requestData);
  });

  test('it should return 201 on success', async () => {
    const { sut, useCase } = makeSut();

    useCase.setOperationResult(new OperationResult<string>(true, 'Test is passing'));

    const result = await sut.handle(requestData);

    expect(result.statusCode).toStrictEqual(201);
    expect(result.success).toBeTruthy();
    expect(result.body).toStrictEqual('Test is passing');
  });

  test('it should return 400 if AddPilot fails', async () => {
    const { sut, useCase } = makeSut();

    useCase.setOperationResult(new OperationResult<string>(false, null, 'Validation failed'));

    const result = await sut.handle(requestData);

    expect(result.statusCode).toStrictEqual(400);
    expect(result.success).toBeFalsy();
    expect(result.body).toStrictEqual('Validation failed');
  });

  test('it should return 500 if AddPilot throws', async () => {
    const { sut, useCase } = makeSut();

    useCase.handle = async () => {
      throw new Error('Server crashed');
    };

    const result = await sut.handle(requestData);

    expect(result.statusCode).toStrictEqual(500);
    expect(result.success).toBeFalsy();
    expect(result.body).toStrictEqual('Server crashed');
  });
});
