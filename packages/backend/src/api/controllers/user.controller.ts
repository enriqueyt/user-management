import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
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

  @Put('all')
  //@Serialize(UserDto)
  async fetchUsers(@Body() filter?: Partial<UserDto>) {
    return this.userService.fetchUsers(filter);
  }

  @Delete(':id')
  async deleteUser(@Param() id: string) {
    return this.userService.deleteUserWithValidation(id);
  }

  @Put('list/:limit/:skip')
  async filterUsersWithPagination(
    @Body() user: Partial<UserDto>,
    @Param() limit: number,
    @Param() skip: number,
  ) {
    const filter = { ...user, limit, skip };
    return this.userService.filterUsersWithPaginationRequest(filter);
  }
}
