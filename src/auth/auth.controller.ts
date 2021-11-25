import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('auth controller')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDTO) {
    const user = await this.userService.create(registerDto);

    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('login')
  async login(@Body() userDto: LoginDTO) {
    const user = await this.userService.findByLogin(userDto);

    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
