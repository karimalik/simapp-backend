/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';
import { UserRoles } from 'src/Generics/enums/user-roles.enum';

export type UtilisateursDocument = Utilisateurs & Document;

@Schema()
export class Utilisateurs {
    @Prop()
    userId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: String, required: true, unique: true})
    @IsEmail()
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop()
    address: string;

    @Prop({ required: false })
    picture: string;

    @Prop({ type: String, required: true, unique: true})
    password: string;

    @Prop({ type: String, required: true})
    salt: string;

    @Prop({ enum: UserRoles, default: UserRoles.USER })
    role: string;

    @Prop({ type: Date, default: Date.now})
    createdAt: Date;
}

export const UtilisateursSchema = SchemaFactory.createForClass(Utilisateurs);
