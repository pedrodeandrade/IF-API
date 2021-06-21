import { EntitySchema } from 'typeorm';

import Contract from '@/domain/entities/contract';
import Planets from '@/domain/enums/planet';
import ContractStatus from '@/domain/enums/contract-status';

const ContractMapping = new EntitySchema<Contract>({
  name: 'Contract',
  tableName: 'contracts',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    description: {
      type: String,
      nullable: false,
    },
    originPlanet: {
      type: String,
      nullable: false,
      enum: Planets,
      name: 'origin_planet',
    },
    destinationPlanet: {
      type: String,
      nullable: false,
      enum: Planets,
      name: 'destination_planet',
    },
    value: {
      type: Number,
      nullable: false,
    },
    status: {
      type: Number,
      nullable: false,
      enum: ContractStatus,
    },
  },
  relations: {
    payload: {
      type: 'one-to-many',
      target: 'ContractResource',
      inverseSide: 'contract',
      eager: true,
    },
    pilot: {
      type: 'many-to-one',
      target: 'Pilot',
      inverseSide: 'contracts',
      joinColumn: {
        name: 'pilot_id',
      },
      nullable: true,
    },
  },
});

export default ContractMapping;
