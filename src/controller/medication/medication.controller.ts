import { Controller, Get, Param } from '@nestjs/common';

@Controller("medication")
export class MedicationController {

  @Get("get-medication/:id")
  getMedication(@Param() medication: any) {
    return medication.id;
  }

}