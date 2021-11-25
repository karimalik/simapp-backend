import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { ClientsModule } from './clients/clients.module';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from './models/user.schema';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { NewsletterModule } from './newsletter/newsletter.module';
import { AssignModule } from './assign/assign.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    ProductsModule,
    SupermarketsModule,
    ClientsModule,
    UserModule,
    AuthModule,
    NewsletterModule,
    AssignModule,
    UtilisateurModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy],
})
export class AppModule {}
