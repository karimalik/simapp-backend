import { ApiProperty } from '@nestjs/swagger';
import { Products } from 'src/products/schemas/products.schema';
import { Supermarkets } from 'src/supermarkets/schemas/supermarket.schema';

export class CreateAssignDto {
  @ApiProperty()
  quantite: string;

  @ApiProperty()
  storeId: Supermarkets;

  @ApiProperty()
  productId: Products;

  @ApiProperty()
  createdAt: Date;
}
