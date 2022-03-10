import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationController } from './controller/medication/medication.controller';
import { MyDocController } from './controller/my-doc/my-doc.controller';

@Module({
  imports: [],
  controllers: [AppController, MedicationController, MyDocController],
  providers: [AppService],
})
export class AppModule {}
