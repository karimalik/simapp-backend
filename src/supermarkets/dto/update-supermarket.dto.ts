import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSupermarketDto } from './create-supermarket.dto';

export class UpdateSupermarketDto extends PartialType(CreateSupermarketDto) {
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
