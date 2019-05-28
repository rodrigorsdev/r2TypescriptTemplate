import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from '../../core/model/response.model';
import { ValidatorInterceptor } from 'src/core/interceptor/validator.interceptor';
import { CreateCustomerContract } from '../contract/customer.contract';
import { CreateCustomer } from '../dto/create-customer.dto';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer.model';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly userService: UserService,
        private readonly customerService: CustomerService
    ) { }

    @Get()
    get() {
        return new Response(
            null,
            true,
            [],
            null);
    }

    @Get(':document')
    getByDocument(@Param('document') docuemnt: string) {
        return new Response(
            null,
            true,
            {},
            null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() request: CreateCustomer) {

        try {
            const user = await this.userService.create(
                new User(request.document, request.password, true));

            const customer = new Customer(
                request.name,
                request.document,
                request.email,
                null,
                null,
                null,
                null,
                user);

            const result = await this.customerService.create(customer);

            return new Response(
                'Created customer',
                true,
                result,
                null);
        } catch (e) {
            throw new HttpException(new Response(
                'Created customer error',
                false,
                null,
                e), HttpStatus.BAD_REQUEST);
        }

    }

    // @Put(':document')
    // put(@Param('document') document: string, @Body() request: Customer) {
    //     return new Response(
    //         'Updated customer',
    //         true,
    //         request,
    //         null);
    // };

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new Response(
            'Deleted customer',
            true,
            null,
            null);
    }
}