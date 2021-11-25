import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Supermarket Resource')
@Controller('supermarkets')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Add new supermarket' })
  @ApiBody({ type: CreateSupermarketDto })
  create(@Body() createSupermarketDto: CreateSupermarketDto) {
    return this.supermarketsService.addSupermarket(createSupermarketDto);
  }

  @Get()
  findAll() {
    return this.supermarketsService.getAllSupermarket();
  }

  @Get(':supermarketId')
  findOne(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.getOneSupermarket(supermarketId);
  }

  @Put(':supermarketId')
  @ApiCreatedResponse({ description: 'Update supermarket' })
  @ApiBody({ type: UpdateSupermarketDto })
  update(
    @Param('supermarketId') supermarketId: string,
    @Body() updateSupermarketDto: UpdateSupermarketDto,
  ) {
    return this.supermarketsService.updateSupermarket(
      supermarketId,
      updateSupermarketDto,
    );
  }

  @Delete(':supermarketId')
  remove(@Param('supermarketId') supermarketId: string) {
    return this.supermarketsService.removeSupermarket(supermarketId);
  }
}
