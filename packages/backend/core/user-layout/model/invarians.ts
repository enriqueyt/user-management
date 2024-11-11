import { User } from './entities';
import {
  UserAlreadyExistError,
  UserFieldRequiereError,
  UserNotFoundError,
} from './errors';

export const verifiedIfUserExist = (user: Partial<User>, fetchAllUser: any) => {
  const { firstName, lastName, gender, email } = user;
  return fetchAllUser({ firstName, lastName, gender, email }).then(
    (users: User[]) => {
      if (users.length > 0) {
        throw new UserAlreadyExistError();
      }
    },
  );
};

export const validateRequiredFields = (user: Partial<User>, field: string) => {
  if (!user[field]) {
    throw new UserFieldRequiereError(field);
  }
};

export const getIfExistUser = (id: string, getUserById: any) => {
  return getUserById(id).then((user: User) => {
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  });
};
