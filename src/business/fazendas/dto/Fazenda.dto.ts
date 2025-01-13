import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FazendaDTO {
  @ApiProperty({
    type: String,
    description: 'Nome da fazenda',
  })
  @IsString()
  nome: string;

  idProdutor?: number;

  @ApiProperty({
    type: String,
    description: 'Cidade da fazenda',
  })
  @IsString()
  cidade: string;

  @ApiProperty({
    type: String,
    description: 'Estado da fazenda',
  })
  @IsString()
  estado: string;

  @ApiProperty({
    type: Number,
    description: 'Area total da fazenda',
  })
  @IsNumber()
  areaTotal: number;

  @ApiProperty({
    type: String,
    description: 'Area agriculturavel da fazenda',
  })
  @IsNumber()
  areaAgriculturavel: number;

  @ApiProperty({
    type: String,
    description: 'Area de vegetação da fazenda',
  })
  @IsNumber()
  areaVegetacao: number;
}
