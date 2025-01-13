import { MigrationInterface, QueryRunner } from "typeorm";

export class FazendaTable1736541260109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE fazenda_table (
                id_fazenda SERIAL,
                id_produtor SERIAL NOT NULL,
                nome varchar(256) NOT NULL ,
                cidade varchar(256) NOT NULL,
                estado varchar(256) NOT NULL,
                area_total DOUBLE PRECISION NOT NULL ,
                area_agriculturavel DOUBLE PRECISION NOT NULL,
                area_vegetacao DOUBLE PRECISION NOT NULL,
                CONSTRAINT fazenda_pk PRIMARY KEY (id_fazenda),
                CHECK (area_total >= area_agriculturavel + area_vegetacao),
                FOREIGN KEY (id_produtor) REFERENCES produtor_table (id_produtor)
            );
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS fazenda_table;`)
    }

}
