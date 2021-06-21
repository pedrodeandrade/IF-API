import Ship from '@/domain/entities/ship';

interface UpdateShipRepository {
  update(ship: Ship) : Promise<void>
}

export default UpdateShipRepository;
