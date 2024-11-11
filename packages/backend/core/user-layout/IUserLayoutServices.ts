import { IFilterUser, User, UsersFilterWithPagination } from './model';
import {
  getIfExistUser,
  validateRequiredFields,
  verifiedIfUserExist,
} from './model/invarians';

export abstract class IUserLayoutServices {
  constructor() {}

  protected abstract createUser(user: Partial<User>): Promise<void>;
  protected abstract getUserById(id: string): Promise<User>;
  protected abstract deleteUser(user: string): Promise<void>;
  abstract fetchUsers(filter?: Partial<IFilterUser>): Promise<User[]>;

  protected async createUserWithValidation(user: User): Promise<void> {
    validateRequiredFields(user, 'firstName');
    validateRequiredFields(user, 'lastName');
    validateRequiredFields(user, 'gender');
    validateRequiredFields(user, 'email');

    await verifiedIfUserExist(user, this.fetchUsers.bind(this));
    await this.createUser(user);
  }

  protected async deleteUserWithValidation(id: string): Promise<void> {
    const user = await getIfExistUser(id, this.getUserById.bind(this));

    await this.deleteUser(user.id);
  }

  protected abstract filterUsersWithPagination(
    filter?: Partial<IFilterUser>,
  ): Promise<UsersFilterWithPagination>;
}
