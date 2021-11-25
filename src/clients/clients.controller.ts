import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients Resource')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: CreateClientDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.newClients(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAllClient();
  }

  @Get(':clientId')
  findOne(@Param('clientId') clientId: string) {
    return this.clientsService.findOneClient(clientId);
  }

  @Put(':clientId')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: UpdateClientDto })
  update(
    @Param('clientId') clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.updateClient(clientId, updateClientDto);
  }

  @Delete(':clientId')
  remove(@Param('clientId') clientId: string) {
    return this.clientsService.removeClient(clientId);
  }
}
