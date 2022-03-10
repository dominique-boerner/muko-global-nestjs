import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MyDocController } from "./api/v1/my-doc/controller/my-doc.controller";
import { MyDocService } from './api/v1/my-doc/services/my-doc.service';

const v1Controllers = [MyDocController];

@Module({
  imports: [],
  controllers: [AppController, ...v1Controllers],
  providers: [MyDocService],
})
export class AppModule {}
