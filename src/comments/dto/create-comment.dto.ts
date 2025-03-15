import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({ example: 'gooood' })
    content: string;
}
