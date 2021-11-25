import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
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
  description: string;

  @ApiProperty()
  stock: string;

  @ApiProperty()
  video: string;

  @ApiProperty()
  supermarket_id: string;
}
