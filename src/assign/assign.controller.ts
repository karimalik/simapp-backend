import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignService } from './assign.service';
import { CreateAssignDto } from './dto/create-assign.dto';
import { UpdateAssignDto } from './dto/update-assign.dto';

@ApiTags('Assign Ressource')
@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}

  @Post()
  create(@Body() createAssignDto: CreateAssignDto) {
    return this.assignService.create(createAssignDto);
  }

  @Get()
  findAll() {
    return this.assignService.findAll();
  }

  @Get(':assignId')
  findOne(@Param('assignId') assignId: string) {
    return this.assignService.findOne(assignId);
  }

  @Put(':assignId')
  update(
    @Param('assignId') assignId: string,
    @Body() updateAssignDto: UpdateAssignDto,
  ) {
    return this.assignService.update(assignId, updateAssignDto);
  }

  @Delete(':assignId')
  remove(@Param('assignId') assignId: string) {
    return this.assignService.remove(assignId);
  }
}
