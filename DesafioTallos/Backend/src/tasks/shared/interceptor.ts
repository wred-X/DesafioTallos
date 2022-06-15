import {
  ClassSerializerInterceptor,
  Injectable,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

@Injectable()
export class InterceptorForClassSerializer extends ClassSerializerInterceptor {
  serialize(response: any, options: ClassTransformOptions) {
    const rawDataJSON = JSON.stringify(response);
    return super.serialize(JSON.parse(rawDataJSON), options);
  }
}

//  @SerializeOptions({
//    excludePrefixes: ['password']
//  })
// @UseInterceptors(InterceptorForClassSerializer)
