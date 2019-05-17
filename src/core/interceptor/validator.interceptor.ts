import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Contract } from '../contract/contract';
import { Response } from '../../core/model/response.model';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(
        public contract: Contract
    ) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);
        
        if(!valid){
            throw new HttpException(
                new Response(
                    'Ops, something wrong happened here',
                    false,
                    null,
                    this.contract.errors)
                , HttpStatus.BAD_REQUEST);
        }

        return next.handle();
    }
}