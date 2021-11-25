/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface User extends Document {
    userId: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    picture: string;
    salt: string;
    role: string;
}
