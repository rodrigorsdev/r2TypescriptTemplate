import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from 'src/store/services/product.service';
import { Product } from 'src/store/entities/product.entity';
import { Response } from '../../core/model/response.model';

@Controller('v1/products')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new Response(
                null,
                true,
                products,
                null
            );
        } catch (e) {
            throw new HttpException(new Response(
                'get products error',
                false,
                null,
                e
            ), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new Response(
                null,
                true,
                model,
                null
            );
        } catch (e) {
            throw new HttpException(new Response(
                'post product error',
                false,
                null,
                e
            ), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new Response(
                null,
                true,
                model,
                null
            );
        } catch (e) {
            throw new HttpException(new Response(
                'put product error',
                false,
                null,
                e
            ), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.delete(id);
            return new Response(
                null,
                true,
                null,
                null
            );
        } catch (e) {
            throw new HttpException(new Response(
                'delete product error',
                false,
                null,
                e
            ), HttpStatus.BAD_REQUEST);
        }
    }
}