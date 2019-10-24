import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/store/entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ) { }

    async getByNumber(number: string): Promise<Order> {
        return await this.repository.findOne({ number: number });
    }

    async getByCpfCustomer(cpfCustomer: string): Promise<Order[]> {
        return await this.repository.find({ cpfCustomer: cpfCustomer });
    }

    async post(order: Order) {
        await this.repository.save(order);
    }
}