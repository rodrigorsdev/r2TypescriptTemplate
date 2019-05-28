import { Contract } from '../../core/contract/Contract';
import { Flunt } from '../../core/util/Flunt';
import { Injectable } from '@nestjs/common';
import { CreateCustomer } from '../dto/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: CreateCustomer): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Invalid name');
        flunt.isEmail(model.email, 'Invalid e-mail');
        flunt.isCpf(model.document, 'Invalid document');
        flunt.hasMinLen(model.password, 6, 'Invalid password');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}