import { User } from './entities';
import { UserAlreadyExistError, UserFieldRequiereError } from './errors';

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
