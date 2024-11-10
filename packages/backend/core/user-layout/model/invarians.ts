import { User } from './entities';

export const verifiedIfUserExist = (user: Partial<User>, fetchAllUser: any) => {
  const { firstName, lastName, gender, email } = user;
  return fetchAllUser({ firstName, lastName, gender, email }).then(
    (users: User[]) => {
      if (users.length > 0) {
        throw new Error('User already exist');
      }
    },
  );
};
