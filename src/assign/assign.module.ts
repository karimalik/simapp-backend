import { Module } from '@nestjs/common';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assign, AssignSchema } from './schemas/assign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Assign.name, schema: AssignSchema }]),
  ],
  controllers: [AssignController],
  providers: [AssignService],
})
export class AssignModule {}
