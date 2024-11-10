import { IFilterUser, User } from './model';

export abstract class IUserLayoutServices {
  constructor() {}

  protected abstract createUser(user: Partial<User>): Promise<void>;
  protected abstract getUserById(id: string): Promise<User>;
  protected abstract deleteUser(user: string): Promise<void>;
  abstract fetchUsers(): Promise<IFilterUser[]>;

  protected async createUserWithValidation(user: User): Promise<void> {
    if (!user.firstName) {
      throw new Error('First name is required');
    }
    if (!user.lastName) {
      throw new Error('Last name is required');
    }
    if (!user.email) {
      throw new Error('Email is required');
    }

    await this.createUser(user);
  }

  protected async deleteUserWithValidation(id: string): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    await this.deleteUser(id);
  }
}
