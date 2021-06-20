import { HttpResponse } from '@/presentation/contracts/http';

function ok(data : any): HttpResponse {
  return {
    success: true,
    statusCode: 200,
    body: data,
  };
}

function created(data : any): HttpResponse {
  return {
    success: true,
    statusCode: 201,
    body: data,
  };
}

function badRequest(message : string): HttpResponse {
  return {
    success: false,
    statusCode: 400,
    body: message,
  };
}

function notFound(message : string): HttpResponse {
  return {
    success: false,
    statusCode: 404,
    body: message,
  };
}

function serverError(message: string): HttpResponse {
  return {
    success: false,
    statusCode: 500,
    body: message,
  };
}

export {
  ok,
  created,
  badRequest,
  notFound,
  serverError,
};
