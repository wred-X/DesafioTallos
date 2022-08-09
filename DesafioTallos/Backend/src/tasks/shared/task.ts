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
import { IsSameEmail } from './validator.decorator';

//parametros do user
export class Task {
  @Expose({ name: 'ID' })
  @ApiProperty()
  _id: string;

  @ApiProperty({
    description: 'Email de usuario',
    example: 'email@gmail.com',
  })
  @Expose({ name: 'email' })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @ApiProperty({
    description: 'Senha de usuario',
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
    description: 'Idade de usuario',
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
    description: 'Nome de usuario',
  })
  @Expose({ name: 'name' })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @ApiProperty({
    example: 'Gerente',
    description: 'Função de usuario',
  })
  @Expose({ name: 'work' })
  @IsNotEmpty({
    message: 'Função do empregado é obrigatório.',
  })
  description: string;

  @ApiProperty({
    example: 'True',
    description: 'Permissão admin/comum de usuario',
  })
  @Expose({ name: 'permission' })
  owner: boolean;

  constructor(todo?: Partial<Task>) {
    this._id = todo?._id;
    this.email = todo?.email;
    this.password = todo?.password;
    this.age = todo?.age;
    this.name = todo?.name;
    this.description = todo?.description;
    this.owner = todo?.owner;
  }
}
