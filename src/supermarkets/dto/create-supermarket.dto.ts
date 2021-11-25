import { ApiProperty } from '@nestjs/swagger';

export class CreateSupermarketDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  responsable: string;

  @ApiProperty()
  accreditation: string;
}
