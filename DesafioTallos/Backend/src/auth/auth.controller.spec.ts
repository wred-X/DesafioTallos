import { AuthController } from './auth.controller';
import { AuthService } from './shared/auth.service';
import { LoginRequestBody } from './models/LoginRequestBody';
import { Test, TestingModule } from '@nestjs/testing';
import { UserToken } from './models/UserToken';
import { AuthRequest } from './models/AuthRequest';

const newLog = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmJkZGYxZmYzY2UwODZhNzIxNjdlY2EiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIm5hbWUiOiJOZXltYXIgSnIuIiwiaWF0IjoxNjU5NTQ2MTY3LCJleHAiOjE2NjIxMzgxNjd9.m_VTm2n5F-qhY_SbekV8sXWlHLwjCLU2G9MEQ6vA7iU',
  user: {
    _id: '62bddf1ff3ce086a72167eca',
    email: 'testeJest@gmail.com',
    name: 'Neymar Jr.',
    age: 33,
    description: 'Caixa',
    owner: false,
    __v: 0,
  },
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(newLog),
            validateUser: jest.fn(),
            getUserFromAuthToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('Deve criar um novo user com sucesso', async () => {
      // Arrange
      const body = {
        _id: '62bddf1ff3ce086a72167eca',
        email: 'testeJest@gmail.com',
        name: 'Neymar Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        password: 'Abc@1234',
      };
      // };

      // Act
      const result = await authService.login(body);

      // Assert
      expect(result).toEqual(newLog);
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      let body: AuthRequest;

      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      // Assert
      expect(authController.login(body)).rejects.toThrowError();
    });
  });
});
