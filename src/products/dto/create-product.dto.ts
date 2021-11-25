//import
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
// import { Date } from 'mongoose';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  codeBar: string;

  @ApiProperty()
  dateDelivery: string;

  @ApiProperty()
  dateExpired: string;

  @ApiProperty()
  disponibilite?: boolean = true;

  @ApiProperty()
  status?: boolean = false;

  @ApiProperty()
  image: string;

  @ApiProperty()
  quantite: string;

  @ApiProperty()
  prixunitaire: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  stock: string;

  @ApiProperty()
  video: string;

  @ApiProperty()
  supermarket_id: string;
}
