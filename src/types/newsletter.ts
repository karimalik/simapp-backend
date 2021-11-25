/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface NewsLetter extends Document {
    newsletterId: string;
    email: string;
}