/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientsDocument = Clients & Document;

@Schema()
export class Clients {
  @Prop()
  clientId: string;
  @Prop()
  name: string;

  @Prop()
  prenom: string;

  @Prop()
  age: string;

  @Prop()
  sexe: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  musique: string;

  @Prop({ type: Date, Default: Date.now })
  createdAt: Date;
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
