import { Module } from '@nestjs/common';
import { UserController } from '../api/controllers';
import { UserService } from '../services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDBService, UserSchema } from '../services/model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserDBService],
})
export class UserModule {}
