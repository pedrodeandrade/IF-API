import { EntitySchema } from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import Planets from '@/domain/enums/planet';

const PilotMapping = new EntitySchema<Pilot>({
  name: 'Pilot',
  tableName: 'pilots',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      nullable: false,
    },
    certification: {
      type: String,
      nullable: false,
    },
    credits: {
      type: Number,
      nullable: false,
      default: 0,
    },
    age: {
      type: Number,
      nullable: false,
    },
    locationPlanet: {
      name: 'location_planet',
      type: String,
      enum: Planets,
      nullable: true,
    },
  },
  relations: {
    ships: {
      type: 'one-to-many',
      target: 'Ship',
      inverseSide: 'pilot',
    },
  },
});

export default PilotMapping;
