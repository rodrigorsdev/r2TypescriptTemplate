import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { CustomerSchema } from './schema/customer.schema';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { CustomerService } from './service/customer.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema
            },
            {
                name: 'User',
                schema: UserSchema
            }
        ])
    ],
    controllers: [CustomerController],
    providers: [
        CustomerService,
        UserService
    ]
})

export class BackofficeModule { }