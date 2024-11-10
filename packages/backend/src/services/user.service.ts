import { Injectable } from '@nestjs/common';
import { IUserLayoutServices } from '../../core/user-layout/IUserLayoutServices';
import { User, IFilterUser } from '../../core/user-layout/model';

@Injectable()
export class UserService extends IUserLayoutServices {
  protected createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  protected getUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  protected deleteUser(user: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async fetchUsers(filter?: Partial<IFilterUser>): Promise<[User]> {
    throw new Error('Method not implemented.');
  }

  async createUserWithValidation(user: User): Promise<void> {
    await super.createUserWithValidation(user);
  }

  async deleteUserWithValidation(id: string): Promise<void> {
    await super.deleteUserWithValidation(id);
  }

  constructor() {
    super();
  }
}
