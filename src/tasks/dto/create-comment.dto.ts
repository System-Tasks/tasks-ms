import { IsString } from "class-validator";

export class CreateCommentDto {

    @IsString()
    description: string;

    @IsString()
    taskId: string;

    @IsString()
    userId: string; 
}
