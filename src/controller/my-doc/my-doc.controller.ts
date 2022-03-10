import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('my-doc')
export class MyDocController {
  readonly MY_DOC_BASE_URL = 'https://my-doc.net';

  MY_DOC_ID_CATALOG: ReadonlyArray<string> = ['f8484114-5779-11ec-b3ad-64652e69642d'];

  @Get('get-all-doctors')
  async getAllDoctors() {
    let params = {
      module: 'mydoc',
      sektion: 'show_doctor',
      uuid: '',
      return: 'json',
    };

    const results: any[] = await Promise.all(this.MY_DOC_ID_CATALOG.map(async (id) => {
      params = {...params, uuid: id}
      return await  axios
        .get(this.MY_DOC_BASE_URL, { params: params })
        .then((r) => r.data);
    }))

    return results;
  }
}
