import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1743510588968 implements MigrationInterface {
    name = 'SchemaUpdate1743510588968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ServiceProvider\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`owner\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`services\` varchar(255) NOT NULL, \`operatingHours\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Bookings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(255) NOT NULL, \`time\` varchar(255) NOT NULL, \`additionalNotes\` text NULL, \`selectedServices\` text NOT NULL, \`user_id\` int NULL, \`service_provider_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD CONSTRAINT \`FK_166b5b6744f61047dc35935a057\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Bookings\` ADD CONSTRAINT \`FK_5c818fc7de97a51b710ad7abc61\` FOREIGN KEY (\`service_provider_id\`) REFERENCES \`ServiceProvider\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP FOREIGN KEY \`FK_5c818fc7de97a51b710ad7abc61\``);
        await queryRunner.query(`ALTER TABLE \`Bookings\` DROP FOREIGN KEY \`FK_166b5b6744f61047dc35935a057\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`Bookings\``);
        await queryRunner.query(`DROP TABLE \`ServiceProvider\``);
    }

}
