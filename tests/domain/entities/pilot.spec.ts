import Pilot from '@/domain/entities/pilot';

describe('Pilot', () => {
  test('it should create a pilot', () => {
    const createNewPilot = Pilot.create({
      name: 'Pedro',
      age: 21,
      certification: '0909091',
    });

    expect(createNewPilot.success).toStrictEqual(true);
    expect(createNewPilot.data.name).toStrictEqual('Pedro');
    expect(createNewPilot.data.id).toStrictEqual(0);
    expect(createNewPilot.data.credits).toStrictEqual(100);
    expect(createNewPilot.data).toBeInstanceOf(Pilot);
  });

  test('it should not create a pilot if certification length is different than 7', () => {
    const createNewPilot = Pilot.create({
      name: 'Pedro',
      age: 21,
      certification: '090909131231312312',
    });

    expect(createNewPilot.success).toStrictEqual(false);
    expect(createNewPilot.message).toStrictEqual('Invalid pilot certification');
  });

  test('it should not create a pilot if age is lower than 18', () => {
    const createNewPilot = Pilot.create({
      name: 'Pedro',
      age: 10,
      certification: '1122334',
    });

    expect(createNewPilot.success).toStrictEqual(false);
    expect(createNewPilot.message).toStrictEqual('Pilot need to be older than 18');
  });

  test('it should set credits to 0 if given a negative value', () => {
    const { data: newPilot } = Pilot.create({
      name: 'Pedro',
      age: 18,
      certification: '1122334',
    });

    newPilot.credits = -44;

    expect(newPilot.credits).toStrictEqual(0);
  });

  test('it should set credits to the value entered if it is positive', () => {
    const { data: newPilot } = Pilot.create({
      name: 'Pedro',
      age: 18,
      certification: '1122334',
    });

    newPilot.credits = 10;

    expect(newPilot.credits).toStrictEqual(10);
  });
});
