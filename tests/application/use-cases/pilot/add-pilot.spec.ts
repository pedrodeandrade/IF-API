import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import AddPilotUseCase from '@/application/use-cases/pilot/add-pilot';

import { AddPilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';

type SutTypes = {
  sut: AddPilotUseCase,
  repository: AddPilotRepositoryMock
}
const makeSut = () : SutTypes => {
  const repository = new AddPilotRepositoryMock();

  const sut = new AddPilotUseCase(repository);

  return { sut, repository };
};

describe('AddPilot UseCase', () => {
  test('it should create a pilot with correct values', async () => {
    const { sut, repository } = makeSut();

    repository.setResult(true);

    const result = await sut.handle({
      age: 18,
      name: 'Pedro',
      certification: '1234567',
    });

    expect(result.success).toBe(true);
  });

  test('it should not create a pilot if invalid data is passed to the use case', async () => {
    const { sut, repository } = makeSut();

    repository.setResult(true);

    const result = await sut.handle({
      age: 14,
      name: 'Pedro',
      certification: '12345678',
    });

    expect(result.success).toBe(false);
  });

  test('it should throw a error if repository fails to persist pilot', async () => {
    const { sut, repository } = makeSut();

    repository.setResult(false);

    await expect(sut.handle({
      age: 18,
      name: 'Pedro',
      certification: '1234567',
    })).rejects.toThrow();
  });
});
