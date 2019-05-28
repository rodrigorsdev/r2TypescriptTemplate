import { Module } from '@nestjs/common';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/r2TsTemplate'),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
