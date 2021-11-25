/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Supermarkets } from 'src/supermarkets/schemas/supermarket.schema';
import { Products } from 'src/products/schemas/products.schema';

export type AssignDocument = Assign & Document;

@Schema()
export class Assign {
    @Prop()
    assignId: string;
    
    @Prop()
    quantite: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Supermarkets' })
    storeId: Supermarkets;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Products' })
    productId: Products;

    @Prop({ type: Date, Default: Date.now })
    createdAt: Date;
}

export const AssignSchema = SchemaFactory.createForClass(Assign);
