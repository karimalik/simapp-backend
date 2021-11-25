/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, Profile } from 'passport-facebook';
import { User } from './types/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      clientID: '2864686243782810',
      clientSecret: '16fd76c6594c95f1e87c3ada3d6d9138',
      callbackURL: 'http://localhost:3git000/facebook/redirect',
      scope: "email",
      profileFields: ['emails', 'profile'],
    });
  }
    async validate(
       accessToken: string, 
       refreshToken: string, 
       profile: Profile, 
       done: (err: any, user: any, info?: any) => void): Promise<any> {

        const newUser = new this.userModel();

        newUser.userId = uuidv4();
        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.email = profile.emails[0].value;
        newUser.picture = profile.photos[0].value;
        await newUser.save((err) => {
            if(err) throw new HttpException(err, HttpStatus.BAD_REQUEST);

            return done(null, newUser);
        });
    }
}
