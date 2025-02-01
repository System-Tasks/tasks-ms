import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { TaskStatusList } from "./enum/task.enum";
import { TaskStatus } from "@prisma/client";

export class TaskPaginationDto extends PaginationDto{

    @IsEnum( TaskStatusList , {
        message: `Valid status are ${ TaskStatusList }`
    })
    @IsOptional()
    status: TaskStatus;
}