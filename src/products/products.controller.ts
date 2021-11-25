/* eslint-disable @typescript-eslint/ban-types */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from 'src/shared/helper';
// import { JWTAuthGuard } from 'src/auth/Guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products Ressource')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Add Products' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.productsService.getAllProducts();
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.getOneProduct(productId);
  }

  @Put(':productId')
  @ApiCreatedResponse({ description: 'Update Products' })
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  remove(@Param('productId') productId: string) {
    return this.productsService.removeProduct(productId);
  }

  @Post('file-upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'image',
          maxCount: 10,
        },
      ],
      {
        storage: diskStorage({
          destination: Helper.destinationPath,
          filename: Helper.customFileName,
        }),
      },
    ),
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  uploadFile(@UploadedFiles() files): string {
    return 'success';
  }
}
