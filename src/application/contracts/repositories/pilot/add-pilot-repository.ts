import Pilot from '@/domain/entities/pilot';

interface AddPilotRepository {
  add(pilot : Pilot) : Promise<boolean>;
}

export default AddPilotRepository;
