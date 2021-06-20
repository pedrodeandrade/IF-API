import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pilot1624123742992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'pilots',
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
          name: 'certification',
          type: 'varchar(7)',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'age',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'credits',
          type: 'decimal',
          isNullable: false,
          default: 0,
        },
        {
          name: 'location_planet',
          type: 'varchar',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pilots');
  }
}
