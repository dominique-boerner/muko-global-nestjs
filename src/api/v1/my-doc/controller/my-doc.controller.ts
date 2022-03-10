import { Controller, Get, Param } from '@nestjs/common';
import { MyDocService } from '../services/my-doc.service';

@Controller({
  version: "1",
  path: "my-doc",
})
export class MyDocController {
  constructor(private readonly myDocService: MyDocService) {}

  @Get("get-all-muko-groups")
  async getAllMukoGroups() {
    return await this.myDocService
      .getAllMukoGroups()
      .then((response) => response);
  }

  @Get("get-muko-group/:id")
  async getMukoGroup(@Param("id") id: string) {
    return await this.myDocService
      .getMukoGroup(id)
      .then((response) => response);
  }
}
