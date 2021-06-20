import { getConnection, getRepository, Repository } from 'typeorm';

import Ship from '@/domain/entities/ship';
import DbConnectionOptionsTesting from '@/tests/config/db/connection';
import ShipMapping from '@/infra/db/mappings/ship';
import { typeOrmConnectionFactory } from '@/infra/db/config';
import Pilot from '@/domain/entities/pilot';
import ShipRepository from '@/infra/db/repositories/ship';
import PilotMapping from '@/infra/db/mappings/pilot';

describe('Ship repository', () => {
  beforeAll(async () => {
    await typeOrmConnectionFactory(DbConnectionOptionsTesting);

    await getConnection().synchronize(true);
  });
  afterAll(async () => {
    await getConnection().close();
  });

  afterEach(async () => {
    await getRepository<Ship>(ShipMapping).query('DELETE FROM ships');

    await getRepository<Ship>(ShipMapping).query('DELETE FROM pilots');
  });

  type SutTypes = {
    sut: ShipRepository,
    ormRepository : Repository<Ship>
  };

  function makeSut() : SutTypes {
    const ormRepository = getRepository<Ship>(ShipMapping);

    const sut = new ShipRepository(ormRepository);

    return {
      sut,
      ormRepository,
    };
  }

  function mockPilot() : Pilot {
    return Pilot.create({
      age: 21,
      certification: '1234567',
      name: 'Pedro',
      id: 1,
    }).data;
  }

  describe('add()', () => {
    test('it should create a ship', async () => {
      const { sut, ormRepository } = makeSut();

      const shipPilot = mockPilot();
      await getRepository<Pilot>(PilotMapping).insert(shipPilot);

      const shipData = {
        fuelCapacity: 10,
        weightCapacity: 10,
        pilot: shipPilot,
        id: 1,
      };
      const ship = new Ship(shipData);

      await sut.add(ship);

      const shipFromDb = await ormRepository.findOne({ pilot: shipPilot });

      expect(shipFromDb.weightCapacity).toStrictEqual(shipData.weightCapacity);
      expect(shipFromDb.pilot.name).toStrictEqual(shipPilot.name);
    });

    test('it should throws if ormRepository fails to insert a ship', () => {
      const { sut, ormRepository } = makeSut();

      ormRepository.insert = jest.fn().mockImplementationOnce(() => {
        throw new Error();
      });

      const shipData = {
        fuelCapacity: 10,
        weightCapacity: 10,
        pilot: mockPilot(),
        id: 1,
      };
      const ship = new Ship(shipData);

      expect(() => sut.add(ship)).rejects.toThrow();
    });
  });
});
