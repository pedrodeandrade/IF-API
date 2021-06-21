import Ship from '@/domain/entities/ship';

interface GetShipRepository {
  get(id : number) : Promise<Ship>;
}

export default GetShipRepository;
