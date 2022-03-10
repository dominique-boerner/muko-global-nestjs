import { Controller, Get, Version } from "@nestjs/common";
import axios from "axios";

@Controller({
  version: "1",
  path: "my-doc",
})
export class MyDocController {
  readonly MY_DOC_BASE_URL = "https://my-doc.net";

  /**
   * Defines a list of cf specific doctors, self-help groups and communities
   */
  MUKO_ID_CATALOG: ReadonlyArray<string> = [
    "b22c3ba0-99e1-11eb-9c65-64652e69642d",
    "ca718dfc-c509-11eb-b6b9-64652e69642d",
    "f8484114-5779-11ec-b3ad-64652e69642d",
    "00051148-dc2e-11e3-9aea-5b61b214e2c0",
  ];

  @Get("get-all-muko-doctors")
  async getAllMukoDoctors() {
    let params = {
      module: "mydoc",
      sektion: "show_doctor",
      uuid: "",
      return: "json",
    };

    const results: any[] = await Promise.all(
      this.MUKO_ID_CATALOG.map(async (id) => {
        params = { ...params, uuid: id };
        return await axios
          .get(this.MY_DOC_BASE_URL, { params: params })
          .then((r) => r.data);
      }),
    ).then((results) => {
      return results.filter((result) => result.success === true);
    });

    return results;
  }
}
