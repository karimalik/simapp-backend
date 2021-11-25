import { ApiProperty } from '@nestjs/swagger';

export class CreateUtilisateurDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  picture: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  salt: string;

  @ApiProperty()
  role: string;
}
