import Pilot from '@/domain/entities/pilot';

function mockPilot(id?: number) : Pilot {
  return Pilot.create({
    id: id || 1,
    age: 18,
    certification: '1234567',
    name: 'Pedro',
  }).data;
}

export { mockPilot };
