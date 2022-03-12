import { Controller, Get, Query } from '@nestjs/common';
import { MedicationService } from '../services/medication.service';

@Controller({
  version: "1",
  path: "medication",
})
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {
  }

  @Get()
  getMedication(
    @Query("name") name: string,
    @Query("count") count: number,
    @Query("page") page: number
  ) {
    return this.medicationService.getMedication(name, count, page);
  }
}
