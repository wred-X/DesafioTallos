import { Test, TestingModule } from '@nestjs/testing';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';
import { TasksController } from './tasks.controller';

const task: Task[] = [
  new Task({
    _id: '1',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    age: 20,
    description: 'Gerente',
    owner: true,
  }),
  new Task({
    _id: '2',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    age: 20,
    description: 'Gerente',
    owner: true,
  }),
  new Task({
    _id: '3',
    email: 'testeJest@gmail.com',
    name: 'Vina',
    password: 'Abc@12345',
    age: 20,
    description: 'Gerente',
    owner: true,
  }),
];

const newTask: NestResponse = new NestResponse({
  headers: {
    Location: '/tasks/undefined',
  },
  body: {
    email: 'testeJest@gmail.com',
    name: 'Vina',
    age: 20,
    description: 'Gerente',
    owner: true,
    _id: '62e9116f63a31dc1d1c90707',
    __v: 0,
  },
  status: 201,
});

const updatedTask = new Task({
  email: 'testeJest@gmail.com',
  name: 'Vina',
  password: 'Abc@12345',
  age: 20,
  description: 'Gerente',
  owner: true,
  _id: '1',
});

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TaskService;
  let nestResponse: NestResponse;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(task),
            getById: jest.fn().mockResolvedValue(task[0]),
            create: jest.fn().mockResolvedValue(newTask),
            update: jest.fn().mockResolvedValue(updatedTask),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
        NestResponse,
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TaskService>(TaskService);
    nestResponse = module.get<NestResponse>(NestResponse);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
    expect(nestResponse).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de usuarios', async () => {
      // Act
      const result = await taskController.getAll();

      // Assert
      expect(result).toEqual(task);
      expect(typeof result).toEqual('object');
      expect(taskService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(taskService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um novo user com sucesso', async () => {
      // Arrange
      const body: Task = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        age: 20,
        description: 'Gerente',
        owner: true,
        _id: '62e9116f63a31dc1d1c90707',
      };

      // Act
      const result = await taskController.create(body);

      // Assert
      expect(result.body).toEqual(newTask);
      expect(taskService.create).toHaveBeenCalledTimes(1);
      expect(taskService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Task = {
        email: 'teste2@gmail.com',
        password: '*Lumia710',
        name: 'Neymar3333 Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        _id: '',
      };

      jest.spyOn(taskService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.create(body)).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar um user com sucesso pelo ID', async () => {
      // Act
      const result = await taskController.getById('1');

      // Assert
      expect(result).toEqual(task[0]);
      expect(taskService.getById).toHaveBeenCalledTimes(1);
      expect(taskService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(taskService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.getById('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve alterar dados de um user pelo ID', async () => {
      // Arrange
      const body: Task = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        age: 20,
        description: 'Gerente',
        owner: true,
        _id: '1',
      };

      // Act
      const result = await taskController.update('1', body);

      // Assert
      expect(result).toEqual(updatedTask);
      expect(taskService.update).toHaveBeenCalledTimes(1);
      expect(taskService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: Task = {
        email: 'testeJest@gmail.com',
        password: 'Abc@12345',
        name: 'Vina',
        age: 20,
        description: 'Gerente',
        owner: true,
        _id: '1',
      };

      jest.spyOn(taskService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um usuario com sucesso', async () => {
      // Act
      const result = await taskController.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(taskService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskController.delete('1')).rejects.toThrowError();
    });
  });
});
