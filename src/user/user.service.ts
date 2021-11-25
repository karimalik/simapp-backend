import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { RegisterDTO } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import { LoginDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/types/payload';
import { UserRoles } from 'src/Generics/enums/user-roles.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  //register user
  async create(registerDto: RegisterDTO) {
    const { email } = registerDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createUser = new this.userModel();

    createUser.userId = uuidv4();
    createUser.name = registerDto.name;
    createUser.email = registerDto.email;
    createUser.password = registerDto.password;
    createUser.phone = registerDto.phone;
    createUser.address = registerDto.address;
    createUser.picture = registerDto.picture;
    createUser.role = UserRoles.USER;

    createUser.salt = await bcrypt.genSalt();

    await createUser.save();
    // console.log(createUser);

    return this.sanitizeUser(createUser);
  }

  async findByLogin(userDto: LoginDTO) {
    const { email, password } = userDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    // console.log(user);
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
    // const hashedPassword = await bcrypt.hash(password, user.salt);

    // if ((await hashedPassword) === user.password) {
    //   return this.sanitizeUser(user);
    // } else {
    //   throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    // }
  }

  //return user Objet without password
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    // delete sanitized['password'];
    return sanitized;
  }

  //the new methods
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }

  async findAll() {
    return this.userModel.find();
  }

  // async findOne(email: string): Promise<User | undefined> {
  //   return this.userModel.find((user) => user.email === email);
  // }
}
