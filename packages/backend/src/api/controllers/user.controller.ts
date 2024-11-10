import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../services';
import { UserDto } from '../dtos';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Serialize } from '../../decorators/serialize.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  @Serialize(UserDto)
  async createUser(@Body() user: UserDto) {
    return this.userService.createUserWithValidation(user);
  }
}
