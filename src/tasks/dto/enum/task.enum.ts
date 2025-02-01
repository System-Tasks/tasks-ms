import { TaskStatus } from "@prisma/client";

export const TaskStatusList = [
    TaskStatus.PENDING,
    TaskStatus.COMPLETED,
    TaskStatus.PROGRESS,
]