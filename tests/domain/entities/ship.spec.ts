import Pilot from '@/domain/entities/pilot';
import Ship from '@/domain/entities/ship';

const mockPilot = Pilot.create({
  name: 'Pedro',
  age: 21,
  certification: '1234567',
}).data;

describe('Ship', () => {
  test('it should create a ship with correct values', () => {
    const ship = new Ship({
      fuelCapacity: 10,
      weightCapacity: 15,
      pilot: mockPilot,
    });

    expect(ship.fuelCapacity).toStrictEqual(10);
    expect(ship.pilot).toStrictEqual(mockPilot);
    expect(ship.weightCapacity).toStrictEqual(15);
    expect(ship.fuelLevel).toStrictEqual(0);
  });

  test('it should create a ship with weightCapacity equal 0 if negative value is passed to it', () => {
    const ship = new Ship({
      fuelCapacity: 10,
      weightCapacity: -15,
      pilot: mockPilot,
    });

    expect(ship.weightCapacity).toStrictEqual(0);
  });

  test('it should create a ship with fuelCapacity equal 0 if negative value is passed to it', () => {
    const ship = new Ship({
      fuelCapacity: -10,
      weightCapacity: 15,
      pilot: mockPilot,
    });

    expect(ship.fuelCapacity).toStrictEqual(0);
  });
});
