import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { TaskPaginationDto } from './dto/task-pagination.dto';
import { ChangeTaskStatusDto } from './dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class TasksService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createTaskDto: CreateTaskDto) {
    const { dateLimit, ...data } = createTaskDto;

    return this.task.create({
      data: {
        ...data,
        dateLimit: dateLimit ? new Date(dateLimit) : null,
      }
    });
  }

  async findAll(taskPaginationDto: TaskPaginationDto) {
    const { page, limit } = taskPaginationDto;

    const totalPages = await this.task.count({
      where: {
        status: taskPaginationDto.status
      }
    });

    return {
      data: await this.task.findMany({
        skip: ( page! - 1) * limit!,
        take: limit,
        where: {
          status: taskPaginationDto.status
        }
      }),
      meta: {
        total: totalPages,
        page,
      }
    }
  }

  async findOne(id: string) {
    const task = await this.task.findFirst({
      where: { id }
    });

    if( !task ){
      throw new RpcException({
        message: `Task with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    const {dateLimit ,id:_, ...data} = updateTaskDto;

    return await this.task.update({
      where: { id },
      data: {
        ...data,
        dateLimit: dateLimit ? new Date(dateLimit) : null,
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.task.delete({
      where: {id}
    });
  }

  async changeStatus(changeTaskStatusDto: ChangeTaskStatusDto) {

    const {id, status} = changeTaskStatusDto;

    const task = await this.findOne(id);

    if( status === task.status ) {
      return task;
    }

    return await this.task.update({
      where: { id },
      data: { status }
    });
  }

  createComment(createCommentDto: CreateCommentDto) {
    const { ...data } = createCommentDto;

    return this.comment.create({
      data
    });
  }

  async findTaskProject(projectId: string) {
    const task = await this.task.findMany({
      where: { projectId }
    });

    if( !task ){
      throw new RpcException({
        message: `Tasks with projectId ${projectId} not found`,
        status: HttpStatus.BAD_REQUEST
      });
    }

    return task;
  }
}
