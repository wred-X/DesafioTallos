import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../tasks/shared/task.service';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

describe('MessagesGateway', () => {
  let gateway: MessagesGateway;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesGateway,
        MessagesService,
        {
          provide: TaskService,
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<MessagesGateway>(MessagesGateway);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
    expect(taskService).toBeDefined();
  });
});
