import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../tasks/shared/task';
import { TaskService } from '../tasks/shared/task.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

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

describe('MessagesGateway', () => {
  let gateway: MessagesGateway;
  let taskService: TaskService;
  let messagesService: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesGateway,
        {
          provide: MessagesService,
          useValue: {
            indentify: jest.fn(),
            findMe: jest.fn(),
            getClientName: jest.fn(),
            create: jest.fn(),
            getUser: jest.fn(),
            getById: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: TaskService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(task),
            getById: jest.fn().mockResolvedValue(task[0]),
          },
        },
      ],
    }).compile();

    gateway = module.get<MessagesGateway>(MessagesGateway);
    messagesService = module.get<MessagesService>(MessagesService);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
    expect(taskService).toBeDefined();
    expect(messagesService).toBeDefined();
  });
});
