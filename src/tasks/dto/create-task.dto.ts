import { TaskStatus } from "@prisma/client";
import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatusList } from "./enum/task.enum";

export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    dateLimit: string;

    @IsEnum(TaskStatusList,{
        message: `The possible status values are ${TaskStatusList}`
    })
    @IsOptional()
    status: TaskStatus = TaskStatus.PENDING

    @IsOptional()
    projectId: string;
}
