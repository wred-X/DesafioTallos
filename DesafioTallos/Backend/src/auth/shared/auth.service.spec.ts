import { AuthRequest } from '../models/AuthRequest';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../../tasks/shared/task.service';
import { UnauthorizedError } from '../errors/unauthorized.error';

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

const userByToken = {
  _id: '62bddf1ff3ce086a72167eca',
  email: 'testeJest@gmail.com',
  name: 'Neymar Jr.',
  age: 33,
  description: 'Caixa',
  owner: false,
};

describe('AuthController', () => {
  let authService: AuthService;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(newLog),
            validateUser: jest.fn().mockResolvedValue(newLog),
            getUserFromAuthToken: jest.fn().mockResolvedValue(userByToken),
          },
        },
        {
          provide: TaskService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe('login', () => {
    it('Deve logar um user, autenticando e retornando um token com sucesso', async () => {
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
      const body = {
        _id: '62bddf1ff3ce086a72167eca',
        email: 'testeJest@gmail.com',
        name: 'Neymar Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        password: 'Abc@1234',
      };

      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      // Assert
      expect(authService.login(body)).rejects.toThrowError();
    });
  });

  describe('validateUser', () => {
    it('Deve validar um user pelo email e senha com sucesso', async () => {
      // Arrange
      const body = {
        email: 'testeJest@gmail.com',
        password: 'Abc@1234',
      };
      // };

      // Act
      const result = await authService.validateUser(body.email, body.password);

      // Assert
      expect(result).toEqual(newLog);
      expect(authService.validateUser).toHaveBeenCalledTimes(1);
      expect(authService.validateUser).toHaveBeenCalledWith(
        body.email,
        body.password
      );
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        email: 'testeJest@gmail.com',
        password: 'Abc@1234',
      };

      jest
        .spyOn(authService, 'validateUser')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        authService.validateUser(body.email, body.password)
      ).rejects.toThrowError();
    });
  });

  describe('getUserFromAuthToken', () => {
    it('Deve retornar um user utilizando apenas o token', async () => {
      // Arrange
      const body =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmJkZGYxZmYzY2UwODZhNzIxNjdlY2EiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIm5hbWUiOiJOZXltYXIgSnIuIiwiaWF0IjoxNjU5NTQ2MTY3LCJleHAiOjE2NjIxMzgxNjd9.m_VTm2n5F-qhY_SbekV8sXWlHLwjCLU2G9MEQ6vA7iU';

      // };

      // Act
      const result = await authService.getUserFromAuthToken(body);

      // Assert
      expect(result).toEqual(userByToken);
      expect(authService.getUserFromAuthToken).toHaveBeenCalledTimes(1);
      expect(authService.getUserFromAuthToken).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmJkZGYxZmYzY2UwODZhNzIxNjdlY2EiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsIm5hbWUiOiJOZXltYXIgSnIuIiwiaWF0IjoxNjU5NTQ2MTY3LCJleHAiOjE2NjIxMzgxNjd9.m_VTm2n5F-qhY_SbekV8sXWlHLwjCLU2G9MEQ6vA7iU';

      jest
        .spyOn(authService, 'getUserFromAuthToken')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(authService.getUserFromAuthToken(body)).rejects.toThrowError();
    });
  });
});
