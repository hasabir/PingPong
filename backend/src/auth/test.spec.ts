import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Token_Service } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let tokenService: Token_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: Token_Service,
          useValue: {
            get_Token: jest.fn(),
            // Mock other methods if needed for other tests
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    tokenService = module.get<Token_Service>(Token_Service);
  });

  it('should generate JWT token and redirect to /auth', async () => {
    const mockUser = { id: 1, username: 'testuser' };
    const mockJwtToken = 'mock-jwt-token';
    const mockRequest = { user: mockUser };
    const mockResponse = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    (tokenService.get_Token as jest.Mock).mockResolvedValue(mockJwtToken);

    await controller.auth42Callback(mockRequest as any, mockResponse as any);

    expect(tokenService.get_Token).toHaveBeenCalledWith(mockUser);
    expect(mockResponse.redirect).toHaveBeenCalledWith(`/auth?jwt=${mockJwtToken}`);
  });
});
