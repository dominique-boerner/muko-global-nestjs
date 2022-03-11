import { Controller, Get, Param } from "@nestjs/common";
import { MyDocService } from "../services/my-doc.service";

@Controller({
  version: "1",
  path: "my-doc",
})
export class MyDocController {
  constructor(private readonly myDocService: MyDocService) {}

  @Get("users")
  async getUsers() {
    return await this.myDocService
      .getAllMukoGroups()
      .then((response) => response);
  }

  @Get("users/:id")
  async getUsersById(@Param("id") id: string) {
    return await this.myDocService
      .getMukoGroup(id)
      .then((response) => response);
  }

  @Get("news/:id")
  async getNews(@Param("id") id: string) {
    return await this.myDocService.getNews(id).then((response) => response);
  }

  // TODO:
  //  - get-team-members
  //  - get-profile-image
  //  - sort news by
  //  - get all news of multiple groups, sorted by
  //  - get-muko-group: nur Namen, Ort, Bild in groß
}
