import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // product get all
  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    // 제품 테이블의 정보를 가져오는 로직
    const product = await this.productService.getProducts();
    return product;
  }

  // 제품 등록
  @Post('/new')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.createProduct(createProductDto);
  }

  // 제품 상세 정보 불러오기
  @Get('/:id')
  async getProduct(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.getProductById(id);
  }

  // 제품 수정
  @Put('/:id')
  async patchProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProductById(id, createProductDto);
  }

  // 제품 삭제
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<string> {
    return this.productService.deleteProduct(id)
  }
}
