import { Pet } from './pet.model'
import { CreditCard } from './credit-card.model';
import { Address } from './address.model';

export class Customer {
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public active: boolean,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard
    ) { }
}