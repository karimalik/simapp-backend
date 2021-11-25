import { Module } from '@nestjs/common';
import { SupermarketsService } from './supermarkets.service';
import { SupermarketsController } from './supermarkets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supermarkets, SupermarketsSchema } from './schemas/supermarket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supermarkets.name, schema: SupermarketsSchema },
    ]),
  ],
  controllers: [SupermarketsController],
  providers: [SupermarketsService],
})
export class SupermarketsModule {}
