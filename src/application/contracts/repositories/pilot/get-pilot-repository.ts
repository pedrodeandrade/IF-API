import Pilot from '@/domain/entities/pilot';

interface GetPilotRepository {
  get(pilotId : number) : Promise<Pilot>;
}

export default GetPilotRepository;
