import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class MyDocService {
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

  async getAllMukoGroups() {
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
          .then((r) => r.data)
          .then((responseData) => {
            return responseData.success ? responseData : [];
          });
      }),
    ).then((results) => {
      return results.filter((result) => result.success === true);
    });

    return results;
  }

  async getMukoGroup(id: string) {
    let params = {
      module: "mydoc",
      sektion: "show_doctor",
      uuid: id,
      return: "json",
    };

    return await axios
      .get(this.MY_DOC_BASE_URL, { params: params })
      .then((r) => r.data)
      .then((responseData) => {
        return responseData.success ? responseData : [];
      });
  }

  async getNews(id: string, sort = "asc") {
    let params = {
      module: "mydoc",
      sektion: "show_doctor",
      uuid: id,
      return: "json",
    };

    return await axios
      .get(this.MY_DOC_BASE_URL, { params: params })
      .then((r) => r.data)
      .then((responseData) => {
        if (responseData.success) {
          return responseData.data.DoctorNewsItems.sort((a: any, b: any) => {
            if (sort === "asc") {
              return (
                new Date(a.updated_at).valueOf() -
                new Date(b.updated_at).valueOf()
              );
            } else if (sort === "desc") {
              return (
                new Date(b.updated_at).valueOf() -
                new Date(a.updated_at).valueOf()
              );
            }
          });
        } else {
          return [];
        }
      });
  }

  async getMembers(id: string) {
    let params = {
      module: "mydoc",
      sektion: "show_doctor",
      uuid: id,
      return: "json",
    };

    return await axios
      .get(this.MY_DOC_BASE_URL, { params: params })
      .then((r) => r.data)
      .then((responseData) => {
        return responseData.success ? responseData.data.Employees : [];
      });
  }

  async getImage(id: string) {
    let params = {
      module: "mydoc",
      sektion: "show_doctor",
      uuid: id,
      return: "json",
    };

    return await axios
      .get(this.MY_DOC_BASE_URL, { params: params })
      .then((r) => r.data)
      .then((responseData) => {
        return responseData.success ? responseData.data._image : [];
      });
  }

  async getMultipleNews(ids: string[], sort = "asc") {
    const results = await Promise.all(
      ids.map(async (id) => {
        let params = {
          module: "mydoc",
          sektion: "show_doctor",
          uuid: id,
          return: "json",
        };

        return await axios
          .get(this.MY_DOC_BASE_URL, { params: params })
          .then((r) => r.data)
          .then((responseData) => {
            return responseData.success
              ? responseData.data.DoctorNewsItems
              : [];
          });
      }),
    ).then((results) =>
      results
        .filter((result) => {
          return result.length > 0;
        })
        .flat(1)
        .sort((a: any, b: any) => {
          if (sort === "asc") {
            return (
              new Date(a.updated_at).valueOf() -
              new Date(b.updated_at).valueOf()
            );
          } else if (sort === "desc") {
            return (
              new Date(b.updated_at).valueOf() -
              new Date(a.updated_at).valueOf()
            );
          }
        }),
    );

    return results;
  }
}
