/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const NewsLetterSchema = new mongoose.Schema({
    newsletterId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})