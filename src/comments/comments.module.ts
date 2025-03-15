import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../product/entities/product.entity";
import {Comment} from "./entities/comment.entity";
import {ProductModule} from "../product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), ProductModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
