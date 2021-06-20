import {
  getConnection, getRepository, Repository,
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

  afterEach(() => getRepository<Pilot>(PilotMapping).clear());

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

    const makeSut = () : sutType => {
      const typeOrmRepository = getRepository<Pilot>(PilotMapping);

      const repositorySpy = jest.spyOn(typeOrmRepository, 'insert');

      const repository = new PilotRepository(typeOrmRepository);

      return {
        repository,
        repositorySpy,
      };
    };

    test('it should call add with correct params', async () => {
      const { repository, repositorySpy } = makeSut();

      const pilot = Pilot.create(pilotData);

      const result = await repository.add(pilot.data);

      expect(repositorySpy).toHaveBeenCalledWith(pilot.data);
      expect(repositorySpy).toHaveBeenCalledTimes(1);

      expect(result).toBeTruthy();
    });

    test('it should call add and return false if a exception is thrown', async () => {
      const { repository, repositorySpy } = makeSut();

      const pilot = Pilot.create(pilotData);

      repositorySpy.mockImplementationOnce(() => { throw new Error(); });

      await expect(repository.add(pilot.data)).resolves.toBeFalsy();

      expect(repositorySpy).toHaveBeenCalledWith(pilot.data);
      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get()', () => {
    type SutTypes = {
      sut : PilotRepository,
      ormRepository: Repository<Pilot>
    }

    function makeSut() : SutTypes {
      const ormRepository = getRepository<Pilot>(PilotMapping);

      return {
        sut: new PilotRepository(ormRepository),
        ormRepository,
      };
    }

    test('it should get a pilot if it exists', async () => {
      const { sut, ormRepository } = makeSut();
      const pilot = Pilot.create({ ...pilotData, id: 1 }).data;

      await ormRepository.insert(pilot);

      const pilotFromDb = await sut.get(1);

      expect(pilotFromDb.id).toStrictEqual(1);
    });

    test('it should return null if pilot doesnt exists', async () => {
      const { sut } = makeSut();

      const pilotFromDb = await sut.get(1);

      expect(pilotFromDb).toBeNull();
    });
  });
});
