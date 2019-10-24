import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { OrderItemDto } from 'src/store/dto/order-items.dto';
import { OrderService } from 'src/store/services/order.service';
import { ProductService } from 'src/store/services/product.service';
import { Response } from 'src/core/model/response.model';
import { Order } from 'src/store/entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService,
    ) { }

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const orders = await this.orderService.getByNumber(order);
            return new Response(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Response(
                'get orders error',
                false,
                null,
                error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') cpfCustomer: string) {
        try {
            const orders = await this.orderService.getByCpfCustomer(cpfCustomer);
            return new Response(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Response(
                'getByCustomer orders error',
                false,
                null,
                error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.cpfCustomer = '12345678900'; //vem do jwt
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for (const item of model) {
                let product = await this.productService.getById(item.product);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            }

            return new Response(null, true, model, null);

        } catch (error) {
            throw new HttpException(new Response(
                'post orders error',
                false,
                null,
                error), HttpStatus.BAD_REQUEST);
        }
    }
}