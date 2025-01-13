import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ValidCpfCnpj } from 'src/decorators/CpfCnpj.decorator';

export class ProdutorDTO {
  @ApiProperty({
    type: String,
    description: 'Nome do Produtor',
  })
  @IsString()
  nome: String;

  @ApiProperty({
    type: String,
    description: 'CPF/CNPJ do Produtor',
  })
  @ValidCpfCnpj({ message: 'Campo CPF/CNPJ inválido' })
  cpfcnpj: String;
}
