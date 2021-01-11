import got, { HTTPAlias } from 'got';
import deserialize from './Deserializer';
import snakecaseKeys from 'snakecase-keys';

// TODO Support setting timeout, retries

const contentType = 'application/x-www-form-urlencoded';

type RequestOptions = {
  method: HTTPAlias;
  path: string;
  queryParams?: object;
  bodyParams?: object;
  collection?: boolean;
};

export class RestClient {
  accessToken: string;
  baseUrl: string;
  apiVersion: string;

  constructor(accessToken: string, baseUrl: string, apiVersion: string) {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
  }

  makeRequest(options: RequestOptions) {
    const url = `${this.baseUrl}/${this.apiVersion}${options.path}`;

    // FIXME remove any
    const gotOptions: any = {
      method: options.method,
      responseType: 'json' as 'json',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-type': contentType,
      },
    };

    if (options.bodyParams) {
      gotOptions['form'] = snakecaseKeys(options.bodyParams);
    }

    // TODO improve error handling
    return got(url, gotOptions)
      .then(data => deserialize(data.body))
      .catch(error => console.log(error));
  }
}