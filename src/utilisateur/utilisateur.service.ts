/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import {
  Utilisateurs,
  UtilisateursDocument,
} from './schemas/utilisateur.schema';

import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-creadentials-dto';
import { User } from 'src/types/user';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel(Utilisateurs.name)
    private UtilisateurModel: Model<UtilisateursDocument>,
  ) {}
  create(createUtilisateurDto: CreateUtilisateurDto) {
    return 'This action adds a new utilisateur';
  }

  findAll() {
    return `This action returns all utilisateur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utilisateur`;
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }

  //register user
  async registerUser(registerUserDto: RegisterUserDto): Promise<Utilisateurs> {
    const { name, email, phone, address } = registerUserDto;

    const utilisateur = await new this.UtilisateurModel({
      ...registerUserDto,
    });
    utilisateur.salt = await bcrypt.genSalt();
    utilisateur.password = await bcrypt.hash(
      utilisateur.password,
      utilisateur.salt,
    );

    try {
      await utilisateur.save();
    } catch (err) {
      throw new ConflictException(`email must be unique`);
    }

    delete utilisateur.salt;

    return utilisateur;
  }

  async loginUser(loginCredentialsDto: LoginCredentialsDto) {
    const { email, password } = loginCredentialsDto;

    // const utilisateur = await this.UtilisateurModel.findByLogin(
    //   loginCredentialsDto,
    // );
  }

  async findByLogin(loginCredentialsDto: LoginCredentialsDto) {
    const { email, password } = loginCredentialsDto;
    const user = await this.UtilisateurModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
