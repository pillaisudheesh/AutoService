import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1743557768656 implements MigrationInterface {
    name = 'SchemaUpdate1743557768656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP COLUMN \`status\``);
    }

}
