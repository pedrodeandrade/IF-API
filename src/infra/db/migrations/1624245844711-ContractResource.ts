import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class ContractResource1624245844711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'contract_resources',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'weight',
          type: 'real',
          isNullable: false,
        },
        {
          name: 'contract_id',
          type: 'int',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('contract_resources', new TableForeignKey({
      columnNames: ['contract_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'contracts',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE contract_resources');
  }
}
