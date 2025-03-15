import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {Repository} from "typeorm";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {ProductService} from "../product/product.service";

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment)
      private readonly commentRepository: Repository<Comment>,
      private readonly productService: ProductService,
  ) {}

  // 댓글을 등록하는 로직
  async createComment(productId: string, createCommentDto: CreateCommentDto): Promise<any>{
    const { content } = createCommentDto;
    // productId를 찾기
    const product = await this.productService.getProductById(productId);

    if(!product) {
      throw new NotFoundException('Product not found');
    }

    const newComment = await this.commentRepository.create({
      content, product
    });
    const savedComment = await this.commentRepository.save(newComment);

    //반환하기 전에 'product'필드를 ID만 남기도록 변경
    (savedComment as any).product = {id: savedComment.product.id};

    return savedComment;
  }
}
