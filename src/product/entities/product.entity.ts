import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Comment} from "../../comments/entities/comment.entity";
import {BaseEntity} from "../../common/base.entity";

@Entity()
export class Product extends BaseEntity{
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(()=> Comment, (comment: Comment) => comment.product)
  public comments: Comment[];
}
