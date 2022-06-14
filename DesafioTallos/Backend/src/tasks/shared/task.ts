import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import { IsEmail } from 'class-validator';

//parametros do user
export class Task {
  _id: string;
  @IsEmail({ message: 'email precisa ser um endereço de email válido.' })
  email: string;
  // @IsNotEmpty({
  //   message: 'senha é obrigatório.',
  // })
  // senha: string;
  age: number;
  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório.',
  })
  name: string;
  @IsNotEmpty({
    message: 'função do empregado é obrigatório.',
  })
  description: string;
  owner: boolean;
}
