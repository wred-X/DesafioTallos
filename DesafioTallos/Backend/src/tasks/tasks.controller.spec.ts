import { Test, TestingModule } from '@nestjs/testing';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';
import { TasksController } from './tasks.controller';

const task: Task[] = [
  new Task({ _id: '1' }),
  new Task({ _id: '2' }),
  new Task({ _id: '3' }),
];

const newTask = new Task({
  email: 'teste2@gmail.com',
  password: '*Lumia710',
  name: 'Neymar3333 Jr.',
  age: 33,
  description: 'Caixa',
  owner: false,
  _id: '11',
});

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(task),
            getById: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(newTask),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe('getAll', () => {
    it('deve retornar lista de usuarios', async () => {
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
        email: 'teste2@gmail.com',
        password: '*Lumia710',
        name: 'Neymar3333 Jr.',
        age: 33,
        description: 'Caixa',
        owner: false,
        _id: '',
      };

      // Act
      const result = await taskController.create(body);

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
      expect(taskController.create(body)).rejects.toThrowError();
    });
  });
});
