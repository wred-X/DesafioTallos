import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './task';
import { Model } from 'mongoose';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';

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

const newTask: Task = new Task({
  email: 'testeJest@gmail.com',
  name: 'Vina',
  age: 20,
  description: 'Gerente',
  owner: true,
  _id: '62e9116f63a31dc1d1c90707',
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

describe('TaskService', () => {
  let taskService: TaskService;
  let taskModel: Model<Task>;

  const mockTask = {
    getAll: jest.fn().mockResolvedValue(task),
    getById: jest.fn().mockResolvedValue(task[0]),
    create: jest.fn().mockResolvedValue(newTask),
    update: jest.fn().mockResolvedValue(updatedTask),
    delete: jest.fn().mockResolvedValue(undefined),
    findByEmail: jest.fn().mockResolvedValue(task[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useValue: mockTask,
        },
        {
          provide: getModelToken('Task'),
          useValue: mockTask,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskModel = module.get<Model<Task>>(getModelToken('Task'));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar toda a lista completa de usuarios', async () => {
      // Act
      const result = await taskService.getAll();

      // Assert
      expect(result).toEqual(task);
      expect(typeof result).toEqual('object');
      expect(taskService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(taskService, 'getAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(taskService.getAll()).rejects.toThrowError();
    });
  });

  describe('getById', () => {
    it('Deve retornar um usuario pelo ID', async () => {
      // Act
      const result = await taskService.getById('1');

      // Assert
      expect(result).toEqual(task[0]);
      expect(taskService.getById).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(taskService, 'getById').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskService.getById('1')).rejects.toThrowError();
    });
  });

  describe('findByEmail', () => {
    it('Deve retornar um usuario a partir do email', async () => {
      // Act
      const result = await taskService.findByEmail('testeJest@gmail.com');

      // Assert
      expect(result).toEqual(task[0]);
      expect(taskService.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(taskService, 'findByEmail').mockRejectedValueOnce(new Error());

      // Assert
      expect(
        taskService.findByEmail('testeJest@gmail.com')
      ).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar um usuario com sucesso!', async () => {
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
      const result = await taskService.create(body);
      // Assert
      expect(result).toEqual(newTask);
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
      expect(taskService.create(body)).rejects.toThrowError();
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
      const result = await taskService.update('1', body);

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
      expect(taskService.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover um usuario com sucesso', async () => {
      // Act
      const result = await taskService.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(taskService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(taskService.delete('1')).rejects.toThrowError();
    });
  });
});
