export const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Options = {
  method: METHODS;
  data?: any;
  timeout?: number;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;
