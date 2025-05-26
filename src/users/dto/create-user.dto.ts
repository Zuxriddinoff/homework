import {
  IsString,
  Min,
  Max,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Ism familiya',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    description: 'Email kiriting',
    example: 'faxriddin@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Telefon nomer kiriting',
    example: '+998901234567',
    required: true,
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Parol kiriting',
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'student',
    required: true,
  })
  @IsEnum(['superadmin', 'admin', 'teacher', 'student'])
  @IsNotEmpty()
  role: string;
}
