import { TaskStatus } from "@prisma/client";
import { IsEnum, IsUUID } from "class-validator";
import { TaskStatusList } from "./enum/task.enum";

export class ChangeTaskStatusDto{

    @IsUUID(4)
    id: string;

    @IsEnum( TaskStatusList , {
        message: `Valid status are ${ TaskStatusList }`
    })
    status: TaskStatus;
}