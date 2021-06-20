import {
  getConnection, getRepository,
} from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import { typeOrmConnectionFactory } from '@/infra/db/config';
import PilotMapping from '@/infra/db/mappings/pilot';
import PilotRepository from '@/infra/db/repositories/pilot';

import DbConnectionOptionsTesting from '@/tests/config/db/connection';

describe('PilotRepository', () => {
  beforeAll(async () => {
    await typeOrmConnectionFactory(DbConnectionOptionsTesting);

    await getConnection().synchronize(true);
  });
  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(() => getRepository<Pilot>(PilotMapping).query('DELETE FROM pilots'));

  const pilotData = {
    name: 'Pedro',
    age: 18,
    certification: '1234567',
  };

  describe('add()', () => {
    type sutType = {
      repository: PilotRepository,
      repositorySpy: jest.SpyInstance,
    };

    const makeSut = (mockResult) : sutType => {
      const typeOrmRepository = getRepository<Pilot>(PilotMapping);

      if (mockResult) {
        typeOrmRepository.insert = jest.fn().mockImplementationOnce(() => { throw new Error(); });
      }

      const repositorySpy = jest.spyOn(typeOrmRepository, 'insert');

      const repository = new PilotRepository(typeOrmRepository);

      return {
        repository,
        repositorySpy,
      };
    };

    test('it should call add with correct params', async () => {
      const { repository, repositorySpy } = makeSut(false);

      const pilot = Pilot.create(pilotData);

      const result = await repository.add(pilot.data);

      expect(repositorySpy).toHaveBeenCalledWith(pilot.data);
      expect(repositorySpy).toHaveBeenCalledTimes(1);

      expect(result).toBeTruthy();
    });

    test('it should call add and return false if a exception is thrown', async () => {
      const { repository, repositorySpy } = makeSut(true);

      const pilot = Pilot.create(pilotData);

      const result = await repository.add(pilot.data);

      expect(repositorySpy).toHaveBeenCalledWith(pilot.data);
      expect(repositorySpy).toHaveBeenCalledTimes(1);

      expect(result).toBeFalsy();
    });
  });
});
