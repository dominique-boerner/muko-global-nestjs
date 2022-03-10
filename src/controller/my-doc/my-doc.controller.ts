import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('my-doc')
export class MyDocController {
  readonly MY_DOC_BASE_URL = 'https://my-doc.net';

  /**
   * Defines a list of mukoviszidose specific doctors, self-help groups and communites
   */
  MUKO_ID_CATALOG: ReadonlyArray<string> = [
    'f8484114-5779-11ec-b3ad-64652e69642d',
  ];

  @Get('get-all-muko-doctors')
  async getAllMukoDoctors() {
    let params = {
      module: 'mydoc',
      sektion: 'show_doctor',
      uuid: '',
      return: 'json',
    };

    const results: any[] = await Promise.all(
      this.MUKO_ID_CATALOG.map(async (id) => {
        params = { ...params, uuid: id };
        return await axios
          .get(this.MY_DOC_BASE_URL, { params: params })
          .then((r) => r.data);
      }),
    );

    return results;
  }
}
