import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Utilisateurs, UtilisateursSchema } from './schemas/utilisateur.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Utilisateurs.name, schema: UtilisateursSchema },
    ]),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
})
export class UtilisateurModule {}
