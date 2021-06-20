// eslint-disable-next-line import/prefer-default-export
export const queryStringify = (data: any): string => (data ? `?${Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')}` : '');
