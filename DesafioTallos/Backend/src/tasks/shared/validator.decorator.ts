import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TaskService } from './task.service';

@Injectable()
@ValidatorConstraint()
export class IsSameEmailConstraint implements ValidatorConstraintInterface {
  constructor(private taskService: TaskService) {}

  validate(
    email: string,
    validationArguments?: ValidationArguments
  ): boolean | Promise<boolean> {
    return !!!this.taskService.login(email);
  }
}

export function IsSameEmail(
  validationOptions?: ValidationOptions
): (object: Object, propertyName: string) => void {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSameEmailConstraint,
    });
  };
}
