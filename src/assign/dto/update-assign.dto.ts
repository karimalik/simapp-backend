import { PartialType } from '@nestjs/swagger';
import { CreateAssignDto } from './create-assign.dto';

export class UpdateAssignDto extends PartialType(CreateAssignDto) {}
