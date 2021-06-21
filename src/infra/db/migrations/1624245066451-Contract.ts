import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class Contract1624245066451 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'contracts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'origin_planet',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'destination_planet',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'value',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'pilot_id',
          type: 'int',
          isNullable: true,
          default: null,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('contracts', new TableForeignKey({
      columnNames: ['pilot_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'pilots',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE contracts');
  }
}
