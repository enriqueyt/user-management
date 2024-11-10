import { IFilterUser, User, UsersFilterWithPagination } from './model';
import { verifiedIfUserExist } from './model/invarians';

export abstract class IUserLayoutServices {
  constructor() {}

  protected abstract createUser(user: Partial<User>): Promise<void>;
  protected abstract getUserById(id: string): Promise<User>;
  protected abstract deleteUser(user: string): Promise<void>;
  abstract fetchUsers(filter?: Partial<IFilterUser>): Promise<User[]>;

  protected async createUserWithValidation(user: User): Promise<void> {
    if (!user.firstName) {
      throw new Error('First name is required');
    }
    if (!user.lastName) {
      throw new Error('Last name is required');
    }
    if (!user.gender) {
      throw new Error('Gender is required');
    }

    if (!user.email) {
      throw new Error('Email is required');
    }

    await verifiedIfUserExist(user, this.fetchUsers.bind(this));
    await this.createUser(user);
  }

  protected async deleteUserWithValidation(id: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.deleteUser(id);
  }

  protected abstract filterUsersWithPagination(
    filter?: Partial<IFilterUser>,
  ): Promise<UsersFilterWithPagination>;
}
