import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('User Creation', () => {
    it('should fail if the user is missing a first name', async () => {
      const user = {
        email: 'test@test.com',
        lastName: 'User',
        gender: 'Famale',
      };
      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'First name is required',
      );
    });

    it('should fail if the user is missing a last name', async () => {
      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        gender: 'Famale',
      };

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'Last name is required',
      );
    });

    it('shuuld fail if the user is missing an gender', async () => {
      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
      };

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'Gender is required',
      );
    });

    it('should create a user', async () => {
      const user = {
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Famale',
      };

      expect(service.createUserWithValidation(user)).resolves.not.toThrow();
    });

    it('should fail if the user already exists', async () => {
      const user = {
        email: 'test@atest.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Famale',
      };

      expect(service.createUserWithValidation(user)).rejects.toThrowError(
        'User already exists',
      );
    });
  });

  describe('User Deletion', async () => {
    const [userCreated] = await service.listAllUsers();

    it('should fail if the user does not exist', async () => {
      const userId = 'unexistent-id';
      expect(service.deleteUserWithValidation(userId)).rejects.toThrowError(
        'User not found',
      );
    });

    it('should delete a user', async () => {
      const userId = userCreated.id;
      expect(service.deleteUserWithValidation(userId)).resolves.not.toThrow();
    });
  });

  describe('User Listing', async () => {
    it('should list all users', async () => {
      const users = await service.listAllUsers();
      expect(users).toHaveLength(1);
    });

    it('should list all users with a filter', async () => {
      const filter = {
        firstName: 'Test',
        lastName: 'User'
      };

      const users = await service.listAllUsers(filter);
      expect(users).toHaveLength(1);
    });
  });
});
