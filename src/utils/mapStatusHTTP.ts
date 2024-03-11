export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' |
'NOT_FOUND' | 'CONFLICT' | 'UNPROCESSABLE';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED',
  data: T
};

// src/utils/mapStatusHTTP.ts

export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'INVALID_DATA': return 400;
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    case 'UNPROCESSABLE': return 422;
    default: return 500;
  }
}

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
