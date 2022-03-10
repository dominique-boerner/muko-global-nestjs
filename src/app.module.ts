import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MyDocController } from "./controller/v1/my-doc/my-doc.controller";

@Module({
  imports: [],
  controllers: [AppController, MyDocController],
})
export class AppModule {}
