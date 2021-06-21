import { getConnection, getRepository, Repository } from 'typeorm';

import Ship from '@/domain/entities/ship';
import DbConnectionOptionsTesting from '@/tests/config/db/connection';
import ShipMapping from '@/infra/db/mappings/ship';
import { typeOrmConnectionFactory } from '@/infra/db/config';
import Pilot from '@/domain/entities/pilot';
import ShipRepository from '@/infra/db/repositories/ship';
import PilotMapping from '@/infra/db/mappings/pilot';
import { mockPilot } from '@/tests/domain/entities/mocks/pilot';

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

    test('it should throws if ormRepository fails to insert a ship', async () => {
      const { sut, ormRepository } = makeSut();

      jest.spyOn(ormRepository, 'insert').mockImplementationOnce(() => {
        throw new Error();
      });

      const shipData = {
        fuelCapacity: 10,
        weightCapacity: 10,
        pilot: mockPilot(),
        id: 1,
      };
      const ship = new Ship(shipData);

      await expect(sut.add(ship)).rejects.toThrow();
    });
  });

  describe('get()', () => {
    test('it should return a ship', async () => {
      const { sut } = makeSut();

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

      const shipFromDb = await sut.get(ship.id);

      expect(shipFromDb.id).toStrictEqual(ship.id);
    });

    test('it should return null if ship does not exists', async () => {
      const { sut } = makeSut();

      const shipFromDb = await sut.get(Number.MAX_SAFE_INTEGER);

      expect(shipFromDb).toStrictEqual(null);
    });
  });

  describe('update()', () => {
    test('it should update a ship', async () => {
      const { sut } = makeSut();

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

      const shipToUpdate = new Ship({
        ...shipData,
        fuelCapacity: 100000,
        id: ship.id,
      });

      await sut.update(shipToUpdate);

      const shipFromDb = await sut.get(ship.id);

      expect(shipFromDb.id).toStrictEqual(shipToUpdate.id);
      expect(shipFromDb.fuelCapacity).toStrictEqual(shipToUpdate.fuelCapacity);
    });
  });
});
