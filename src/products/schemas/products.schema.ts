/* eslint-disable prettier/prettier */
//import
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';
// import { Supermarkets } from '../../supermarkets/schemas/supermarket.schema'

export enum statusProduct {
  PasEnPromotion = 0,
  EnPromotion = 1
}

export type ProductsDocuments = Products & Document;
// const productId = new mongoose.Schema.Types.ObjectId;
// const created_at = Date.now();

@Schema()
export class Products {
  @Prop()
  productId: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  codeBar: string;

  @Prop({ required: false })
  dateDelivery: string;

  @Prop({ required: false })
  dateExpired: string;

  @Prop({ required: false, default: true })
  disponibilite?: boolean = true;

  @Prop()
  status: statusProduct

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  quantite: string;

  @Prop({ required: false })
  prixunitaire: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  stock: string;

  @Prop({ required: false })
  video: string;

  @Prop({ type: Date, Default: Date.now })
  createdAt: Date;

}

export const ProductsSchema = SchemaFactory.createForClass(Products);
