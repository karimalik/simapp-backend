/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupermarketDocument = Supermarkets & Document;

@Schema()
export class Supermarkets {
  @Prop()
  supermarketId: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  responsable: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  accreditation: string;

  @Prop({ type: Date, Default: Date.now })
  createdAt: Date;

  timestamps: true;
  static supermarketId: Supermarkets[];
}

export const SupermarketsSchema = SchemaFactory.createForClass(Supermarkets);
