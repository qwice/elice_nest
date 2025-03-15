import {BaseEntity, Column, Entity, ManyToOne} from "typeorm";
import {Product} from "../../product/entities/product.entity";

@Entity()
export class Comment extends BaseEntity{
    @Column()
    content: string;

    @ManyToOne(() => Product, (product: Product) => product.comments)
    public product: Product;
}
