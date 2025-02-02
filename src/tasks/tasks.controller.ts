import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskPaginationDto } from './dto/task-pagination.dto';
import { ChangeTaskStatusDto } from './dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('findAllTasks')
  findAll(@Payload() taskPaginationDto:TaskPaginationDto) {
    return this.tasksService.findAll(taskPaginationDto);
  }

  @MessagePattern('findOneTask')
  findOne(@Payload('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('removeTask')
  remove(@Payload('id') id: string) {
    return this.tasksService.remove(id);
  }

  @MessagePattern('changeTaskStatus')
  changeStatus(@Payload() changeTaskStatusDto: ChangeTaskStatusDto) {
    return this.tasksService.changeStatus(changeTaskStatusDto);
  }

  @MessagePattern('createComment')
  createComment(@Payload() createCommentDto: CreateCommentDto) {
    return this.tasksService.createComment(createCommentDto);
  }

  @MessagePattern('findTaskProject')
  findTaskProject(@Payload('id') id: string) {
    return this.tasksService.findTaskProject(id);
  }

  @MessagePattern('findCommentTask')
  findCommentTask(@Payload('id') id: string) {
    return this.tasksService.findCommentsTask(id);
  }
}
