import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1661789465630 implements MigrationInterface {
  name = "UserRefactoring1661789465630";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(255) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`first_name\` varchar(255) NULL, 
        \`last_name\` varchar(255) NULL, 
        \`phone_number\` varchar(255) NULL, 
        \`date_of_birth\` date NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
