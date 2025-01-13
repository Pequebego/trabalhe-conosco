import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'safra_table'})
export class SafraEntity{

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    ano: number;

    @Column({type: 'int', name: 'id_fazenda'})
    idFazenda: number;

    @Column({type: 'varchar', name: 'cultura_plantada'})
    culturaPlantada: string;

}