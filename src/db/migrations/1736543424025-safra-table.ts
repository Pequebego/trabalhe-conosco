import { MigrationInterface, QueryRunner } from "typeorm";

export class SafraTable1736543424025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE safra_table (
                id SERIAL PRIMARY KEY,
                ano INTEGER NOT NULL,
                id_fazenda SERIAL NOT NULL ,
                cultura_plantada varchar(256) NOT NULL,
                FOREIGN KEY (id_fazenda) REFERENCES fazenda_table (id_fazenda)
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.query(`DROP TABLE IF EXISTS safra_table;`)
    }

}
