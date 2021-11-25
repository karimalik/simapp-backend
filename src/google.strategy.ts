/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types/user';

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(@InjectModel('User') private userModel: Model<User>) {
        super({
            clientID: '552641880208-bu8p8l6i2i4id4cgobegj0nbuimfu4mt.apps.googleusercontent.com',
            clientSecret: '3mJNlkiU_beowFtV35sduP_N',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const newUser = new this.userModel();

        newUser.userId = uuidv4();
        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.picture = profile.photos[0].value;
        newUser.phone = profile.phone;
        newUser.address = profile.address;

        await newUser.save((err) => {
            if(err) throw new HttpException(err, HttpStatus.BAD_REQUEST);

            return done(null, newUser);
        });
    }
}
