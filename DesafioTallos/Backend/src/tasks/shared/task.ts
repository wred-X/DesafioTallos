import { Document } from 'mongoose';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsSameEmail } from './validator.decorator';
import { Expose } from 'class-transformer';

//parametros do user
export class Task {
  @Expose({ name: 'ID' })
  _id: string;

  //@IsSameEmail({ message: 'Esse email já foi cadastrado' })
  @Expose({ name: 'email' })
  @IsEmail({ message: 'Email precisa ser um endereço de email válido.' })
  @IsNotEmpty({
    message: 'Email é obrigatório.',
  })
  email: string;

  @Expose({
    name: 'password',
  })
  @IsNotEmpty({
    message: 'senha é obrigatório.',
  })
  @MinLength(4)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @Expose({ name: 'age' })
  @IsInt({
    message: 'Por favor, apenas inserir apenas números',
  })
  @IsNotEmpty({
    message: 'Inserir idade é obrigatório.',
  })
  age: number;

  @Expose({ name: 'name' })
  @IsNotEmpty({
    message: 'Nome Completo é obrigatório.',
  })
  name: string;

  @Expose({ name: 'work' })
  @IsNotEmpty({
    message: 'Função do empregado é obrigatório.',
  })
  description: string;

  @Expose({ name: 'permission' })
  owner: boolean;
}
