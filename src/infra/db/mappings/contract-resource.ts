import { EntitySchema } from 'typeorm';

import ContractResource from '@/domain/entities/contract-resource';
import Resource from '@/domain/enums/resouce';

const ContractResourceMapping = new EntitySchema<ContractResource>({
  name: 'ContractResource',
  tableName: 'contract_resources',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      enum: Resource,
      nullable: false,
    },
    weight: {
      type: Number,
      nullable: false,
    },
  },
  relations: {
    contract: {
      target: 'Contract',
      type: 'many-to-one',
      inverseSide: 'payload',
      joinColumn: {
        name: 'contract_id',
      },
    },
  },
});

export default ContractResourceMapping;
