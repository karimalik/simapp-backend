/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    phone: string;
  
    @ApiProperty()
    @IsNotEmpty()
    address: string;
  
    @ApiProperty()
    picture: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @ApiProperty()
    role: string;
}
