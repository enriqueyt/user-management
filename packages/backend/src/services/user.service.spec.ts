import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../../core/user-layout/model';
import { UserDBService, UserDocument, UserSchema } from './model';
import { MongooseModule } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/usermanagement', {
          // @ts-ignoredd
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        MongooseModule.forFeature([
          { name: UserDocument.name, schema: UserSchema },
        ]),
      ],
      providers: [UserService, UserDBService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // afterAll(async () => {
  //   const users = await service.listAllUsers();
  //   await Promise.all(users.map((user) => service.deleteUserWithValidation(user.id)));
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe.only('User Creation', () => {
    it('should fail if the user is missing a first name', async () => {
      const user = {
        email: 'test@test.com',
        lastName: 'User',
        gender: 'Famale',
      } as User;
      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'First name is required',
      );
    });

    it('should fail if the user is missing a last name', async () => {
      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        gender: 'Famale',
      } as User;

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'Last name is required',
      );
    });

    it('shuuld fail if the user is missing an gender', async () => {
      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
      } as User;

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'Gender is required',
      );
    });

    it('should create a user', async () => {
      // jest.spyOn(service, 'createUser').mockImplementation(jest.fn());
      // mock createUser

      // jest.spyOn(service, 'createUser');.mockImplementation(jest.fn());

      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Female',
        shortDescription: 'Test User',
      } as User;

      expect(service.createUserWithValidation(user)).resolves.not.toThrow();
    });

    it.skip('should fail if the user already exists', async () => {
      const user = {
        email: 'test@atest.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Female',
      } as User;

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'User already exists',
      );
    });
  });

  describe('User Listing', () => {
    it('should list all users', async () => {
      const users = await service.fetchUsers();
      expect(users).toHaveLength(1);
    });

    it('should list all users with a filter', async () => {
      const filter = {
        firstName: 'Test',
        lastName: 'User',
      };

      const users = await service.fetchUsers(filter);
      expect(users).toHaveLength(1);
    });
  });

  describe('User Deletion', () => {
    it('should fail if the user does not exist', async () => {
      const userId = 'unexistent-id';
      expect(service.deleteUserWithValidation(userId)).rejects.toThrowError(
        'User not found',
      );
    });

    it('should delete a user', async () => {
      const [userCreated] = await service.fetchUsers();
      const userId = userCreated.id;
      expect(service.deleteUserWithValidation(userId)).resolves.not.toThrow();
    });
  });
});
