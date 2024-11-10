import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

export function Serialize<T>(ctor: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(ctor));
}
