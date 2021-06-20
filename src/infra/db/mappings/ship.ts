import { EntitySchema } from 'typeorm';

import Ship from '@/domain/entities/ship';

const ShipMapping = new EntitySchema<Ship>({
  name: 'Ship',
  tableName: 'ships',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    fuelCapacity: {
      type: Number,
      default: 0,
      name: 'fuel_capacity',
    },
    weightCapacity: {
      type: Number,
      default: 0,
      name: 'weight_capacity',
    },
    fuelLevel: {
      type: Number,
      default: 0,
      name: 'fuel_level',
    },
  },
  relations: {
    pilot: {
      type: 'many-to-one',
      target: 'Pilot',
      nullable: false,
      inverseSide: 'ships',
      eager: true,
      joinColumn: {
        name: 'pilot_id',
      },
    },
  },
});

export default ShipMapping;
