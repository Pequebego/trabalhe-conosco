import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class SafraDTO{

    id?: number;


    @ApiProperty({
            type: Number,
            description: 'Ano da Safra'
        })
    @IsNumber()
    @Min(1000)
    ano: number;


    @ApiProperty({
        type: Number,
        description: 'Id da fazenda'
    })
    @IsNumber()
    idFazenda: number;

    
    @ApiProperty({
        type: String,
        description: 'Cultura plantada'
    })
    @IsString()
    culturaPlantada: string;
}