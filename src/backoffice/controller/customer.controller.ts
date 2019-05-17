import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { Customer } from '../model/customer.model';
import { Response } from '../../core/model/response.model';
import { ValidatorInterceptor } from 'src/core/interceptor/validator.interceptor';
import { CreateCustomerContract } from '../contract/customer.contract';

@Controller('v1/customers')
export class CustomerController {
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
    post(@Body() request: Customer) {
        return new Response(
            'Created customer',
            true,
            request,
            null);
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() request: Customer) {
        return new Response(
            'Updated customer',
            true,
            request,
            null);
    };

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new Response(
            'Deleted customer',
            true,
            null,
            null);
    }
}