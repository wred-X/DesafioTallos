import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../tasks/shared/task.service';
import { MessagesService } from './messages.service';
import { Model } from 'mongoose';
import { Task } from 'src/tasks/shared/task';
import { getModelToken } from '@nestjs/mongoose';

describe('MessagesService', () => {
  let messageService: MessagesService;
  let taskService: TaskService;
  let taskModel: Model<Task>;
  const mockTask = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        TaskService,
        {
          provide: getModelToken('Task'),
          useValue: mockTask,
          // {
          //   find: jest.fn().mockResolvedValue(task),
          //   getById: jest.fn().mockResolvedValue(task[0]),
          //   findByEmail: jest.fn(),
          //   create: jest.fn(),
          //   update: jest.fn(),
          //   delete: jest.fn(),
          // },
        },
      ],
    }).compile();

    messageService = module.get<MessagesService>(MessagesService);
    taskModel = module.get<Model<Task>>(getModelToken('Task'));
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(messageService).toBeDefined();
    expect(taskService).toBeDefined();
    expect(taskModel).toBeDefined();
  });
});
