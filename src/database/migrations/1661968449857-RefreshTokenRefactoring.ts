import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenRefactoring1661968449857
  implements MigrationInterface
{
  name = "RefreshTokenRefactoring1661968449857";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`refresh_tokens\` (
        \`id\` varchar(36) NOT NULL, 
        \`expiry_date\` datetime NOT NULL, 
        \`user_id\` int NULL, 
        PRIMARY KEY (\`id\`)
       ) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE 
        \`refresh_tokens\` 
       ADD 
        CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE 
        \`refresh_tokens\` 
       DROP 
        FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``
    );
    await queryRunner.query(
      `DROP TABLE 
        \`refresh_tokens\``
    );
  }
}
