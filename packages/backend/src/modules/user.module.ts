import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../api/controllers';
import { UserSchema } from '../services';
import { UserService } from '../services/user.service';
import { UserDBService } from '../services/model/userDBService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserDocument', schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserDBService],
})
export class UserModule {}
