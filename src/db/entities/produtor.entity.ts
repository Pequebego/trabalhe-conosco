import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'produtor_table'})
export class ProdutorEntity{

    @PrimaryGeneratedColumn({type: 'int', name:'id_produtor'})
    idProdutor: number;

    @Column({ type:'varchar' })
    nome: String;

    @Column({ type:'varchar', name: 'cpfcnpj' })
    cpfcnpj: String;

}