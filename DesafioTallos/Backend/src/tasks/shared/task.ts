import { Document } from 'mongoose';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
//import { IsSameEmail } from './validator.decorator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

//parametros do user
export class Task {
  @Expose({ name: 'ID' })
  @ApiProperty()
  _id: string;

  @ApiProperty({
    example: 'email@gmail.com',
  })
  @Expose({ name: 'email' })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @ApiProperty({
    example: 'Abc@123',
  })
  @Expose({
    name: 'password',
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    example: '24',
  })
  @Expose({ name: 'age' })
  // @IsInt({
  //   message: 'Por favor, apenas inserir apenas números',
  // })
  @IsNotEmpty({
    message: 'Inserir idade é obrigatório.',
  })
  age: number;

  @ApiProperty({
    example: 'Wesley Romão',
  })
  @Expose({ name: 'name' })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: 'Gerente',
  })
  @Expose({ name: 'work' })
  @IsNotEmpty({
    message: 'Função do empregado é obrigatório.',
  })
  description: string;

  @ApiProperty()
  @Expose({ name: 'permission' })
  owner: boolean;
}
