import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'fazenda_table'})
export class FazendaEntity{

    @PrimaryGeneratedColumn({type: 'int', name: 'id_fazenda'})
    idFazenda: number;
    @Column({ type:'varchar' })
    nome: string;
    
    @Column({ type:'int', name: 'id_produtor' })
    idProdutor: number;

    @Column({ type:'varchar' })
    cidade: string;
 
    @Column({ type:'varchar' })
    estado: string;
 
    @Column({ type:'varchar', name: 'area_total' })
    areaTotal: number;

    @Column({ type:'varchar', name: 'area_agriculturavel' })
    areaAgriculturavel: number;

    @Column({ type:'varchar', name: 'area_vegetacao' })
    areaVegetacao: number;

}