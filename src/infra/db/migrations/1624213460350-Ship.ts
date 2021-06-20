import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export class Ship1624213460350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'ships',
      columns: [

        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'fuel_capacity',
          type: 'int',
          default: 0,
        },
        {
          name: 'fuel_level',
          type: 'int',
          default: 0,
        },
        {
          name: 'weight_capacity',
          type: 'int',
          default: 0,
        },
        {
          name: 'pilot_id',
          type: 'int',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('ships', new TableForeignKey({
      columnNames: ['pilot_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'pilots',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE ships');
  }
}
