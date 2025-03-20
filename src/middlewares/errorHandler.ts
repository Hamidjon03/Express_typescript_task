import { Request, Response, NextFunction } from 'express';

export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`Error: ${err.message}`);
  
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }
};
