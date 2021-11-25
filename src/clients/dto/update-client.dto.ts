import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  prenom: string;

  @ApiProperty()
  age: string;

  @ApiProperty()
  sexe: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  musique: string;
}
