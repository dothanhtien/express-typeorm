import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1661360096624 implements MigrationInterface {
  name = "UserRefactoring1661360096624";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`email\` varchar(255) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`firstName\` varchar(255) NULL, 
        \`lastName\` varchar(255) NULL, 
        \`phoneNumber\` varchar(255) NULL, 
        \`dateOfBirth\` date NULL, 
        \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), 
        PRIMARY KEY (\`id\`)
       ) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
