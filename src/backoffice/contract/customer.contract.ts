import { Contract } from '../../core/contract/Contract';
import { Customer } from '../model/customer.model';
import { Flunt } from '../../core/util/Flunt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];

    validate(model: Customer): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Invalid name');
        flunt.isEmail(model.email, 'Invalid e-mail');
        flunt.isCpf(model.document, 'Invalid document');
        flunt.hasMinLen(model.password, 5, 'Invalid password');

        this.errors = flunt.errors;

        return flunt.isValid();
    }
}