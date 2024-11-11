import { Injectable } from '@nestjs/common';
import { IUserLayoutServices } from '../../core/user-layout/IUserLayoutServices';
import {
  User,
  IFilterUser,
  UsersFilterWithPagination,
} from '../../core/user-layout/model';
import { UserDBService } from './model/userDBService';

@Injectable()
export class UserService extends IUserLayoutServices {
  protected async createUser(user: User): Promise<void> {
    await this.userDBService.createUser(parseUserToUserDocument(user));
  }

  protected async getUserById(id: string): Promise<User> {
    const user = await this.userDBService.getUserById(id);
    return parseUserDocumentToUser(user);
  }

  protected async deleteUser(userId: string): Promise<void> {
    await this.userDBService.deleteUser(userId);
  }

  async fetchUsers(filter?: Partial<IFilterUser>): Promise<User[]> {
    const users = await this.userDBService.fetchUsers(filter);
    return users.map((user) => parseUserDocumentToUser(user));
  }

  async filterUsersWithPaginationRequest(
    filter?: Partial<IFilterUser>,
  ): Promise<UsersFilterWithPagination> {
    return this.filterUsersWithPagination(filter);
  }

  protected filterUsersWithPagination(
    filter?: Partial<IFilterUser>,
  ): Promise<UsersFilterWithPagination> {
    return this.userDBService.filterUsersWithPagination(filter);
  }

  async createUserWithValidation(user: User): Promise<void> {
    await super.createUserWithValidation(user);
  }

  async deleteUserWithValidation(id: string): Promise<void> {
    await super.deleteUserWithValidation(id);
  }

  constructor(private userDBService: UserDBService) {
    super();
  }
}

const parseUserToUserDocument = (user: User): any => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    shortDescription: user.shortDescription,
    email: user.email,
  };
};

const parseUserDocumentToUser = (user: any): User => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    shortDescription: user.shortDescription,
    email: user.email,
    createAt: user.createAt,
    updateAt: user.updateAt,
  };
};
