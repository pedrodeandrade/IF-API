import Pilot from '@/domain/entities/pilot';

interface UpdatePilotRepository {
  update(pilot : Pilot) : Promise<void>
}

export default UpdatePilotRepository;
