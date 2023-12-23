import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './auth.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    (prismaService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    const users = await userService.getAllUsers();
    console.log("all users ======= ", users);
    expect(users).toEqual(mockUsers);
    expect(prismaService.getAllUsers).toHaveBeenCalled();
});

it('should retrieve user by ID', async () => {
    const userId = 1;
    const mockUser = { id: userId, name: 'User 1' };
    (prismaService.getUserById as jest.Mock).mockResolvedValue(mockUser);
    
    const user = await userService.getUserById(userId);
    expect(user).toEqual(mockUser);
    console.log("one user ======= ", user);
    expect(prismaService.getUserById).toHaveBeenCalledWith(userId);
  });

  it('should update user by ID', async () => {
    const userId = 1;
    const updateData = { name: 'Updated User' };
    const mockUpdatedUser = { id: userId, ...updateData };
    (prismaService.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const updatedUser = await userService.updateUser(userId, updateData);
    console.log("updatedUser ======= ", updatedUser);
    
    expect(updatedUser).toEqual(mockUpdatedUser);
    expect(prismaService.updateUser).toHaveBeenCalledWith(userId, updateData);
});

it('should delete user by ID', async () => {
    const userId = 1;
    const mockDeletedUser = { id: userId, name: 'Deleted User' };
    (prismaService.deleteUser as jest.Mock).mockResolvedValue(mockDeletedUser);
    
    const deletedUser = await userService.deleteUser(userId);
    console.log("deletedUser ======= ", deletedUser);
    expect(deletedUser).toEqual(mockDeletedUser);
    expect(prismaService.deleteUser).toHaveBeenCalledWith(userId);
  });
});
