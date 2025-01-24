import { Request, Response } from 'express';
import requestID from './request-id.util';

export const formatResponse = (status: number, data: any) => {
  const response = {
    success: status < 400,
    data: data,
  };
  return response || data;
};

export const formatLog = (
  request: Request,
  response: Response,
  responseBody: any,
) => {
  const { method, url, params, query, headers, body } = request;
  const logPayload = {
    timestamp: new Date().toISOString(),
    requestID: requestID(),
    method,
    url,
    statusCode: response.statusCode,
    params,
    query,
    headers,
    body,
    response: responseBody,
  };
  return logPayload;
};

export const formatDateTimeFirebase = (data: any): any => {
  if (!data) return data;

  const formattedData = { ...data };
  for (const key in data) {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      '_seconds' in data[key] &&
      '_nanoseconds' in data[key]
    ) {
      formattedData[key] = data[key].toDate();
    }
  }
  return formattedData;
};
