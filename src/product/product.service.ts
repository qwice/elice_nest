import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>,
  ) {}

  // 제품 모든 정보를 가져오는 로직
  async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // 제품을 등록하는 로직
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  // 제품 아이디에 해당하는 제품을 가져오는 로직
  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // 제품 수정에 대한 로직
  async updateProductById(
    id: string,
    updateProductDto: CreateProductDto
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    const updatedProduct = await this.productRepository.findOneBy({ id: id });
    if (!updatedProduct) {
      throw new NotFoundException('Product not found after update');
    }
    return updatedProduct;
  }

  // 제품을 삭제하는 로직
  async deleteProduct(id: string): Promise<string> {
    const product = await this.productRepository.findOneBy({id: id});
    if(!product){
      throw new NotFoundException('Product not found')
    }
    await this.productRepository.delete(id);
    return 'deleted';
  }
}
