import { queryStringify } from './helpers';
import { METHODS, Options, OptionsWithoutMethod } from '../types/api';

class HTTPTransport {
  get = (
    url: string,
    options: OptionsWithoutMethod = {},
  ) => {
    const { data } = options;

    return this.request(`${url}${queryStringify(data)}`, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (
    url: string,
    options: OptionsWithoutMethod = {},
  ) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = (
    url: string,
    options: OptionsWithoutMethod = {},
  ) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = (
    url: string,
    options: OptionsWithoutMethod = {},
  ) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (
    url: string,
    options: Options = { method: METHODS.GET },
    timeout: number = 5000,
  ): Promise<XMLHttpRequest> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (!headers) {
        xhr.setRequestHeader('Content-Type', 'text/plain');
      } else {
        Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
