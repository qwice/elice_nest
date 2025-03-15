import {Body, Controller, Param, Post} from "@nestjs/common";
import {CommentsService} from "./comments.service";
import {Comment} from "./entities/comment.entity";
import {CreateCommentDto} from "./dto/create-comment.dto";


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post("/:productId")
  async create(@Param('productId') productId: string,  @Body() createCommentDto: CreateCommentDto): Promise<Comment>{
    return await this.commentsService.createComment(productId, createCommentDto);
  }
}
