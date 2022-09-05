import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryRefactoring1662041098340 implements MigrationInterface {
  name = "CategoryRefactoring1662041098340";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (
        \`id\` int NOT NULL AUTO_INCREMENT, 
        \`name\` varchar(255) NOT NULL, 
        \`slug\` varchar(255) NOT NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`mpath\` varchar(255) NULL DEFAULT '', 
        \`parent_id\` int NULL, UNIQUE INDEX \`IDX_420d9f679d41281f282f5bc7d0\` (\`slug\`), 
        PRIMARY KEY (\`id\`)) ENGINE=InnoDB
      `
    );
    await queryRunner.query(
      `ALTER TABLE 
        \`categories\` 
       ADD 
        CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_420d9f679d41281f282f5bc7d0\` ON \`categories\``
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
