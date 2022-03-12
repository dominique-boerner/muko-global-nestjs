import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MyDocController } from './api/v1/my-doc/controller/my-doc.controller';
import { MyDocService } from './api/v1/my-doc/services/my-doc.service';
import { MedicationController } from './api/v1/medication/controller/medication.controller';
import { MedicationService } from './api/v1/medication/services/medication.service';

const v1Controllers = [MyDocController, MedicationController];

@Module({
  imports: [],
  controllers: [AppController, ...v1Controllers],
  providers: [MyDocService, MedicationService],
})
export class AppModule {}
