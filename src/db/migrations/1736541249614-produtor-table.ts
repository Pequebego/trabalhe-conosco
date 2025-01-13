import { MigrationInterface, QueryRunner } from "typeorm";

export class ProdutorTable1736541249614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE produtor_table (
                id_produtor SERIAL,
                nome varchar(256) NOT NULL ,
                cpfCnpj varchar(25) NOT NULL,
                CONSTRAINT produtor_pk PRIMARY KEY (id_produtor)
            );
            `)
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS produtor_table;`)
    }

}
