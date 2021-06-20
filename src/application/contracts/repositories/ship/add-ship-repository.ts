import Ship from '@/domain/entities/ship';

interface AddShipRepository {
  add(ship : Ship) : Promise<void>
}

export default AddShipRepository;
