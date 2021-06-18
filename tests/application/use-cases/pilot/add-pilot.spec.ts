import AddPilotUseCase from '@/application/use-cases/pilot/add-pilot';

import { AddPilotRepositoryMock } from '@/tests/application/mocks/repositories/pilot';

const makeSut = () : AddPilotUseCase => new AddPilotUseCase(new AddPilotRepositoryMock());

describe('AddPilot UseCase', () => {
  test('it should create a pilot', async () => {
    const sut = makeSut();

    const result = await sut.handle({
      age: 18,
      name: 'Pedro',
      certification: '1234567',
    });

    expect(result.success).toBe(true);
  });

  test('it should not create a pilot if invalid data is passed to the use case', async () => {
    const sut = makeSut();

    const result = await sut.handle({
      age: 14,
      name: 'Pedro',
      certification: '12345678',
    });

    expect(result.success).toBe(false);
  });
});
